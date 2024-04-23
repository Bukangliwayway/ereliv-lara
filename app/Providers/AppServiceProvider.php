<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client as GuzzleClient;
use Http\Adapter\Guzzle7\Client as GuzzleAdapter;
use Psr\Http\Client\ClientInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(ClientInterface::class, function ($app) {
            return GuzzleAdapter::createWithConfig([]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $this->configureRateLimiting();

        // $this->routes(function () {
        //     Route::middleware('api')
        //         ->prefix('api')
        //         ->group(base_path('routes/api.php'));

        //     Route::middleware('web')
        //         ->group(base_path('routes/web.php'));
        // });

        // Route::middleware('admin')->group(function () {
        //     Route::bind('admin', function ($value) {
        //         return \App\Models\User::where('role', 'admin')->findOrFail($value);
        //     });
        // });

        // Route::middleware('reader')->group(function () {
        //     Route::bind('reader', function ($value) {
        //         return \App\Models\Reader::where('role', 'reader')->findOrFail($value);
        //     });
        // });

        // Route::middleware('researcher')->group(function () {
        //     Route::bind('researcher', function ($value) {
        //         return \App\Models\User::where('role', 'researcher')->findOrFail($value);
        //     });
        // });
    }

    /**
     * Configure the rate limiters for the application.
     */
    // protected function configureRateLimiting(): void
    // {
    //     RateLimiter::for('api', function (Request $request) {
    //         return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    //     });
    // }
}