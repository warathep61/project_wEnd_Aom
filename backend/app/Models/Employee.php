<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'address',
        'date_of_birth',
        'position',
        'department',
        'salary',
        'hired_at',
        'emergency_contact',
        'nationality',
        'gender',
        'marital_status',
        'notes',
        'is_visible',
    ];
}
