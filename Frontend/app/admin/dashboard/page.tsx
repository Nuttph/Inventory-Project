"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Product } from "@/app/interfaces/product";
import { UseAuth } from "../../auth/auth";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);
import { VscGraph } from "react-icons/vsc";
import { MdOutlineCategory } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaProductHunt } from "react-icons/fa";
import { motion } from "framer-motion";
import HeadTitle from "@/app/components/HeadTitle";

//type

type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};


const Dashboard: React.FC = () => {
  UseAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [chartData, setChartData] = useState<ChartDataType | null>(null);
  const [chartRevenue, setChartRevenue] = useState<ChartDataType | null>(null);

  const setBarChartData = () => {
    const productsWithProfit = products.map((p) => ({
      ...p,
      profit: (p.price - p.cost) * p.totalSale,
    }));
    const sortedProducts = productsWithProfit
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 15)
      .reverse();
    setChartData({
      labels: sortedProducts.map((p) => p.productName),
      datasets: [
        {
          label: "Profit",
          data: sortedProducts.map((p) => p.profit),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  };
  const setBarChartRevenue = () => {
    const productsWithProfit = products.map((p) => ({
      ...p,
      revenue: p.price * p.totalSale,
    }));
    const sortedProducts = productsWithProfit
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 15)
      .reverse();
    setChartRevenue({
      labels: sortedProducts.map((p) => p.productName),
      datasets: [
        {
          label: "Revenue",
          data: sortedProducts.map((p) => p.revenue),
          backgroundColor: "rgb(131, 219, 90,0.6)",
          borderColor: "rgb(71, 213, 71)",
          borderWidth: 1,
        },
      ],
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      setBarChartData();
      setBarChartRevenue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  if (products.length === 0 || typeof window === "undefined") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const profitData = products.map((product) => ({
    ...product,
    profit: product.price - product.cost,
  }));

  const totalProfit = profitData.reduce(
    (acc, product) => acc + product.profit * product.totalSale,
    0
  );

  const revenue = products.reduce(
    (acc, product) => acc + product.price * product.totalSale,
    0
  );

  const bestSellingProduct = products.reduce(
    (max, product) => (product.totalSale > max.totalSale ? product : max),
    products[0]
  );

  const categorySales = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.totalSale;
    return acc;
  }, {} as { [key: string]: number });

  const bestSellingCategory = Object.keys(categorySales).reduce(
    (max, category) =>
      categorySales[category] > (categorySales[max] || 0) ? category : max,
    ""
  );

  const categorySummary = products.reduce(
    (
      acc: { [categoryName: string]: { quantity: number; totalSale: number ;revenue:number; profit:number} },
      product
    ) => {
      const category = product.category;

      if (!acc[category]) {
        acc[category] = { quantity: 0, totalSale: 0 ,revenue:0 ,profit:0 };
      }

      acc[category].quantity += product.quantity;
      acc[category].totalSale += product.totalSale;
      acc[category].revenue += product.price * product.totalSale;
      acc[category].profit += product.cost * product.totalSale;

      return acc;
    },
    {}
  );
  const categorySummaryArray = Object.entries(categorySummary).map(
    ([category, values]) => ({
      category,
      ...values,
    })
  );

  // console.log(categorySummaryArray);

  const categoryCounts = products.reduce(
    (acc: { [categoryName: string]: number }, product) => {
      const categoryName = product.category;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += product.totalSale;
      return acc;
    },
    {}
  );

  const sortedCategories = Object.entries(categoryCounts);

  const categoryChartData = {
    labels: sortedCategories.map((entry) => entry[0]).reverse(),
    datasets: [
      {
        label: "Sold qty",
        data: sortedCategories.map((entry) => entry[1]).reverse(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryRevenue = products.reduce(
    (acc: { [categoryName: string]: number }, product) => {
      const categoryName = product.category;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += product.price * product.totalSale;
      return acc;
    },
    {}
  );

  const sortedCategoriesRevenue = Object.entries(categoryRevenue);

  const categoryChartDataRevenue = {
    labels: sortedCategoriesRevenue.map((entry) => entry[0]).reverse(),
    datasets: [
      {
        label: "Revenue",
        data: sortedCategoriesRevenue.map((entry) => entry[1]).reverse(),
        backgroundColor: "rgba(153, 50, 204, 0.6)", // สีม่วงโปร่งแสง
        borderColor: "rgba(153, 50, 204, 1)",     // สีม่วงทึบ
        borderWidth: 1,
      },
    ],
  };

  const iconClassStyle =
    "absolute right-[-10px] top-[-30px] z-1 p-4 w-[80px] h-[80px] rounded-xl group-hover:top-[-15px] duration-300 shadow-xl";

  const topBoxData = [
    {
      title: "Total Profit:",
      value: `${new Intl.NumberFormat().format(
        parseFloat(totalProfit.toFixed(2))
      )} Bath`,
      icon: (
        <VscGraph className={`${iconClassStyle} text-green-600 bg-green-200`} />
      ),
    },
    {
      title: "Total Revenue:",
      value: `${new Intl.NumberFormat().format(
        parseFloat(revenue.toFixed(2))
      )} Bath`,
      icon: (
        <LiaCoinsSolid
          className={`${iconClassStyle} text-yellow-500 bg-yellow-100`}
        />
      ),
    },
    {
      title: "Best Selling Product:",
      value: `${bestSellingProduct?.productName || "N/A"}`,
      value2: `Total Sold: ${
        new Intl.NumberFormat().format(bestSellingProduct?.totalSale) || 0
      } Qty`,
      icon: (
        <FaProductHunt
          className={`${iconClassStyle} text-blue-500 bg-blue-200`}
        />
      ),
    },
    {
      title: "Best Selling Category:",
      value: `${bestSellingCategory || "N/A"}`,
      value2: `Total Sold: ${
        new Intl.NumberFormat().format(categorySales[bestSellingCategory]) || 0
      } Qty`,
      icon: (
        <MdOutlineCategory
          className={`${iconClassStyle} text-purple-500 bg-purple-200`}
        />
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <HeadTitle title={"Dashboard"}/>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}>
      <div className="flex flex-wrap gap-4 justify-between p-6">
        {topBoxData.map((item, index) => (
          <div
            key={index}
            className="min-w-[250px] group flex shadow-xl border-[1px] w-full border-gray-100 relative duration-300 cursor-pointer items-center justify-center flex-col text-lg mb-4 bg-white p-4 rounded-lg flex-1 min-h-[170px]"
          >
            {item.icon}
            <div className="font-semibold">{item.title}</div>
            <div className="font-semibold">{item.value}</div>
            {item.value2 && <div>{item.value2}</div>}
          </div>
        ))}
      </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}>
      <div className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen">
        {/* แถวแรก - Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              Product Profit
            </h2>
            {chartData ? (
              <Bar data={chartData} />
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
              Product Revenue
            </h3>
            {chartRevenue ? (
              <Bar data={chartRevenue} />
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </div>

        {/* แถวสอง - Sales by Category & Empty Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
              Sold by Category
            </h3>
            {categoryChartData ? (
              <Bar data={categoryChartData} />
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
            Revenue by Category
            </h3>
            {categoryChartData ? (
              <Bar data={categoryChartDataRevenue} />
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </div>

        {/* ตารางแสดงข้อมูล */}
        <div className="p-6 bg-white rounded-xl shadow-md max-w-[800px] overflow-auto overflow-x-scroll">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
            Category Summary
          </h3>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Sold</th>
                <th className="p-3 text-left">Revenue</th>
                <th className="p-3 text-left">Profit</th>
              </tr>
            </thead>
            <tbody>
              {categorySummaryArray.sort((a,b)=>b.totalSale-a.totalSale).map((item, index) => (
                <tr key={index} className={`border-t hover:bg-gray-100 ${index == 0 && "bg-yellow-400 hover:bg-yellow-500"} ${index == 1 && "bg-yellow-300 hover:bg-yellow-500"} ${index == 2 && "bg-yellow-200 hover:bg-yellow-500"}`}>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{new Intl.NumberFormat().format(item.quantity)}</td>
                  <td className="p-3">{new Intl.NumberFormat().format(item.totalSale)}</td>
                  <td className="p-3">{new Intl.NumberFormat().format(item.revenue)}</td>
                  <td className="p-3">{new Intl.NumberFormat().format(item.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
