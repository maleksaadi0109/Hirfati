<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // Linking to the specific profiles
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('provider_id')->constrained('providers')->onDelete('cascade');

            // Job Details
            $table->text('problem_description');
            $table->dateTime('scheduled_date');
            $table->decimal('agreed_price', 8, 2)->nullable();

            // Job Status
            $table->enum('status', ['pending', 'accepted', 'completed', 'canceled'])->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
