<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = [
        'genre_name',
    ];

    public function songs()
    {
        return $this->belongsToMany(Song::class);
    }
}
