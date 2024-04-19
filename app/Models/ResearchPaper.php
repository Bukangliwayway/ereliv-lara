<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Str;



class ResearchPaper extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'introduction',
        'methodology',
        'result',
        'abstract',
        'discussion',
        'conclusion',
        'keywords',
        'publication_status',
        'research_classification',
        'publish_date',
    ];


    public function authors()
    {
        return $this->belongsToMany(User::class, 'authors', 'research_paper_id', 'user_id')
            ->using(AuthorPivot::class)
            ->withPivot('id')
            ->withTimestamps();
    }

    public function authorNames()
    {
        return $this->belongsToMany(User::class, 'authors', 'research_paper_id', 'user_id')
            ->using(AuthorPivot::class)
            ->withTimestamps()
            ->pluck('users.name', 'users.id')
            ->map(function ($name, $id) {
                return (object) ['name' => $name, 'id' => $id];
            });
    }

    public function editable()
    {
        $authenticatedUserId = auth()->id();

        return $this->belongsToMany(User::class, 'authors', 'research_paper_id', 'user_id')
            ->using(AuthorPivot::class)
            ->wherePivot('user_id', $authenticatedUserId)
            ->exists();
    }
}


class AuthorPivot extends Pivot
{
    use HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';
}
