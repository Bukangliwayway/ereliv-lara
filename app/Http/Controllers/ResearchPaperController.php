<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResearchPaperRequest;
use App\Http\Requests\UpdateResearchPaperRequest;
use App\Http\Resources\AuthorNamesResource;
use App\Http\Resources\ResearchPaperResource;
use App\Models\ResearchPaper;
use App\Models\Author;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ResearchPaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        $query = ResearchPaper::query();

        if (request('author')) {
            $authors = request('author');
            if (is_array($authors)) {
                $authors = array_map('trim', $authors); // Trim whitespace from each UUID
                $query->whereHas('authors', function ($query) use ($authors) {
                    $query->whereIn('user_id', $authors);
                });
            } else {
                $authors = explode(',', $authors); // Split the UUIDs by comma
                $authors = array_map('trim', $authors); // Trim whitespace from each UUID
                $query->whereHas('authors', function ($query) use ($authors) {
                    $query->whereIn('user_id', $authors);
                });
            }
        }

        if (request('year')) {
            $years = request('year');
            if (is_array($years)) {
                $query->whereIn(DB::raw('EXTRACT(YEAR FROM publish_date)'), $years);
            } else {
                $years = explode(',', $years);
                $query->whereIn(DB::raw('EXTRACT(YEAR FROM publish_date)'), $years);
            }
        }

        if (request('keyword')) {
            $keyword = request('keyword');
            $columns = ['title', 'abstract', 'keywords'];
            $query->where(function ($query) use ($columns, $keyword) {
                foreach (Arr::wrap($keyword) as $value) {
                    $query->orWhere(function ($query) use ($columns, $value) {
                        foreach ($columns as $column) {
                            $query->orWhereRaw("to_tsvector('english', $column) @@ to_tsquery('english', ?)", ["'$value'"]);
                        }
                    });
                }
            });
        }



        $researches = $query->paginate(5);
        $researchesCollection = ResearchPaperResource::collection($researches);
        $yearsCollection = ['data' => $distinctYears];
        $authorsCollection = AuthorNamesResource::collection($distinctAuthors);

        // dd($yearsCollection, $authorsCollection->response()->getData(true));
        // dd(ResearchPaperResource::collection($researches)->response()->getData(true));

        return inertia("Researches/Page", [
            'researches' => $researchesCollection,
            'authors' => $authorsCollection,
            'years' => $yearsCollection,
            'queryParams' => request()->query()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResearchPaperRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ResearchPaper $researchPaper)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ResearchPaper $researchPaper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResearchPaperRequest $request, ResearchPaper $researchPaper)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResearchPaper $researchPaper)
    {
        //
    }
}
