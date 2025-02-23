<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InvenController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockFilterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('stock', StockController::class);
Route::apiResource('stock', StockController::class);
Route::get('/stock-filter', [StockFilterController::class, 'index']);
Route::apiResource('inventory', InvenController::class);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('stock', StockController::class);
Route::apiResource('users',UserController::class);
Route::patch('/user/status/{user}',[UserController::class,'status']);

Route::apiResource('category', CategoryController::class);