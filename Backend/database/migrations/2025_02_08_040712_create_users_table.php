<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // ชื่อผู้ใช้
        $table->string('username')->unique(); // Username ต้องไม่ซ้ำ
        $table->string('password'); // Password ที่เข้ารหัสแล้ว
        $table->string('salt')->nullable(); // ✅ ปรับเป็น nullable ถ้ามี
        $table->rememberToken();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
