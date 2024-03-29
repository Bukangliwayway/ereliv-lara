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
        User::factory(10)->create();

        $researchPapers = ResearchPaper::factory()->count(10)->create();

        // For each research paper, create 2 authors
        foreach ($researchPapers as $researchPaper) {
            $authors = User::factory()->count(2)->create();
            $researchPaper->authors()->attach($authors->pluck('id')->toArray());
        }
    }
}
