<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;
use App\Http\Resources\Auth\AdminResource;
use App\Http\Resources\Auth\CustomerResource;
use App\Http\Resources\Auth\ProviderResource;

class UserResource
{
    public static function make(User $user)
    {
        return match ($user->role) {
            User::ROLE_CUSTOMER => $user->customer
                ? new CustomerResource($user->load('customer.user')->customer)
                : self::basic($user),
            User::ROLE_PROVIDER => $user->provider
                ? new ProviderResource($user->load('provider.user')->provider)
                : self::basic($user),
            'admin' => new AdminResource($user),
            default => self::basic($user),
        };
    }

    private static function basic(User $user): array
    {
        return [
            'id' => $user->id,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'email' => $user->email,
            'phoneNumber' => $user->phone_number,
            'role' => $user->role,
            'city' => $user->city,
            'latitude' => $user->latitude,
            'longitude' => $user->longitude,
        ];
    }
}
