<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paper_likes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->boolean('is_liked')->default(true);
            $table->foreignUuid('user_id')->constrained('users');
            $table->foreignUuid('research_paper_id')->constrained('research_papers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paper_likes');
    }
};
