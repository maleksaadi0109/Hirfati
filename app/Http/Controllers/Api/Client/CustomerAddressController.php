<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreCustomerAddressRequest;
use App\Http\Requests\Client\UpdateCustomerAddressRequest;
use App\Models\CustomerAddress;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;

class CustomerAddressController extends Controller
{
    use ApiResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->ok('Addresses loaded successfully.', [
                'addresses' => $this->fallbackFromCoordinates($user),
            ]);
        }

        $addresses = $customer
            ->addresses()
            ->orderByDesc('is_default')
            ->latest('id')
            ->get([
                'id',
                'label',
                'address_line_1',
                'address_line_2',
                'city',
                'latitude',
                'longitude',
                'notes',
                'is_default',
            ])
            ->toArray();

        if (empty($addresses)) {
            $addresses = $this->fallbackFromCoordinates($user);
        }

        return $this->ok('Addresses loaded successfully.', ['addresses' => $addresses]);
    }

    public function store(StoreCustomerAddressRequest $request)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->error('Customer profile not found.', 404);
        }

        $validated = $request->validated();
        $isDefault = (bool) ($validated['is_default'] ?? false);

        if ($isDefault) {
            $customer->addresses()->update(['is_default' => false]);
        }

        $address = $customer->addresses()->create([
            'label' => $validated['label'],
            'address_line_1' => $validated['address_line_1'],
            'address_line_2' => $validated['address_line_2'] ?? null,
            'city' => $validated['city'] ?? null,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'is_default' => $isDefault,
        ]);

        return $this->success('Address saved successfully.', [
            'address' => $address->only([
                'id',
                'label',
                'address_line_1',
                'address_line_2',
                'city',
                'latitude',
                'longitude',
                'notes',
                'is_default',
            ]),
        ], 201);
    }

    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->error('Customer profile not found.', 404);
        }

        $address = $customer->addresses()->find($id);

        if (!$address) {
            return $this->error('Address not found.', 404);
        }

        return $this->ok('Address loaded successfully.', [
            'address' => $address->only([
                'id',
                'label',
                'address_line_1',
                'address_line_2',
                'city',
                'latitude',
                'longitude',
                'notes',
                'is_default',
            ]),
        ]);
    }

    public function update(UpdateCustomerAddressRequest $request, string $id)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->error('Customer profile not found.', 404);
        }

        $address = $customer->addresses()->find($id);

        if (!$address) {
            return $this->error('Address not found.', 404);
        }

        $validated = $request->validated();
        $isDefault = (bool) ($validated['is_default'] ?? false);

        if ($isDefault && !$address->is_default) {
            $customer->addresses()->update(['is_default' => false]);
        }

        $address->update([
            'label' => $validated['label'] ?? $address->label,
            'address_line_1' => $validated['address_line_1'] ?? $address->address_line_1,
            'address_line_2' => array_key_exists('address_line_2', $validated) ? $validated['address_line_2'] : $address->address_line_2,
            'city' => array_key_exists('city', $validated) ? $validated['city'] : $address->city,
            'latitude' => array_key_exists('latitude', $validated) ? $validated['latitude'] : $address->latitude,
            'longitude' => array_key_exists('longitude', $validated) ? $validated['longitude'] : $address->longitude,
            'notes' => array_key_exists('notes', $validated) ? $validated['notes'] : $address->notes,
            'is_default' => $isDefault,
        ]);

        return $this->success('Address updated successfully.', [
            'address' => $address->only([
                'id',
                'label',
                'address_line_1',
                'address_line_2',
                'city',
                'latitude',
                'longitude',
                'notes',
                'is_default',
            ]),
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->error('Customer profile not found.', 404);
        }

        $address = $customer->addresses()->find($id);

        if (!$address) {
            return $this->error('Address not found.', 404);
        }

        $address->delete();

        return $this->success('Address deleted successfully.');
    }

    public function setDefault(Request $request, string $id)
    {
        $user = $request->user();
        $customer = $user?->customer;

        if (!$customer) {
            return $this->error('Customer profile not found.', 404);
        }

        $address = $customer->addresses()->find($id);

        if (!$address) {
            return $this->error('Address not found.', 404);
        }

        $customer->addresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);

        return $this->success('Address set as default successfully.');
    }

    private function fallbackFromCoordinates($user): array
    {
        if (!$user || $user->latitude === null || $user->longitude === null) {
            return [];
        }

        return [[
            'id' => 0,
            'label' => 'Current Location',
            'address_line_1' => $user->city ?: 'Pinned coordinates',
            'address_line_2' => sprintf('Lat: %s, Lng: %s', $user->latitude, $user->longitude),
            'city' => $user->city,
            'latitude' => $user->latitude,
            'longitude' => $user->longitude,
            'notes' => null,
            'is_default' => true,
        ]];
    }
}
