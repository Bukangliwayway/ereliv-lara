<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResearchPaperRequest;
use App\Http\Requests\UpdateResearchPaperRequest;
use App\Http\Resources\AuthorNamesResource;
use App\Http\Resources\PaperOverviewResource;
use App\Http\Resources\ResearchPaperResource;
use App\Models\ResearchPaper;
use App\Models\Author;
use App\Models\User;
use Elasticsearch\ClientBuilder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;


class ResearchPaperController extends Controller
{
    protected $elasticsearch;

    public function __construct()
    {
        $hosts = [env('ELASTICSEARCH_HOST', 'localhost')];
        $this->elasticsearch = ClientBuilder::create()->setHosts($hosts)->build();
    }


    public function index()
    {
        $distinctAuthors = Author::select('user_id')
            ->distinct('user_id')
            ->get();

        $distinctYears = ResearchPaper::selectRaw("DISTINCT EXTRACT(YEAR FROM publish_date) AS year")
            ->get()
            ->pluck('year')
            ->map(function ($year) {
                return (int) $year; // Cast to integer
            })
            ->sortDesc() // Sort in descending order
            ->map(function ($year) {
                return ['year' => $year];
            })
            ->toArray();

        $query = [
            'query' => [
                'bool' => [
                    'must' => [],
                ],
            ],
        ];

        if (request('author')) {
            $authors = request('author');

            if (is_array($authors)) {
                $authors = array_map('trim', $authors); // Trim whitespace from each name
                foreach ($authors as $author) {
                    $query['query']['bool']['must'][] = [
                        'term' => [
                            'authors.id.keyword' => $author, // Use the keyword field for exact match
                        ],
                    ];
                }
            } else {
                $authors = explode(',', $authors); // Split the names by comma
                $authors = array_map('trim', $authors); // Trim whitespace from each name
                foreach ($authors as $author) {
                    $query['query']['bool']['must'][] = [
                        'term' => [
                            'authors.id.keyword' => $author, // Use the keyword field for exact match
                        ],
                    ];
                }
            }
        }

        if (request('year')) {
            $years = request('year');
            if (is_array($years)) {
                foreach ($years as $year) {
                    $query['query']['bool']['must'][] = [
                        'range' => [
                            'publish_date' => [
                                'gte' => "$year-01-01",
                                'lt' => ($year + 1) . "-01-01",
                            ],
                        ],
                    ];
                }
            } else {
                $years = explode(',', $years);
                foreach ($years as $year) {
                    $query['query']['bool']['must'][] = [
                        'range' => [
                            'publish_date' => [
                                'gte' => "$year-01-01",
                                'lt' => ($year + 1) . "-01-01",
                            ],
                        ],
                    ];
                }
            }
        }

        if (request('keyword')) {
            $keyword = request('keyword');
            $query['query']['bool']['must'][] = [
                'multi_match' => [
                    'query' => $keyword,
                    'fields' => ['title', 'abstract', 'keywords'],
                    'type' => 'most_fields',
                    'fuzziness' => env('ELASTICSEARCH_FUZZINESS', '5'), // Use environment variable for fuzziness
                ],
            ];
        }

        $page = request('page', 1);
        $perPage = 5;
        $offset = ($page - 1) * $perPage;

        $searchParams = [
            'index' => 'research_papers', //  Elasticsearch index name
            'body' => $query,
            'from' => $offset,
            'size' => $perPage,
        ];

        $results = $this->elasticsearch->search($searchParams);
        $totalHits = $results['hits']['total']['value'];
        $researches = collect($results['hits']['hits'])->map(function ($hit) {
            return $hit['_source'];
        });


        $pagination = new LengthAwarePaginator($researches, $totalHits, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);

        $researchesCollection = PaperOverviewResource::collection(array_map(function ($item) {
            return (object) $item;
        }, $pagination->items()));
        $yearsCollection = ['data' => $distinctYears];
        $authorsCollection = AuthorNamesResource::collection($distinctAuthors);

        return inertia("Researches/Index", [
            'researches' => [
                'data' => $researchesCollection->resolve(),
                'links' => [
                    'first' => $pagination->url(1),
                    'last' => $pagination->url($pagination->lastPage()),
                    'prev' => $pagination->previousPageUrl(),
                    'next' => $pagination->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $pagination->currentPage(),
                    'from' => $pagination->firstItem(),
                    'last_page' => $pagination->lastPage(),
                    'path' => $pagination->path(),
                    'per_page' => $pagination->perPage(),
                    'to' => $pagination->lastItem(),
                    'total' => $pagination->total(),
                    'links' => collect(range(1, $pagination->lastPage()))->map(function ($page) use ($pagination) {
                        return [
                            'url' => $pagination->url($page),
                            'label' => $page,
                            'active' => $page === $pagination->currentPage(),
                        ];
                    })->prepend([
                                'url' => $pagination->previousPageUrl(),
                                'label' => '&laquo; Previous',
                                'active' => false,
                            ])->push([
                                'url' => $pagination->nextPageUrl(),
                                'label' => 'Next &raquo;',
                                'active' => false,
                            ])->all(),
                ],
            ],
            'authors' => $authorsCollection,
            'years' => $yearsCollection,
            'queryParams' => request()->query(),
        ]);
    }


    public function works()
    {
        $query = [
            'query' => [
                'bool' => [
                    'must' => [
                        [
                            'term' => [
                                'authors.id.keyword' => auth()->id(),
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $searchParams = [
            'index' => 'research_papers',
            'body' => $query,
        ];

        $results = $this->elasticsearch->search($searchParams);
        $researches = collect($results['hits']['hits'])->map(function ($hit) {
            return (object) $hit['_source'];
        });

        return inertia("Researches/Works", [
            'researches' => PaperOverviewResource::collection($researches),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $authorsCollection = User::select('id', 'name')
            ->where('role', 'researcher')
            ->get()
            ->map(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                ];
            });

        return inertia("Researches/Publish", [
            'authorsSelection' => $authorsCollection,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResearchPaperRequest $request)
    {
        $data = $request->validated();

        // Create the research paper in the PostgreSQL database
        $researchPaper = ResearchPaper::create([
            'title' => $data['title'],
            'introduction' => $data['introduction'],
            'methodology' => $data['methodology'],
            'result' => $data['result'],
            'abstract' => $data['abstract'],
            'discussion' => $data['discussion'],
            'conclusion' => $data['conclusion'],
            'keywords' => $data['keywords'],
            'publication_status' => $data['publication_status'],
            'research_classification' => $data['research_classification'],
            'publish_date' => $data['publish_date'],
            'modifier_id' => $data['modifier_id'],
        ]);

        $authorIds = $data['authors'];
        $researchPaper->authors()->attach($authorIds);

        // Prepare the Elasticsearch document
        $elasticsearchDocument = (object) $researchPaper->toArray();
        $elasticsearchDocument['authors'] = User::whereIn('id', $authorIds)
            ->get()
            ->map(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                ];
            })
            ->toArray();


        // Check if the 'research_papers' index exists
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
        }

        // Index the research paper in Elasticsearch
        $this->indexResearchPaper($researchPaper->id, $elasticsearchDocument);

        return redirect()->route('researches.show', $researchPaper->id);
    }

    /**
     * Index a research paper in Elasticsearch.
     *
     * @param int $id
     * @param array $document
     * @return void
     */
    protected function indexResearchPaper($id, $document)
    {
        $params = [
            'index' => 'research_papers',
            'type' => '_doc',
            'id' => $id,
            'body' => $document,
        ];

        $this->elasticsearch->index($params);
    }


    /**
     * Display the specified resource.
     */
    public function show(ResearchPaper $researchPaper)
    {
        $params = [
            'index' => 'research_papers',
            'id' => $researchPaper->id
        ];

        $response = $this->elasticsearch->get($params);

        return inertia("Researches/Show", [
            'research' => new ResearchPaperResource((object) $response['_source']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.w
     */
    public function edit(string $id)
    {
        $authorsCollection = User::select('id', 'name')
            ->where('role', 'researcher')
            ->get()
            ->map(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                ];
            });

        $params = [
            'index' => 'research_papers',
            'type' => '_doc',
            'id' => $id,
        ];

        $document = $this->elasticsearch->get($params);
        $researchPaper = (object) $document['_source'];


        return inertia("Researches/Publish", [
            'authorsSelection' => $authorsCollection,
            'research' => new ResearchPaperResource($researchPaper),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResearchPaperRequest $request, ResearchPaper $researchPaper)
    {
        $data = $request->validated();

        $researchPaper = ResearchPaper::findOrFail($data['id']);

        // Update the research paper
        $researchPaper->update([
            'title' => $data['title'],
            'introduction' => $data['introduction'],
            'methodology' => $data['methodology'],
            'result' => $data['result'],
            'abstract' => $data['abstract'],
            'discussion' => $data['discussion'],
            'conclusion' => $data['conclusion'],
            'keywords' => $data['keywords'],
            'publication_status' => $data['publication_status'],
            'research_classification' => $data['research_classification'],
            'publish_date' => $data['publish_date'],
            'modifier_id' => $data['modifier_id'],
        ]);

        // Detach all existing authors
        $researchPaper->authors()->detach();

        Author::where('research_paper_id', $researchPaper->id)->delete();


        // Attach new authors
        $authorIds = $data['authors'];

        foreach ($authorIds as $authorId) {
            Author::create([
                'user_id' => $authorId,
                'research_paper_id' => $data['id'],
            ]);
        }

        // Prepare the Elasticsearch document
        $elasticsearchDocument = $researchPaper->toArray();
        $elasticsearchDocument['authors'] = User::whereIn('id', $authorIds)
            ->get()
            ->map(function ($author) {
                return [
                    'id' => $author->id,
                    'name' => $author->name,
                ];
            })
            ->toArray();

        // Update the research paper in Elasticsearch
        $this->updateResearchPaper($researchPaper->id, $elasticsearchDocument);

        return redirect()->route('researches.show', $data['id']);
    }

    protected function updateResearchPaper($id, $document)
    {
        $existsParams = [
            'index' => 'research_papers',
            'type' => '_doc',
            'id' => $id,
        ];


        if ($this->elasticsearch->exists($existsParams)) {
            $updateParams = [
                'index' => 'research_papers',
                'type' => '_doc',
                'id' => $id,
                'body' => [
                    'doc' => $document,
                ],
            ];
            $this->elasticsearch->update($updateParams);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $researchPaper = ResearchPaper::findOrFail($id);

        // Delete the research paper from the PostgreSQL database
        $researchPaper->authors()->detach();
        Author::where('research_paper_id', $researchPaper->id)->delete();
        $researchPaper->delete();

        // Delete the research paper from Elasticsearch
        $this->deleteResearchPaper($id);

        return redirect()->route('researches.works');
    }

    protected function deleteResearchPaper($id)
    {
        $params = [
            'index' => 'research_papers',
            'type' => '_doc',
            'id' => $id,
        ];

        if ($this->elasticsearch->exists($params)) {
            $this->elasticsearch->delete($params);
        }
    }
}
