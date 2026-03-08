<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->unsignedTinyInteger('years_of_experience')->nullable()->after('profession');
            $table->string('verification_document_path')->nullable()->after('years_of_experience');
            $table->string('application_status')->default('pending')->after('verification_document_path');
        });
    }

    public function down(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->dropColumn(['years_of_experience', 'verification_document_path', 'application_status']);
        });
    }
};
