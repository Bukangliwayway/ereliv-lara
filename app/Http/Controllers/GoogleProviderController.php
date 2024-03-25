<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class GoogleProviderController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();

    }
    public function callback()
    {
        $user = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'provider_id' => $user->id,
            'provider' => 'google',
        ], [
            'name' => $user->name,
            'email' => $user->email,
            'provider_token' => $user->token,
        ]);

        Auth::login($user);
        return redirect('/dashboard');

    }
}
