<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SongUploaded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $progress;

    public function __construct($progress)
    {
        $this->progress = $progress;
    }
}
