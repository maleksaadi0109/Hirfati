<?php

namespace App\Http\Requests\Client;

use App\Models\CustomerOrder;
use Illuminate\Foundation\Http\FormRequest;

class CancelCustomerOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $order = $this->route('order');

        if (!$order instanceof CustomerOrder || !$this->user()) {
            return false;
        }

        return $this->user()->can('cancel', $order);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Rule: customer can cancel only before in_progress
            'id' => [
                function ($attribute, $value, $fail) {
                    $order = $this->route('order');

                    if (!$order instanceof CustomerOrder) {
                        $fail('Invalid order.');

                        return;
                    }

                    if (in_array($order->status, ['in_progress', 'completed', 'cancelled'], true)) {
                        $fail("The order cannot be cancelled once it is {$order->status}.");
                    }
                },
            ],
        ];
    }
}
