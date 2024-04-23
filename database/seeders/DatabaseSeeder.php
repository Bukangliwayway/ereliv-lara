<?php

namespace Database\Seeders;

use App\Models\ResearchPaper;
use App\Models\User;
use Carbon\Carbon;
use Elasticsearch\ClientBuilder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    protected $elasticsearch;

    public function __construct()
    {
        $hosts = [env('ELASTICSEARCH_HOST', 'localhost')];
        $this->elasticsearch = ClientBuilder::create()->setHosts($hosts)->build();
    }

    public function run(): void
    {
        $existingUsers = User::factory(10)->create();

        $params = ['index' => 'research_papers'];

        if (!$this->elasticsearch->indices()->exists($params)) {
            // If not, create it
            $indexParams = [
                'index' => 'research_papers',
                'body' => [
                    'settings' => [
                        'number_of_shards' => 3,
                        'number_of_replicas' => 2
                    ]
                ]
            ];
            $this->elasticsearch->indices()->create($indexParams);
        } else {
            $deleteParams = [
                'index' => 'research_papers',
                'body' => [
                    'query' => [
                        'match_all' => new \stdClass()
                    ]
                ]
            ];
            $this->elasticsearch->deleteByQuery($deleteParams);
        }

        $researchPapersData = include (database_path('data/researchPapersData.php'));

        $researchPapers = [];

        foreach ($researchPapersData as $researchPaperData) {
            $researchPaperData['publish_date'] = Carbon::now()->subYears(rand(1, 10))->toIso8601String();
            $researchPaperData['modifier_id'] = User::inRandomOrder()->first()->id;
            $researchPaperData['publication_status'] = fake()->randomElement(['Ongoing', 'Completed', 'Published', 'Presented']);
            $researchPaperData['research_classification'] = fake()->randomElement(['Institutional Research', 'Self-Funded Research', 'Externally Funded Research']);
            $researchPapers[] = ResearchPaper::create($researchPaperData);
        }

        $documents = [];

        DB::transaction(function () use ($researchPapers, $existingUsers, &$documents) {
            foreach ($researchPapers as $researchPaper) {
                $randomUserIds = $existingUsers->random(rand(1, 5))->pluck('id')->toArray();
                $researchPaper->authors()->attach($randomUserIds);

                $authors = User::whereIn('id', $randomUserIds)
                    ->get()
                    ->map(function ($author) {
                        return [
                            'id' => $author->id,
                            'name' => $author->name,
                        ];
                    })
                    ->toArray();

                $documents[] = [
                    'index' => [
                        '_index' => 'research_papers',
                        '_type' => '_doc',
                        '_id' => $researchPaper->id,
                    ]
                ];
                $documents[] = array_merge($researchPaper->toArray(), ['authors' => $authors]);
            }
        });

        $params = ['body' => $documents];
        $this->elasticsearch->bulk($params);
    }
}
