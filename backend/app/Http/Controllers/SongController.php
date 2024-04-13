<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongResource;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{

    public function index()
    {
        $songs = Song::orderBy('id', 'desc')->paginate(10);
        return SongResource::collection($songs);
    }

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
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/songs', $filename);
            $song->file_path = $path; // Assuming you have a 'file_path' column in your 'songs' table
        }

        $song->save();

        $song->genres()->attach($request->genres);

        return response()->json($song, 201);
    }

    public function show($id)
    {
        $song = Song::findOrFail($id);
        return new SongResource($song);
    }

    public function update(Request $request, $id)
    {
        $song = Song::findOrFail($id);

        $data = $request->validate([
            'album_id' => 'required|exists:albums,id',
            'user_id' => 'required|exists:users,id',
            'song_title' => 'required|string',
            // Add more validation rules as needed
        ]);

        $song->update($data);
        return new SongResource($song);
    }

    public function destroy($id)
    {
        $song = Song::findOrFail($id);
        $song->delete();

        return response('', 204);
    }

}
