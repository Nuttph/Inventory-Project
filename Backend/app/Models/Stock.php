<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    // public $timestamps = false;
    protected $table = "Stock";
    protected $fillable = [
        'id',
        'productName',
        'price',
        'discount',
        'warranty',
        'quantity',
        'category',
        'manufacturer',
        'countryOfManufacture',
        'totalSale',
        'image',
        'detail',
        'active'
    ];
}
