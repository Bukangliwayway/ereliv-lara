<?php

namespace Database\Seeders;

use App\Models\ResearchPaper;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $existingUsers = User::factory(25)->create();

        $researchPapers = ResearchPaper::factory()->count(100)->create();

        // For each research paper, create 2 authors
        foreach ($researchPapers as $researchPaper) {
            $randomUserIds = $existingUsers->random(rand(1, 5))->pluck('id')->toArray();
            $researchPaper->authors()->attach($randomUserIds);
        }
    }
}
