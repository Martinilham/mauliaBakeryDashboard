import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "components/card";
import SearchBar from "components/searchbar";
import DataClient from "./dataClient";

const Client = ( ) => {
  const [data, setData] = useState([]);
  const [record,setRecords] = useState([])
  

  const filter = (e)=>{
        setRecords(data.filter(f=>f.fname.toLowerCase().includes(e.target.value)))
  };


  const getUserData = async () => {
    try {
      const res = await axios.get("https://mauliya-bakeryserve.vercel.app/user", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === 401 || !res.data) {
        console.log("error");
      } else {
        setData(res.data);
        setRecords(res.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getUserData()
  }, 2000);

  return () => clearInterval(interval);
  }, []);



  

  return (
    <>
    
      <Card extra={"w-full h-full p-4"}>
        <div className="relative flex items-center justify-between w-full">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Development Table
          </div>
        </div>
        <SearchBar setSearch={filter}/>
        <div className="h-full w-full overflow-x-scroll xl: xl:overflow-x-hidden">
          <table className="mt-8 h-max w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Gambar
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Edit
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Hapus
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Nama
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Harga
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Kategori
                </th>
                <th className="border-b border-gray-200 pr-3 pb-[10px] text-start dark:!border-navy-700">
                  Stok
                </th>
              </tr>
            </thead>
            <tbody>
              <DataClient data={record}/>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Client;
