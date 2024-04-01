<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResearchPaperRequest;
use App\Http\Requests\UpdateResearchPaperRequest;
use App\Http\Resources\ResearchPaperResource;
use App\Models\ResearchPaper;

class ResearchPaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = ResearchPaper::query();
        $researches = $query->paginate(10);
        return inertia("Researches/Index", [
            'researches' => ResearchPaperResource::collection($researches),
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
