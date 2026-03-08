<?php

namespace App\Http\Resources\Admin; 

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CraftsmanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
    'id'                  => $this->id,                    // provider ID
    'profession'          => $this->profession,
    'yearsOfExperience'   => $this->years_of_experience,
    'applicationStatus'   => $this->application_status,
    'documentUrl'         => $this->verification_document_path,
    'createdAt'           => $this->created_at->toDateTimeString(),
    // Nested user info (admin needs to see who applied)
    'user' => [
        'id'          => $this->user->id,
        'firstName'   => $this->user->first_name,
        'lastName'    => $this->user->last_name,
        'email'       => $this->user->email,
        'phoneNumber' => $this->user->phone_number,
        'city'        => $this->user->city,
    ],
];
    }
}