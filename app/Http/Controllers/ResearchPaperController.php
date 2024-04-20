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
        $researchesCollection = PaperOverviewResource::collection($researches);
        $yearsCollection = ['data' => $distinctYears];
        $authorsCollection = AuthorNamesResource::collection($distinctAuthors);

        // dd($yearsCollection, $authorsCollection->response()->getData(true));
        // dd(PaperOverviewResource::collection($researches)->response()->getData(true));

        return inertia("Researches/Index", [
            'researches' => $researchesCollection,
            'authors' => $authorsCollection,
            'years' => $yearsCollection,
            'queryParams' => request()->query()
        ]);
    }


    public function works()
    {
        $researches = ResearchPaper::whereHas('authors', function ($query) {
            $query->where('user_id', auth()->id());
        })->get();

        return inertia("Researches/Works", [
            'researches' => PaperOverviewResource::collection($researches)
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

        return inertia("Researches/Create", [
            'authorsSelection' => $authorsCollection,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResearchPaperRequest $request)
    {
        $data = $request->validated();
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

        return redirect()->route('researches.show', $researchPaper->id);
    }


    /**
     * Display the specified resource.
     */
    public function show(ResearchPaper $researchPaper)
    {

        // $result = new ResearchPaperResource($researchPaper);
        // dd($result->response()->getData(true));
        return inertia("Researches/Show", [
            'research' => new ResearchPaperResource($researchPaper),
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

        $data = ResearchPaper::findOrFail($id);
        $researchPaper = new ResearchPaperResource($data);
        return inertia("Researches/Create", [
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

        // Attach new authors
        $authorIds = $data['authors'];
        $researchPaper->authors()->detach();

        // Delete the authors first to ensure that the pivot table is updated
        $oldAuthors = $researchPaper->authors;
        foreach ($oldAuthors as $author) {
            $author->delete();
        }

        $researchPaper->authors()->attach($authorIds);

        return redirect()->route('researches.show', $researchPaper->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResearchPaper $researchPaper)
    {
        //
    }
}
