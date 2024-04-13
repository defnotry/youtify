<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('album_id');
            $table->unsignedBigInteger('artist_id');
            $table->string('title');
            $table->string('file_path'); // Assuming you're storing the file path of the song
            $table->timestamps();

            // Foreign key constraint for the album
            $table->foreign('album_id')->references('id')->on('albums')->onDelete('cascade');
            $table->foreign('artist_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Assuming you have a pivot table for the many-to-many relationship between songs and genres
        Schema::create('genre_song', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('song_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('genre_id')->references('id')->on('genres')->onDelete('cascade');
            $table->foreign('song_id')->references('id')->on('songs')->onDelete('cascade');
        });

        // Assuming you have a pivot table for the many-to-many relationship between songs and artists
        Schema::create('artist_song', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('artist_id');
            $table->unsignedBigInteger('song_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('artist_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('song_id')->references('id')->on('songs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artist_song');
        Schema::dropIfExists('genre_song');
        Schema::dropIfExists('songs');
    }
}
