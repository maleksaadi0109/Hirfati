<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\CustomerOrder;
use App\Models\Provider;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class CustomerOrderTestDataSeeder extends Seeder
{
    public function run(): void
    {
        if (!Schema::hasTable('customer_orders')) {
            return;
        }

        $customerUser = User::updateOrCreate(
            ['email' => 'customer.demo@hirfati.test'],
            [
                'first_name' => 'Malek',
                'last_name' => 'Saadi',
                'name' => 'Malek Saadi',
                'phone_number' => '+218911111111',
                'role' => 'customer',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        );

        $customer = Customer::firstOrCreate([
            'user_id' => $customerUser->id,
        ]);

        $providerSeedData = [
            [
                'email' => 'ahmed.pro@hirfati.test',
                'first_name' => 'Ahmed',
                'last_name' => 'Ben Ali',
                'name' => 'Ahmed Ben Ali',
                'profession' => 'Electrician',
                'hourly_rate' => 45,
            ],
            [
                'email' => 'sarah.pro@hirfati.test',
                'first_name' => 'Sarah',
                'last_name' => 'Mahmoud',
                'name' => 'Sarah Mahmoud',
                'profession' => 'Cleaner',
                'hourly_rate' => 60,
            ],
            [
                'email' => 'khaled.pro@hirfati.test',
                'first_name' => 'Khaled',
                'last_name' => 'Yousef',
                'name' => 'Khaled Yousef',
                'profession' => 'AC Technician',
                'hourly_rate' => 55,
            ],
        ];

        $providers = collect($providerSeedData)->map(function (array $providerData) {
            $providerUser = User::updateOrCreate(
                ['email' => $providerData['email']],
                [
                    'first_name' => $providerData['first_name'],
                    'last_name' => $providerData['last_name'],
                    'name' => $providerData['name'],
                    'phone_number' => '+218920000000',
                    'role' => 'provider',
                    'password' => 'password',
                    'email_verified_at' => now(),
                ],
            );

            return Provider::updateOrCreate(
                ['user_id' => $providerUser->id],
                [
                    'profession' => $providerData['profession'],
                    'hourly_rate' => $providerData['hourly_rate'],
                    'is_available' => true,
                    'application_status' => 'approved',
                ],
            );
        });

        $homeAddress = CustomerAddress::updateOrCreate(
            [
                'customer_id' => $customer->id,
                'label' => 'Home',
            ],
            [
                'address_line_1' => 'Andalus District, Street 12',
                'address_line_2' => 'Building 8',
                'city' => 'Tripoli',
                'latitude' => 32.8872,
                'longitude' => 13.1913,
                'notes' => 'Ring the bell before arrival',
                'is_default' => true,
            ],
        );

        $officeAddress = CustomerAddress::updateOrCreate(
            [
                'customer_id' => $customer->id,
                'label' => 'Office',
            ],
            [
                'address_line_1' => 'Downtown Business Center',
                'address_line_2' => null,
                'city' => 'Tripoli',
                'latitude' => 32.8954,
                'longitude' => 13.2008,
                'notes' => 'Call when close to parking gate',
                'is_default' => false,
            ],
        );

        $orders = [
            [
                'service_name' => 'AC Repair and Cleaning',
                'status' => 'in_progress',
                'payment_status' => 'pending',
                'scheduled_at' => now()->addDay()->setTime(10, 0),
                'subtotal' => 110,
                'fees' => 10,
                'total' => 120,
                'provider_id' => $providers[2]->id,
                'address_id' => $homeAddress->id,
                'notes' => 'AC not cooling after 20 minutes',
            ],
            [
                'service_name' => 'Deep Home Cleaning',
                'status' => 'completed',
                'payment_status' => 'paid',
                'scheduled_at' => now()->subDays(3)->setTime(12, 30),
                'subtotal' => 90,
                'fees' => 5,
                'total' => 95,
                'provider_id' => $providers[1]->id,
                'address_id' => $officeAddress->id,
                'notes' => 'Focus on kitchen and living room',
            ],
            [
                'service_name' => 'Kitchen Plumbing Fix',
                'status' => 'cancelled',
                'payment_status' => 'pending',
                'scheduled_at' => now()->subWeek()->setTime(9, 0),
                'subtotal' => 55,
                'fees' => 5,
                'total' => 60,
                'provider_id' => $providers[0]->id,
                'address_id' => $homeAddress->id,
                'notes' => 'Client cancelled due to rescheduling conflict',
            ],
            [
                'service_name' => 'Lighting Installation',
                'status' => 'confirmed',
                'payment_status' => 'paid',
                'scheduled_at' => now()->addDays(2)->setTime(17, 0),
                'subtotal' => 140,
                'fees' => 10,
                'total' => 150,
                'provider_id' => $providers[0]->id,
                'address_id' => $officeAddress->id,
                'notes' => 'Install warm white LEDs in hallway',
            ],
            [
                'service_name' => 'Water Heater Inspection',
                'status' => 'pending',
                'payment_status' => 'pending',
                'scheduled_at' => now()->addDays(4)->setTime(11, 0),
                'subtotal' => 70,
                'fees' => 8,
                'total' => 78,
                'provider_id' => $providers[2]->id,
                'address_id' => $homeAddress->id,
                'notes' => 'Inspect pressure and heating performance',
            ],
        ];

        foreach ($orders as $orderData) {
            CustomerOrder::updateOrCreate(
                [
                    'customer_id' => $customer->id,
                    'service_name' => $orderData['service_name'],
                    'scheduled_at' => $orderData['scheduled_at'],
                ],
                [
                    'provider_id' => $orderData['provider_id'],
                    'address_id' => $orderData['address_id'],
                    'notes' => $orderData['notes'],
                    'status' => $orderData['status'],
                    'payment_status' => $orderData['payment_status'],
                    'subtotal' => $orderData['subtotal'],
                    'fees' => $orderData['fees'],
                    'total' => $orderData['total'],
                ],
            );
        }
    }
}
