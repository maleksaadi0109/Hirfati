<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'phone_number' => ['required', 'string', 'max:30', Rule::unique(User::class)],
            'password' => $this->passwordRules(),
            'role' => ['required', Rule::in([User::ROLE_CUSTOMER, User::ROLE_PROVIDER])],
            'city' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'experience' => ['nullable', 'integer', 'min:0'],
            'id_document' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
        ])->validate();

        $documentPath = null;
        if (isset($input['id_document']) && $input['id_document'] instanceof \Illuminate\Http\UploadedFile) {
            $documentPath = $input['id_document']->store('verification_documents', 'local');
        }

        $user = clone (new User()); // To use the fill method or create
        $user = User::create([
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'name' => $input['first_name'] . ' ' . $input['last_name'],
            'email' => $input['email'],
            'phone_number' => $input['phone_number'],
            'password' => $input['password'],
            'role' => $input['role'],
            'city' => $input['city'] ?? null,
        ]);

        if ($input['role'] === User::ROLE_CUSTOMER) {
            $user->customer()->create([]);
        } elseif ($input['role'] === User::ROLE_PROVIDER) {
            $user->provider()->create([
                'profession' => $input['category'] ?? 'Pending',
                'years_of_experience' => $input['experience'] ?? null,
                'verification_document_path' => $documentPath,
                'application_status' => 'pending',
                'is_available' => true,
            ]);
        }

        return $user;
    }
}
