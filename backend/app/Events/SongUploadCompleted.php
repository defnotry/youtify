<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SongUploadCompleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $songData;

    /**
     * Create a new event instance.
     *
     * @param array $songData
     */
    public function __construct(array $songData)
    {
        $this->songData = $songData;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }

    /**
     * The event's broadcast payload.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'songData' => $this->songData,
        ];
    }
}
