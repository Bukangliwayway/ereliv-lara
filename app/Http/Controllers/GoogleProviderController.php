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
            $userInstance = User::where('email', $user->getEmail())->first();

            if ($userInstance) {
                $role = $userInstance->role;
                // If the user exists and has a provider ID and provider details, login the user
                if (!$userInstance->provider_id || !$userInstance->provider) {
                    Auth::login($userInstance);
                } else {
                    // If the user exists but doesn't have provider ID and provider details, update the record
                    $userInstance->provider_id = $user->id;
                    $userInstance->provider = 'google';
                    $userInstance->provider_token = $user->token;
                    $userInstance->save();
                    Auth::login($userInstance);
                }
            } else {
                // If the user doesn't exist, create a new record
                $userInstance = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => Hash::make(Str::random(10)),
                    'remember_token' => Str::random(60),
                    'email_verified_at' => now(),
                    'provider_id' => $user->id,
                    'provider' => 'google',
                    'provider_token' => $user->token,
                ]);
                Auth::login($userInstance);
            }

            $role = $userInstance->fresh()->role;

            $redirectTo = match ($role) {
                'reader' => 'reader.dashboard',
                'researcher' => 'researcher.dashboard',
                'admin' => 'admin.dashboard',
                default => '/',
            };

            // dd($redirectTo);

            return redirect()->intended(route($redirectTo));

        } catch (\Exception $e) {
            dd($e);
            return redirect('/login');
        }
    }
}
