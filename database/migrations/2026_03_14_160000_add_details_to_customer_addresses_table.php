<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_addresses', function (Blueprint $table) {
            $table->string('city')->nullable()->after('address_line_2');
            $table->decimal('latitude', 10, 8)->nullable()->after('city');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->text('notes')->nullable()->after('longitude');
        });
    }

    public function down(): void
    {
        Schema::table('customer_addresses', function (Blueprint $table) {
            $table->dropColumn(['city', 'latitude', 'longitude', 'notes']);
        });
    }
};
