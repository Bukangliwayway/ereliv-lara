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
            $table->string('publication_status');
            $table->string('research_classification');
            $table->date('publish_date');
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
