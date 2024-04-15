<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/listeners', [UserController::class, 'getListeners']);
    Route::get('/artists', [UserController::class, 'getArtists']);

    Route::resource('artists', ArtistController::class);

    Route::middleware('artist')->group(function () {
        Route::get('/genres', [GenreController::class, 'index']);
        Route::post('/albums/create-album', [AlbumController::class, 'store']);
        Route::post('/albums/{album}/songs/upload-songs', [SongController::class, 'store']);
        Route::get('/songs', [SongController::class, 'getSongsByArtist']);
    });
    
    Route::get('/albums', [AlbumController::class,'getAllAlbums']);


    Route::get('/songs/{song}/play', [SongController::class, 'play']);
    Route::get('/albums/{album}/songs', [SongController::class, 'getSongsByAlbum']);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

