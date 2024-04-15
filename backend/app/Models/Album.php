<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['title', 'description', 'photo_path', 'artist_id'];

    public function artist()
    {
        return $this->belongsTo(User::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}

class Song extends Model
{
    protected $fillable = ['title', 'file_path'];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
}
