<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get("employee", [EmployeeController::class, 'index']);
Route::get("employee/{id}", [EmployeeController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("employee", [EmployeeController::class, 'store']);
    Route::put("employee/{id}", [EmployeeController::class, 'update']);
    Route::delete("employee/{id}", [EmployeeController::class, 'destroy']);
});
