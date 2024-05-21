import React, { useState, useEffect } from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";
import {
  lineChartOptionsTotalSpent,
} from "variables/charts";

const TotalSpent = () => {
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Jumlah data per halaman
  const totalPages = Math.ceil(salesData.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mauliya-bakeryserve.vercel.app/pesanan"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
  
        const monthlySales = {};
        data.forEach((order) => {
          const yearMonth = order.tglorder.split("-").slice(0, 2).join("-");
          if (!monthlySales[yearMonth]) {
            monthlySales[yearMonth] = { "Roti Kering": 0, "Roti Basah": 0 };
          }
  
          order.items.forEach((item) => {
            if (item.kategori === "Kue Kering") {
              monthlySales[yearMonth]["Roti Kering"] +=
                item.harga * item.jumlah;
            } else if (item.kategori === "Kue Basah") {
              monthlySales[yearMonth]["Roti Basah"] +=
                item.harga * item.jumlah;
            }
          });
        });
  
        const formattedData = Object.keys(monthlySales).map((yearMonth) => ({
          yearMonth,
          "Roti Kering": monthlySales[yearMonth]["Roti Kering"],
          "Roti Basah": monthlySales[yearMonth]["Roti Basah"],
        }));
  
        // Sort the formattedData based on yearMonth
        formattedData.sort((a, b) => {
          const dateA = new Date(a.yearMonth);
          const dateB = new Date(b.yearMonth);
          return dateA - dateB;
        });
  
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  // Menghitung total penjualan untuk setiap kategori
  const totalSoldByCategory = () => {
    const totals = { "Roti Kering": 0, "Roti Basah": 0 };
    salesData.forEach((data) => {
      totals["Roti Kering"] += data["Roti Kering"];
      totals["Roti Basah"] += data["Roti Basah"];
    });
    return totals;
  };

  const totalSold = totalSoldByCategory();

  // Pengaturan data untuk grafik
  const lineChartDataTotalSpent = [
    {
      name: "Roti Kering",
      data: Object.keys(salesData).map((key) => salesData[key]["Roti Kering"]),
      color: "#4318FF",
    },
    {
      name: "Roti Basah",
      data: Object.keys(salesData).map((key) => salesData[key]["Roti Basah"]),
      color: "#6AD2FF",
    },
  ];

  // Menyesuaikan kategori (bulan) di dalam opsi grafik
  const categories = salesData.map((data) => data.yearMonth);

  const adjustedLineChartOptionsTotalSpent = {
    ...lineChartOptionsTotalSpent,
    xaxis: {
      ...lineChartOptionsTotalSpent.xaxis,
      categories: categories,
    },
  };

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">This month</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            Total Sold
          </p>
            <div>
              <p className="text-start">Roti Kering: {totalSold["Roti Kering"]}</p>
              <p className="text-start">Roti Basah: {totalSold["Roti Basah"]}</p>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart
            options={adjustedLineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      
    </Card>
  );
};

export default TotalSpent;

