<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    
    public function index(){
        return User::all();
    }
    public function show(User $user){
        return $user;
    }
    public function update(Request $request, User $user) {
        $fields = $request->validate([
            "username" => "required|string",
            "name" => "required|string|max:255",
            "password" => "required"
        ]);
    
        // ค้นหาผู้ใช้จาก username
        $user = User::where('username', $fields['username'])->first();
    
        // ตรวจสอบว่า user มีอยู่และรหัสผ่านถูกต้อง
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Info invalid']);
        }
    
        // อัปเดตข้อมูล user
        $user->update([
            'name' => $fields['name']
        ]);
    
        return response()->json(['updated' => $user], 200);
    }
    public function destroy(User $user){
        $user->delete();
        return ["message"=>"delete account success"];
    }
    public function status(Request $request, User $user){
        $f = $request->validate([
            'active'=> 'required|numeric'
        ]);
        $user->update(['active'=> $f['active']]);
        return response()->json([
            'message' => 'User status updated successfully',
            'user' => $user
        ]);
    }
}