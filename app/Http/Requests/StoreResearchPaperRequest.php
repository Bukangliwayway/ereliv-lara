<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResearchPaperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'introduction' => 'required|string',
            'methodology' => 'required|string',
            'result' => 'required|string',
            'abstract' => 'required|string',
            'discussion' => 'required|string',
            'conclusion' => 'required|string',
            'keywords' => 'required|string',
            'publication_status' => 'required|in:Ongoing,Completed,Published,Presented',
            'research_classification' => 'required|in:Institutional Research,Self-Funded Research,Externally Funded Research',
            'publish_date' => 'required|date',
            'modifier_id' => 'required|exists:users,id',
        ];
    }
}
