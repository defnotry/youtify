<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class SongController extends Controller
{
    public function store(Request $request, Album $album)
    {
        $request->validate([
            'title' => 'required',
            'genres' => 'required|array',
            'genres.*' => 'exists:genres,id', // Assuming 'genres' is a table with an 'id' column
            'featured_artists' => 'nullable|array',
            'artist_id' => 'required|exists:users,id',
            'file' => 'required|file|mimes:mp3,wav,m4a', // Add this line
        ]);

        $song = new Song;
        $song->title = $request->title;
        $song->album_id = $album->id;
        $song->artist_id = $request->artist_id;

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = $file->hashName(); // This generates a unique hash for the file
            $path = $file->storeAs('public/songs', $filename);
            $song->file_path = $path;
        }

        $song->save();

        $song->genres()->attach($request->genres);

        return response()->json($song, 201);
    }

    public function getSongsByArtist(Request $request)
    {
        $artistId = $request->user()->id;

        $songs = Song::where('artist_id', $artistId)->get();

        return response()->json(['songs' => $songs], 200);
    }

    public function getSongsByAlbum(Album $album)
    {
        $songs = Song::where('album_id', $album->id)->get();

        return response()->json(['songs' => $songs], 200);
    }

    public function play(Song $song)
    {
        $path = storage_path('app/' . $song->file_path);
        return response()->file($path);
    }
}
