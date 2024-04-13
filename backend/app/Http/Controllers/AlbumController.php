<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image as ImageIntervention;





class AlbumController extends Controller
{
    public function index()
    {
        return AlbumResource::collection(
            Album::query()->orderBy('id', 'desc')->paginate(10)
        );
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

        //handle photo upload using Laravel's built-in file storage
        if ($request->hasFile('photo')) {
            $filename = $request->file('photo')->store('public/images/albums');
            $album->photo = basename($filename);
        }
        $album->save();

        return response()->json($album, 201);
    }


    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $data = $request->validated();
        // Handle file upload or storage here
        $album->update($data);
        return new AlbumResource($album); // Return the transformed resource directly
    }
    public function show(Album $album)
    {
        return new AlbumResource($album);
    }

    public function destroy(Album $album)
    {
        $album->delete();
        return response("", 204);
    }


}
