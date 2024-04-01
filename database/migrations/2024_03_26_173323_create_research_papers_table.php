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
        Schema::create('research_papers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->text('introduction');
            $table->text('methodology');
            $table->text('result');
            $table->text('abstract');
            $table->text('discussion');
            $table->text('conclusion');
            $table->text('keywords');
            $table->boolean('is_active')->default(true);
            $table->enum('publication_status', ['Ongoing', 'Completed', 'Published', 'Presented']);
            $table->enum('research_classification', ['Institutional Research', 'Self-Funded Research', 'Externally Funded Research']);
            $table->date('publish_date');
            $table->foreignUuid('modifier_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research_papers');
    }
};
