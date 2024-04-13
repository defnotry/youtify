<?php

namespace App\Jobs;

use App\Events\SongUploaded;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadSongJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $album;
    protected $data;

    public function __construct(Album $album, $data)
    {
        $this->album = $album;
        $this->data = $data;
    }

    public function handle()
    {
        // Your upload logic here
        $song = new Song;
        $song->title = $this->data['title'];
        $song->album_id = $this->album->id;
        $song->artist_id = $this->data['artist_id'];

        // Handle file upload
        if (isset($this->data['file'])) {
            $file = $this->data['file'];
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/songs', $filename);
            $song->file_path = $path; // Assuming you have a 'file_path' column in your 'songs' table
        }

        $song->save();

        $song->genres()->attach($this->data['genres']);

        // Simulate progress (you can update this based on actual upload progress)
        for ($i = 0; $i <= 100; $i += 10) {
            sleep(1); // Simulating processing time
            event(new SongUploaded($i)); // Fire progress event
        }
    }
}
