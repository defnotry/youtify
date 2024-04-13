<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return new UserResource($user); // Return the transformed resource directly
    }


    /**
     * Display the specified resource.
     * 
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response 
     */
    public function show(User $user)
    {
        $userResource = new UserResource($user);
        return response()->json(['data' => $userResource], 200);
    }


    /**
     * Update the specified resource in storage.
     * 
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return response()->json(['message' => 'User updated successfully'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("", 204);
    }

    public function getListeners()
    {
        $listeners = User::where('user_type', 'listener')->get();
        return response()->json($listeners);
    }

    public function getArtists()
    {
        $artists = User::where('user_type', 'artist')->get();
        return response()->json($artists);
    }
}
