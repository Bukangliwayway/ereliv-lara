<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RedisController;
use App\Http\Controllers\GoogleProviderController;
use App\Http\Controllers\ResearchPaperController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/guest/dashboard', function () {
        return Inertia::render('Guest/Dashboard');
    })->name('guest.dashboard');
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Route::get('/researches', [ResearchPaperController::class, 'index'])->name('researches.index');

    // Reader routes
    Route::middleware('CheckRole:reader')->group(function () {

    });

    // Researcher routes
    Route::middleware('CheckRole:researcher')->group(function () {
        Route::resource('researches', ResearchPaperController::class)->except(['index']);
    });

    // Admin routes
    Route::middleware('CheckRole:admin')->group(function () {

    });

    Route::middleware('CheckRole:researcher|reader')->group(function () {
        Route::resource('researches', ResearchPaperController::class)->only(['index']);
    });


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/auth/google/redirect', [GoogleProviderController::class, 'redirect'])->name('redirect');
Route::get('/auth/google/callback', [GoogleProviderController::class, 'callback'])->name('callback');

Route::resource('/redis', RedisController::class);
require __DIR__ . '/auth.php';


// For setting up a crud
// Route::resource('task', TaskController::class);

// Route::get('/task', [TaskController::class, 'index'])->name('task.index');
// Route::get('/task/create', [TaskController::class, 'create'])->name('task.create');
// Route::post('/task', [TaskController::class, 'store'])->name('task.store');
// Route::get('/task/{id}', [TaskController::class, 'show'])->name('task.show');
// Route::get('/task/{id}/edit', [TaskController::class, 'edit'])->name('task.edit');
// Route::put('/task/{id}', [TaskController::class, 'update'])->name('task.update');
// Route::delete('/task/[id', [TaskController::class, 'destroy'])->name('task.destroy');

