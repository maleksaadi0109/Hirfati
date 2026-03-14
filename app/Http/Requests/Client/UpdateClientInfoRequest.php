<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'   => 'sometimes|required|string|max:255',
            'last_name'    => 'sometimes|required|string|max:255',
            'phone_number' => 'sometimes|nullable|string|max:20',
            // Ensure email is unique, but ignore the current user's email
            'email'        => 'sometimes|required|email|unique:users,email,' . $this->user()->id,
            'city'         => 'sometimes|nullable|string|max:255',
            'picture'      => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'birthday'     => 'sometimes|nullable|date|before:today',
        ];
    }
}
