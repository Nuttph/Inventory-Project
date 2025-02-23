<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockFilterController extends Controller
{
    // ฟังก์ชันสำหรับฟิลเตอร์สินค้า
    public function index(Request $request)
    {
        // เริ่มต้นกับ query builder
        $query = Stock::query();

        if ($request->has('id')) {
            $query->where('id', 'like', $request->id);
        }
        // ฟิลเตอร์ตามชื่อสินค้า
        if ($request->has('productName')) {
            $query->where('productName', 'like', '%' . $request->productName . '%');
        }

        // ฟิลเตอร์ตามจำนวนสินค้า
        if ($request->has('sortQuantity')) {
            $query->where('sortQuantity', '=', $request->stockQuantity);
        }

        // ฟิลเตอร์ตามหมวดหมู่
        if ($request->has('category')) {
            $query->where('category', 'like', '%' . $request->category . '%');
        }

        // ฟิลเตอร์ตามราคาเริ่มต้น
        if ($request->has('priceMin')) {
            $query->where('price', '>=', $request->priceMin);
        }

        // ฟิลเตอร์ตามราคาสูงสุด
        if ($request->has('priceMax')) {
            $query->where('price', '<=', $request->priceMax);
        }

        // ฟิลเตอร์การจัดเรียงราคา
        if ($request->has('sortPrice')) {
            if ($request->sortPrice == 'asc') {
                $query->orderBy('price', 'asc');
            } else {
                $query->orderBy('price', 'desc');
            }
        }
        if ($request->has('sortQty')) {
            if ($request->sortQty == 'asc') {
                $query->orderBy('quantity', 'asc');
            } else {
                $query->orderBy('quantity', 'desc');
            }
        }
        if ($request->has('sortId')) {
            if ($request->sortId == 'asc') {
                $query->orderBy('id', 'asc');
            } else {
                $query->orderBy('id', 'desc');
            }
        }

        // ฟิลเตอร์การจัดเรียงวันที่สร้าง (created_at)
        if ($request->has('sortCreatedAt')) {
            if ($request->sortCreatedAt == 'asc') {
                $query->orderBy('created_at', 'asc'); // oldest first
            } else {
                $query->orderBy('created_at', 'desc'); // newest first
            }
        }

        // ฟิลเตอร์การจัดเรียงต้นทุน (cost)
        if ($request->has('costMin')) {
            $query->where('cost', '>=', $request->costMin);
        }

        if ($request->has('costMax')) {
            $query->where('cost', '<=', $request->costMax);
        }

        // ฟิลเตอร์การจัดเรียงยอดขายรวม (totalSale)
        if ($request->has('sortTotalSale')) {
            if ($request->sortTotalSale == 'asc') {
                $query->orderBy('totalSale', 'asc'); // lowest totalSale first
            } else {
                $query->orderBy('totalSale', 'desc'); // highest totalSale first
            }
        }

        // ฟิลเตอร์การจัดเรียงระยะเวลาการรับประกัน (warranty)
        if ($request->has('sortWarranty')) {
            if ($request->sortWarranty == 'asc') {
                $query->orderBy('warranty', 'asc'); // shortest warranty first
            } else {
                $query->orderBy('warranty', 'desc'); // longest warranty first
            }
        }

        // ฟิลเตอร์ตามสถานะ
        if ($request->has('active')) {
            $query->where('active', '=', $request->active);
        }

        // ฟิลเตอร์ตามประเทศผู้ผลิต (manufacturer country)
        if ($request->has('countryOfManufacture')) {
            $query->where('countryOfManufacture', 'like', '%' . $request->countryOfManufacture . '%');
        }
        if ($request->has('manufacturer')) {
            $query->where('manufacturer', 'like', '%' . $request->manufacturer . '%');
        }

        // เพิ่มการแพจิเนชัน
        $stocks = $query->paginate(20);

        // ส่งผลลัพธ์กลับ
        return response()->json($stocks);
    }
}
