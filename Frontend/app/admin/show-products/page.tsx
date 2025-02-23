/* eslint-disable */
"use client";
import Loading from "@/app/components/Loading";
import { Product, Root } from "@/app/interfaces/product";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeadTitle from "@/app/components/HeadTitle";

const ShowProduct = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rootP, setRootP] = useState<Root | null>(null);
  const [filters, setFilters] = useState({
    productId: "",
    productName: "",
    quantity: "",
    category: "",
    sortQty: "",
    priceMin: "",
    priceMax: "",
    sortPrice: "",
    sortId: "",
    costMin: "",
    costMax: "",
    sortCost: "",
    sortTotalSale: "",
    sortWarranty: "",
    status: "",
    countryOfManufacture: "",
    manufacturer: "",
  });
  const handlePageChange = (newPage: number) => {
    if (rootP && newPage > 0 && newPage <= rootP.last_page) {
      setPage(newPage);
    }
  };

  const generatePageNumbers = () => {
    if (!rootP) return [];
    const pages = [];
    const totalPages: number = rootP?.last_page;
    if (totalPages > 10) {
      pages.push(1);
      if (page > 4) pages.push("...");
      for (
        let i = Math.max(page - 2, 2);
        i <= Math.min(page + 2, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const fetchProduct = async (filterParams:any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filterParams.productName)
        params.append("productName", filterParams.productName);
      if (filterParams.sortQty) params.append("sortQty", filterParams.sortQty);
      if (filterParams.category)
        params.append("category", filterParams.category);
      if (filterParams.priceMin)
        params.append("priceMin", filterParams.priceMin);
      if (filterParams.priceMax)
        params.append("priceMax", filterParams.priceMax);
      if (filterParams.sortPrice)
        params.append("sortPrice", filterParams.sortPrice);
      if (filterParams.sortId) params.append("sortId", filterParams.sortId);
      if (filterParams.costMin) params.append("costMin", filterParams.costMin);
      if (filterParams.costMax) params.append("costMax", filterParams.costMax);
      if (filterParams.sortTotalSale)
        params.append("sortTotalSale", filterParams.sortTotalSale);
      if (filterParams.sortWarranty)
        params.append("sortWarranty", filterParams.sortWarranty);
      if (filterParams.status) params.append("active", filterParams.status);
      if (filterParams.countryOfManufacture)
        params.append(
          "countryOfManufacture",
          filterParams.countryOfManufacture
        );
      if (filterParams.manufacturer)
        params.append("manufacturer", filterParams.manufacturer);
      if (filterParams.productId) params.append("id", filterParams.productId);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stock-filter?page=${page}&${params.toString()}`
      );

      setProductData(res.data.data);
      setRootP(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(filters);
  }, [page]);

  const [allCol, setAllCol] = useState<Product[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory`
      );
      setAllCol(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    fetchProduct(filters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col mx-auto">
      <div className="p-4">
      <HeadTitle title={"Inventory Search"}/>
        <div className="bg-white w-full flex flex-col justify-between p-2 mb-4">
          <div className="bg-white w-full flex flex-col justify-between p-6 mb-6 rounded-lg shadow-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-4"
            >
              {/* Search */}

              <input
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search by Product Name"
                name="productName"
                value={filters.productName}
                onChange={handleFilterChange}
              />
              <input
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search by Product Id"
                name="productId"
                value={filters.productId}
                onChange={handleFilterChange}
              />
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Select Category</option>
                {allCol &&
                  [...new Set(allCol.map((item) => item.category))].map(
                    (category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    )
                  )}
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="sortQty"
                value={filters.sortQty}
                onChange={handleFilterChange}
              >
                <option value="">Sort by Quantity</option>
                <option value="asc">Least to Most</option>
                <option value="desc">Most to Least</option>
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="manufacturer"
                value={filters.manufacturer}
                onChange={handleFilterChange}
              >
                <option value="">Select Brands</option>
                {allCol &&
                  [...new Set(allCol.map((item) => item.manufacturer))].map(
                    (manufacturer, index) => (
                      <option key={index} value={manufacturer}>
                        {manufacturer}
                      </option>
                    )
                  )}
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="countryOfManufacture"
                value={filters.countryOfManufacture}
                onChange={handleFilterChange}
              >
                <option value="">Select Country</option>
                {allCol &&
                  [
                    ...new Set(allCol.map((item) => item.countryOfManufacture)),
                  ].map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="sortPrice"
                value={filters.sortPrice}
                onChange={handleFilterChange}
              >
                <option value="">Sort by Price</option>
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="sortTotalSale"
                value={filters.sortTotalSale}
                onChange={handleFilterChange}
              >
                <option value="">Sort by Total Sold</option>
                <option value="asc">Lowest Sold</option>
                <option value="desc">Highest Sold</option>
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="sortId"
                value={filters.sortId}
                onChange={handleFilterChange}
              >
                <option value="">Sort by Date</option>
                <option value="asc">Oldest First</option>
                <option value="desc">Newest First</option>
              </select>
              <select
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              <input
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Min Price"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
              />
              <input
                className="border border-gray-300 p-3 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Max Price"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-3 rounded-md mt-4 w-full md:w-1/4 mx-auto hover:bg-blue-600 transition duration-200"
              >
                Search
              </button>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border border-gray-300 bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Sale Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total Sale</th>
                <th className="border p-2">Manufacturer</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {productData &&
                productData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2 text-center">
                      {String(item.id).padStart(6, "0")}
                    </td>
                    <td className="border p-2">{item.productName}</td>
                    <td className="border p-2">{item.category}</td>
                    <td className="border p-2 text-right">
                      {new Intl.NumberFormat().format(
                        parseFloat(Number(item.price).toFixed(2))
                      )}{" "}
                      บาท
                    </td>
                    <td className="border p-2 text-center">
                      {new Intl.NumberFormat().format(
                        parseFloat(Number(item.quantity).toFixed(2))
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {new Intl.NumberFormat().format(
                        parseFloat(Number(item.totalSale).toFixed(2))
                      )}
                    </td>
                    <td className="border p-2">{item.manufacturer}</td>
                    <td className="border p-2">{item.countryOfManufacture}</td>
                    <td
                      className={`${
                        item.active ? "text-green-500" : "text-red-500"
                      } border p-2 text-center`}
                    >
                      {item.active ? "Active" : "Inactive"}
                    </td>
                    <td
                      onClick={() => {
                        redirect("/admin/show-products/" + item.id);
                      }}
                      className="border p-2 text-center cursor-pointer text-blue-400 hover:text-blue-600 duration-300 hover:underline"
                    >
                      Detail
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </motion.div>

        <div className="flex justify-center my-4 space-x-2">
          <button
            className={`bg-green-500 px-4 py-2 rounded-lg text-white ${
              page === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            First
          </button>

          <button
            className={`bg-green-500 px-4 py-2 rounded-lg text-white ${
              page === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &laquo; Prev
          </button>

          {generatePageNumbers().map((num, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                num === page
                  ? "bg-green-700 text-white"
                  : "bg-gray-300 text-black"
              } ${num === "..." ? "text-gray-500" : ""}`}
              onClick={() => num !== "..." && handlePageChange(Number(num))}
              disabled={num === "..."}
            >
              {num}
            </button>
          ))}

          <button
            className={`bg-green-500 px-4 py-2 rounded-lg text-white ${
              page === rootP?.last_page ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === rootP?.last_page}
          >
            Next &raquo;
          </button>

          <button
            className={`bg-green-500 px-4 py-2 rounded-lg text-white ${
              page === rootP?.last_page ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => {
              rootP && handlePageChange(rootP?.last_page);
            }}
            disabled={page === rootP?.last_page}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
