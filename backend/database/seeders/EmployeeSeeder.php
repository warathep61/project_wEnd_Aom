<?php

namespace Database\Seeders;

use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::insert([
            [
                'first_name' => 'สมชาย',
                'last_name' => 'ใจดี',
                'email' => 'somchai@example.com',
                'phone_number' => '0812345678',
                'address' => '123/4 หมู่ 5 แขวงคลองสาม เขตบางเขน กรุงเทพฯ',
                'date_of_birth' => '1985-05-15',
                'position' => 'ผู้จัดการ',
                'department' => 'ฝ่ายขาย',
                'salary' => "60000.00",
                'hired_at' => '2020-01-15',
                'emergency_contact' => 'นางสาวสมพร ใจดี 0809876543',
                'nationality' => 'ไทย',
                'gender' => 'male',
                'marital_status' => 'สมรส',
                'notes' => 'เป็นพนักงานที่ทำงานได้ดีเยี่ยม',
                'is_visible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'first_name' => 'สุดา',
                'last_name' => 'นามดี',
                'email' => 'suda@example.com',
                'phone_number' => '0898765432',
                'address' => '45/6 ตำบลในเมือง อำเภอเมือง จังหวัดเชียงใหม่',
                'date_of_birth' => '1990-03-25',
                'position' => 'เจ้าหน้าที่บัญชี',
                'department' => 'บัญชี',
                'salary' => "45000.00",
                'hired_at' => '2019-07-10',
                'emergency_contact' => 'นายสมบัติ นามดี 0887654321',
                'nationality' => 'ไทย',
                'gender' => 'female',
                'marital_status' => 'โสด',
                'notes' => 'เชี่ยวชาญเรื่องการเงิน',
                'is_visible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'first_name' => 'กฤษณะ',
                'last_name' => 'เก่งมาก',
                'email' => 'krisana@example.com',
                'phone_number' => '0845678901',
                'address' => '99/9 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ',
                'date_of_birth' => '1988-12-12',
                'position' => 'นักพัฒนาโปรแกรม',
                'department' => 'ไอที',
                'salary' => '50000.00',
                'hired_at' => '2021-09-01',
                'emergency_contact' => 'นางสมศรี เก่งมาก 0896543210',
                'nationality' => 'ไทย',
                'gender' => 'male',
                'marital_status' => 'โสด',
                'notes' => 'เชี่ยวชาญด้านการพัฒนาเว็บแอปพลิเคชัน',
                'is_visible' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
