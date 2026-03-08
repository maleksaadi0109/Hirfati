<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = ['provider_id', 'image_url', 'title', 'description'];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
