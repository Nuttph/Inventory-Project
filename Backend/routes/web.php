<?php

// use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // return view('welcome');
    return view('welcome');
});
Route::get('/test-session', function () {
    session(['key' => ["message"=>'Hello from Laravel']]);
    return session('key');
});
