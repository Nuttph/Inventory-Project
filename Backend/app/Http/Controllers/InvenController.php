<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class InvenController extends Controller
{
    //
    public function index(){
        return Stock::all();;
    }
}
