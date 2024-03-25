<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GoogleProviderController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();

    }
    public function callback()
    {
        try {
            $user = Socialite::driver('google')->user();

            // Check if the user already exists in the database
            $existingUser = User::where('email', $user->getEmail())->first();

            if ($existingUser) {
                // If the user exists and has a provider ID and provider details, login the user
                if ($existingUser->provider_id && $existingUser->provider) {
                    Auth::login($existingUser);
                    return redirect('/dashboard');
                }

                // If the user exists but doesn't have provider ID and provider details, update the record
                $existingUser->provider_id = $user->id;
                $existingUser->provider = 'google';
                $existingUser->provider_token = $user->token;
                $existingUser->save();

                Auth::login($existingUser);
                return redirect('/dashboard');
            } else {
                // If the user doesn't exist, create a new record
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => Hash::make(Str::random(10)),
                    'remember_token' => Str::random(60),
                    'email_verified_at' => now(),
                    'provider_id' => $user->id,
                    'provider' => 'google',
                    'provider_token' => $user->token,
                ]);

                Auth::login($newUser);
                return redirect('/dashboard');
            }
        } catch (\Exception $e) {
            return redirect('/login');
        }
    }
}
