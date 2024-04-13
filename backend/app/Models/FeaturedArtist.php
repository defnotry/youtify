<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturedArtist extends Model
{
    protected $fillable = [
        'song_id',
        'featured_artist_id',
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }

    public function featuredArtist()
    {
        return $this->belongsTo(User::class, 'featured_artist_id');
    }
}
