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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->morphs('notifiable'); // This will allow you to associate the notification with different models (e.g., User, ResearchPaper)
            $table->string('type'); // The type of notification (e.g., 'paper_approved', 'like_received', 'comment_received')
            $table->text('data'); // JSON data containing any additional information needed for the notification
            $table->boolean('is_read')->default(false); // Whether the notification has been read or not

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
