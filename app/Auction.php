<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Product;

class Auction extends Model
{
    protected $fillable = [
        'start',
        'stop',
        'startPrice',
        'product_id',
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
