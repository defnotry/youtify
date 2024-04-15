<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'album_id',
        'artist_id',
        'song_title',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    public function artist()
    {
        return $this->belongsTo(User::class, 'artist_id');
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
