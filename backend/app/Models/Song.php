<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'album_id',
        'user_id',
        'song_title',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function featuredArtists()
    {
        return $this->hasMany(FeaturedArtist::class);
    }
}
