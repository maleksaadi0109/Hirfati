<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Provider;
use App\Models\Message;
use App\Models\Payment;
use App\Models\Review;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'provider_id', 'problem_description',
        'scheduled_date', 'agreed_price', 'status'
    ];

    protected $casts = [
        'scheduled_date' => 'datetime',
        'agreed_price' => 'decimal:2',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
