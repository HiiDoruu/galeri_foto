<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FotoController;
use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\KomentarController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvfoto_ider and all of them will
| be assigned to the "api" mfoto_iddleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('foto', [FotoController::class, 'index']);
Route::post('foto', [FotoController::class, 'store']);
Route::get('foto/{foto_id}', [FotoController::class, 'show']);
Route::get('foto/{foto_id}/edit', [FotoController::class, 'edit']);
Route::put('foto/{foto_id}/edit', [FotoController::class, 'update']);
Route::delete('foto/{foto_id}/delete', [FotoController::class, 'destroy']);

Route::get('album', [AlbumController::class, 'index']);
Route::post('album', [AlbumController::class, 'store']);
Route::get('album/{album_id}', [AlbumController::class, 'show']);
Route::get('album/{album_id}/edit', [AlbumController::class, 'edit']);
Route::put('foto/{album_id}/edit', [AlbumController::class, 'update']);
Route::delete('album/{album_id}/delete', [AlbumController::class, 'destroy']);

Route::get('komentar', [KomentarController::class, 'index']);
Route::post('komentar', [KomentarController::class, 'store']);
Route::get('komentar/{komentar_id}', [KomentarController::class, 'show']);
Route::get('komentar/{komentar_id}/edit', [KomentarController::class, 'edit']);
Route::put('komentar/{komentar_id}/edit', [KomentarController::class, 'update']);
Route::delete('komentar/{komentar_id}/delete', [KomentarController::class, 'destroy']);

Route::get('like', [LikeController::class, 'index']);
Route::post('like', [LikeController::class, 'store']);
Route::get('like/{like_id}', [LikeController::class, 'show']);
Route::get('like/{like_id}/edit', [LikeController::class, 'edit']);
Route::put('like/{like_id}/edit', [LikeController::class, 'update']);
Route::delete('like/{like_id}/delete', [LikeController::class, 'destroy']);

Route::get('user', [UserController::class, 'index']);
Route::post('user', [UserController::class, 'store']);
Route::get('user/{user_id}', [UserController::class, 'show']);
Route::get('user/{user_id}/edit', [UserController::class, 'edit']);
Route::put('user/{user_id}/edit', [UserController::class, 'update']);
Route::delete('user/{user_id}/delete', [UserController::class, 'destroy']);