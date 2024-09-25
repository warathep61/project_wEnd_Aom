<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100)
                ->comment('ชื่อพนักงาน'); // ฟิลด์ที่ 1: ชื่อพนักงาน
            $table->string('last_name', 100)
                ->comment('นามสกุลพนักงาน'); // ฟิลด์ที่ 2: นามสกุลพนักงาน
            $table->string('email')->unique()
                ->comment('อีเมลพนักงาน'); // ฟิลด์ที่ 3: อีเมลพนักงาน
            $table->string('phone_number')
                ->comment('เบอร์โทรศัพท์พนักงาน'); // ฟิลด์ที่ 4: เบอร์โทรศัพท์พนักงาน
            $table->string('address')
                ->comment('ที่อยู่ของพนักงาน'); // ฟิลด์ที่ 5: ที่อยู่ของพนักงาน
            $table->date('date_of_birth')
                ->comment('วันเกิดของพนักงาน'); // ฟิลด์ที่ 6: วันเกิดพนักงาน
            $table->string('position')
                ->comment('ตำแหน่งของพนักงาน'); // ฟิลด์ที่ 7: ตำแหน่งงานของพนักงาน
            $table->string('department')
                ->comment('แผนกของพนักงาน'); // ฟิลด์ที่ 8: แผนกที่พนักงานสังกัด
            $table->string('salary')
                ->comment('เงินเดือนของพนักงาน'); // ฟิลด์ที่ 9: เงินเดือนพนักงาน
            $table->date('hired_at')
                ->comment('วันที่เริ่มทำงานของพนักงาน'); // ฟิลด์ที่ 10: วันที่พนักงานเริ่มทำงาน
            $table->string('emergency_contact')
                ->comment('ผู้ติดต่อกรณีฉุกเฉิน'); // ฟิลด์ที่ 11: ผู้ติดต่อกรณีฉุกเฉิน
            $table->string('nationality')
                ->comment('สัญชาติของพนักงาน'); // ฟิลด์ที่ 12: สัญชาติของพนักงาน
            $table->string('gender')
                ->comment('เพศของพนักงาน'); // ฟิลด์ที่ 13: เพศของพนักงาน
            $table->string('marital_status')
                ->comment('สถานภาพสมรสของพนักงาน'); // ฟิลด์ที่ 14: สถานภาพสมรสของพนักงาน
            $table->text('notes')->nullable()
                ->comment('หมายเหตุเพิ่มเติม'); // ฟิลด์ที่ 15: หมายเหตุเพิ่มเติม
            $table->boolean('is_visible')->default(true)
                ->comment('ฟิลด์ Boolean สำหรับควบคุมการแสดงข้อมูล'); // ฟิลด์ Boolean: ควบคุมการแสดงผลข้อมูล
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
