<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    public function index()
    {
        return Stock::paginate(20);
        // return "Hello world";
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'productName' => 'required|nullable|string', //1
            'price' => 'required|nullable|numeric', //2
            'warranty' => 'required|nullable|integer', //3
            'quantity' => 'required|nullable|integer', //4
            'category' => 'required|nullable|string', //5
            'manufacturer' => 'required|nullable|string', //6
            'countryOfManufacture' => 'required|nullable|string', //7
            'totalSale' => 'nullable|integer', //8
            'image' => 'required|nullable|string', //9
            'detail'=> 'required|string', //10
            'discount' => 'nullable|numeric', //11
            'cost' => 'nullable|numeric', //12
            'active' => 'nullable|in:0,1', //13
        ]);
        $stock = Stock::create($validated);
        return ["data"=>$stock];
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        return $stock;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        $validated = $request->validate([
            'productName' => 'required|string|max:255',
            'price' => 'required|numeric',
            'discount' => 'required|numeric',
            'warranty' => 'required|integer',
            'quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'countryOfManufacture' => 'required|string|max:255',
            'totalSale' => 'nullable|integer',
            'image' => 'required|string|max:255',
            'detail' => 'required|string',
            'active' => 'required|numeric',
        ]);
        
        $stock->update($validated);
        return ['update'=> $stock];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();
        return ['message'=>"delete success"];
    }
}
