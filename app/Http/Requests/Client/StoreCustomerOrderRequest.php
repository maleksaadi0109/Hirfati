<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->can('create', \App\Models\CustomerOrder::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'provider_id' => [
                'required',
                'exists:providers,id',
            ],
            'address_id' => [
                'required',
                'exists:customer_addresses,id',
                function ($attribute, $value, $fail) {
                    $address = \App\Models\CustomerAddress::find($value);
                    if ($address && $address->customer_id !== $this->user()->customer->id) {
                        $fail('The selected address does not belong to your account.');
                    }
                },
            ],
            'service_name' => [
                'required',
                'string',
                'max:255',
            ],
            'scheduled_at' => [
                'required',
                'date',
                'after:now',
            ],
            'notes' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'scheduled_at.after' => 'The scheduled time must be in the future.',
            'provider_id.exists' => 'The selected professional is invalid.',
        ];
    }
}
