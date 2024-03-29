<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResearchPaper>
 */
class ResearchPaperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'introduction' => fake()->realText(),
            'methodology' => fake()->realText(),
            'result' => fake()->realText(),
            'abstract' => fake()->realText(),
            'discussion' => fake()->realText(),
            'conclusion' => fake()->realText(),
            'keywords' => implode(', ', fake()->words(rand(5, 15))),
            'publication_status' => fake()->randomElement(['Ongoing', 'Completed', 'Published', 'Presented']),
            'research_classification' => fake()->randomElement(['Institutional Research', 'Self-Funded Research', 'Externally Funded Research']),
            'publish_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'modified_by' => function () {
                return User::inRandomOrder()->first()->id;
            },
        ];
    }
}
