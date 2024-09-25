<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // ตรวจสอบ token ที่ส่งมาใน header
        $token = $request->header('Authorization');
    
        // ตรวจสอบว่ามี token หรือไม่
        if ($token) {
            // คุณสามารถเพิ่มตรรกะเพื่อตรวจสอบความถูกต้องของ token ที่นี่
            // เช่น การตรวจสอบใน database หรือใช้ JWT
            // สมมุติว่า token ถูกต้อง ให้ดึงข้อมูลทั้งหมด
            $employees = Employee::all();
        } else {
            // ถ้าไม่มี token หรือ token ไม่ถูกต้อง ให้ดึงเฉพาะข้อมูลที่ is_visible เป็น true
            $employees = Employee::where('is_visible', true)->get();
        }
    
        return response()->json($employees);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'first_name' => 'required|max:100',
            'last_name' => 'required|max:100',
            'email' => 'required|email|unique:employees',
            'phone_number' => 'required|max:20',
            'address' => 'required',
            'date_of_birth' => 'required|date',
            'position' => 'required',
            'department' => 'required',
            'salary' => 'required|numeric',
            'hired_at' => 'required|date',
            'emergency_contact' => 'required',
            'nationality' => 'required',
            'gender' => 'required',
            'marital_status' => 'required',
            'notes' => 'nullable',
            'is_visible' => 'boolean',
        ]);

        // Create a new employee
        $employee = Employee::create($validatedData);

        return response()->json(['message' => 'Employee created successfully', 'data' => $employee], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $token = $request->header('Authorization');
        if ($token) {
            $employee = Employee::find($id);
        } else {
            // ดึงข้อมูลพนักงานเฉพาะที่มี is_visible เป็น true
            $employee = Employee::where('id', $id)->where('is_visible', true)->firstOrFail();
        }

        return response()->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the employee by ID
        $employee = Employee::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'first_name' => 'sometimes|required|max:100',
            'last_name' => 'sometimes|required|max:100',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'phone_number' => 'sometimes|required|max:20',
            'address' => 'sometimes|required',
            'date_of_birth' => 'sometimes|required|date',
            'position' => 'sometimes|required',
            'department' => 'sometimes|required',
            'salary' => 'sometimes|required|numeric',
            'hired_at' => 'sometimes|required|date',
            'emergency_contact' => 'sometimes|required',
            'nationality' => 'sometimes|required',
            'gender' => 'sometimes|required',
            'marital_status' => 'sometimes|required',
            'notes' => 'nullable',
            'is_visible' => 'boolean',
        ]);

        // Update the employee
        $employee->update($validatedData);

        return response()->json(['message' => 'Employee updated successfully', 'data' => $employee], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the employee by ID
        $employee = Employee::findOrFail($id);

        // Delete the employee
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
