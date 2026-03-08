<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Provider;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['booking_id', 'customer_id', 'provider_id', 'rating', 'comment'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
