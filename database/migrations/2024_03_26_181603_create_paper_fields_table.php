<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paper_fields', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('research_paper_id')->constrained('research_papers');
            $table->foreignUuid('academic_field_id')->constrained('academic_fields');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paper_fields');
    }
};
