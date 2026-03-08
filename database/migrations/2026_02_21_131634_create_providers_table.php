<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();

            // Link to the users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Craftsman/Provider specific data for Hirfati

            $table->string('profession'); // e.g., Plumber, Carpenter, Electrician
            
            $table->text('bio')->nullable(); // Description of their skills
            $table->decimal('hourly_rate', 8, 2)->nullable(); // e.g., 50.00
            $table->boolean('is_available')->default(true); // To toggle if they are currently accepting work

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('providers');
    }
};
