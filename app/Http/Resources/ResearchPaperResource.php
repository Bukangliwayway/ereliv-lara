<?php

namespace App\Http\Resources;

use App\Models\AuthorPivot;
use App\Models\ResearchPaper;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResearchPaperResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'introduction' => $this->introduction,
            'methodology' => $this->methodology,
            'result' => $this->result,
            'abstract' => $this->abstract,
            'discussion' => $this->discussion,
            'conclusion' => $this->conclusion,
            'keywords' => $this->keywords,
            'publication_status' => $this->publication_status,
            'research_classification' => $this->research_classification,
            'publish_date' => (new Carbon($this->publish_date))->format('m-d-Y'),
            'editable' => function () {
                $authenticatedUserId = auth()->id(); // or any method you use to get the authenticated user's ID
    
                $user = User::find($authenticatedUserId);

                if (!$user) {
                    return false;
                }

                return $user->belongsToMany(ResearchPaper::class, 'authors', 'user_id', 'research_paper_id')
                    ->using(AuthorPivot::class)
                    ->wherePivot('research_paper_id', $this->resource->id)
                    ->exists();
            },
            'authors' => method_exists($this, 'authorNames') ? $this->authorNames() : $this->authors,
        ];
    }
}
