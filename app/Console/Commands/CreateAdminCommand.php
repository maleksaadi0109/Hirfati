<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'admin:create
                            {--first_name= : The first name of the admin}
                            {--last_name= : The last name of the admin}
                            {--email= : The email of the admin}
                            {--phone_number= : The phone number of the admin}
                            {--password= : The password of the admin}';

    /**
     * The console command description.
     */
    protected $description = 'Create a new admin user';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $firstName = $this->option('first_name') ?? $this->ask('Enter admin first name');
        $lastName = $this->option('last_name') ?? $this->ask('Enter admin last name');
        $email = $this->option('email') ?? $this->ask('Enter admin email');
        $phoneNumber = $this->option('phone_number') ?? $this->ask('Enter admin phone number');
        $password = $this->option('password') ?? $this->secret('Enter admin password');

        if (User::where('email', $email)->exists()) {
            $this->error("A user with email [{$email}] already exists!");
            return self::FAILURE;
        }

        $user = User::create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'phone_number' => $phoneNumber,
            'password' => $password,
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        $this->info("Admin user created successfully!");
        $this->table(
            ['ID', 'Name', 'Email', 'Role'],
            [[$user->id, "$firstName $lastName", $email, 'admin']]
        );

        return self::SUCCESS;
    }
}
