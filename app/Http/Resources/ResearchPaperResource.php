<?php

namespace App\Http\Resources;

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
            'editable' => $this->editable(),
            'authors' => $this->authorNames(),
        ];
    }
}
