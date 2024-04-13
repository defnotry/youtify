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

    Route::get('/genres', [GenreController::class, 'index'])->middleware('artist');
    Route::resource('artists', ArtistController::class);

    Route::post('/albums/create-album', [AlbumController::class, 'store'])->middleware('artist');
    Route::post('/albums/{album}/songs/upload-songs', [SongController::class, 'store'])->middleware('artist');
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

