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


// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {


    // Reader routes


    // Researcher routes


    // Admin routes
    Route::middleware('CheckRole:admin')->group(function () {


    });

    Route::middleware('CheckRole:researcher')->group(function () {
        Route::get('/researches/works', [ResearchPaperController::class, 'works'])->name('researches.works');
        Route::get('/researches/', [ResearchPaperController::class, 'index'])->name('researches.index');
        Route::get('/researches/create', [ResearchPaperController::class, 'create'])->name('researches.create');
        Route::post('/researches', [ResearchPaperController::class, 'store'])->name('researches.store');
        Route::put('/researches/{id}', [ResearchPaperController::class, 'update'])->name('researches.update');
        Route::delete('/researches/{id}', [ResearchPaperController::class, 'destroy'])->name('researches.destroy');
        Route::get('/researches/{id}/edit', [ResearchPaperController::class, 'edit'])->name('researches.edit');
        Route::get('/researches/{researchPaper}', [ResearchPaperController::class, 'show'])->name('researches.show');

    });

    Route::middleware('CheckRole:reader')->group(function () {
        Route::get('/researches/', [ResearchPaperController::class, 'index'])->name('researches.index');
        Route::get('/researches/{researchPaper}', [ResearchPaperController::class, 'show'])->name('researches.show');
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

