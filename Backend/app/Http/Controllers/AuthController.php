<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $fields = $req->validate([
            'username' => 'required|max:200|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'name' => $fields['username'], // ให้ name เป็น username
            'password' => Hash::make($fields['password']), // เข้ารหัส Password
            'role' => 'ICT', // เพิ่ม role เป็น ICT หรือ admin ตามต้องการ
        ]);

        $token = $user->createToken($fields['username'], ['role:' . $user->role])->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $req)
    {
        $fields = $req->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $fields['username'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials']);
        }

        $token = $user->createToken($user->username, ['role:' . $user->role])->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $req)
    {
        $req->user()->tokens()->delete(); // ลบทุก token ที่ถูกสร้างโดยผู้ใช้นั้น

        return response()->json(['message' => 'Logged out successfully']);
    }
}
