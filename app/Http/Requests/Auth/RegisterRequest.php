<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $role = $this->input('role');
        $normalizedRole = match ($role) {
            'client' => User::ROLE_CUSTOMER,
            'professional' => User::ROLE_PROVIDER,
            default => $role,
        };

        $this->merge([
            'first_name' => trim((string) $this->first_name),
            'last_name' => trim((string) $this->last_name),
            'email' => strtolower(trim((string) $this->email)),
            'phone_number' => trim((string) ($this->phone_number ?? $this->phone ?? '')),
            'role' => $normalizedRole,
            'city' => trim((string) ($this->city ?? '')),
        ]);
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone_number' => ['required', 'string', 'max:30', 'unique:users,phone_number'],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()],
            'role' => ['nullable', Rule::in([User::ROLE_CUSTOMER, User::ROLE_PROVIDER])],
            'profession' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'category' => ['nullable', 'string', 'max:255'],
            'experience' => ['nullable', 'integer', 'min:0'],
            'id_document' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
            'picture' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'birthday' => ['nullable', 'date', 'before:today'],
        ];
    }   

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
