<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = [
            'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Folk', 'Country', 'Blues', 'Reggae',
            // Add more genres as needed
        ];

        foreach ($genres as $genre) {
            DB::table('genres')->insert([
                'name' => $genre,
            ]);
        }
    }
}
