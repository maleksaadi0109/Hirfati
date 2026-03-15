<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_addresses', function (Blueprint $table) {
            if (!Schema::hasColumn('customer_addresses', 'city')) {
                $table->string('city')->nullable()->after('address_line_2');
            }

            if (!Schema::hasColumn('customer_addresses', 'latitude')) {
                $table->decimal('latitude', 10, 8)->nullable()->after('city');
            }

            if (!Schema::hasColumn('customer_addresses', 'longitude')) {
                $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            }

            if (!Schema::hasColumn('customer_addresses', 'notes')) {
                $table->text('notes')->nullable()->after('longitude');
            }
        });
    }

    public function down(): void
    {
        Schema::table('customer_addresses', function (Blueprint $table) {
            $columnsToDrop = [];

            foreach (['city', 'latitude', 'longitude', 'notes'] as $column) {
                if (Schema::hasColumn('customer_addresses', $column)) {
                    $columnsToDrop[] = $column;
                }
            }

            if (!empty($columnsToDrop)) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};
