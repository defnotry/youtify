<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image as ImageIntervention;





class AlbumController extends Controller
{
    public function index()
    {
        return AlbumResource::collection(
            Album::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    public function getAllAlbums()
    {
        $albums = Album::orderBy('id', 'desc')->get();
        return response()->json($albums);
    }



    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'photo' => 'required|image',
            'artist_id' => 'required|exists:users,id',
        ]);

        $album = new Album();
        $album->title = $request->title;
        $album->description = $request->description;
        $album->artist_id = $request->artist_id;

        // Handle photo upload using Laravel's built-in file storage
        if ($request->hasFile('photo')) {
            // Store the file in the public disk and get the URL
            $url = $request->file('photo')->storePublicly('images/albums', 'public');
            $album->photo = $url;
        }
        $album->save();

        return response()->json($album, 201);
    }



}
