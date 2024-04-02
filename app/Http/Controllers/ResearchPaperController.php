<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResearchPaperRequest;
use App\Http\Requests\UpdateResearchPaperRequest;
use App\Http\Resources\AuthorResource;
use App\Http\Resources\ResearchPaperResource;
use App\Models\ResearchPaper;
use App\Models\Author;

class ResearchPaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $queryAuthors = Author::select('users.id', 'users.name')
        //     ->distinct('users.id')
        //     ->join('users', 'authors.user_id', '=', 'users.id')
        //     ->get();
        // dd($queryAuthors);

        $query = ResearchPaper::query();
        $researches = $query->paginate(5);
        $researchesCollection = ResearchPaperResource::collection($researches);

        $distinctAuthors = Author::select('user_id')
            ->distinct('user_id')
            ->get();

        $authorsCollection = AuthorResource::collection($distinctAuthors);

        dd(AuthorResource::collection($distinctAuthors)->response()->getData(true));

        // dd(ResearchPaperResource::collection($researches)->response()->getData(true));

        return inertia("Researches/Page", [
            'researches' => $researchesCollection,
            'authors' => $authorsCollection,
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
