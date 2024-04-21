import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Data = (props)=>{
    const {data} = props
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const rupiah = (number) => {
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
    
        return formatter.format(number);
    };

    const deleteProduk = async (id) => {
        setIsOpen(false);
        try {
          await axios.delete(`http://localhost:5000/getdata/${id}`);
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
    
      const closeDialog = () => {
        setDeleteItemId(null);
        setIsOpen(false);
      };


    return (
        <>
            {data.map((barang, index) => (
                <tr
                  key={barang._id}
                  className={`${index % 2 === 0 ? "dark" : "light"}:bg-white hover:bg-gray-200  dark:${
                    index % 2 === 0 ? "odd" : "even"
                  }:bg-gray-800 dark:hover:bg-gray-700 `}
                >
                  <td className="px-3 py-4  text-sm font-medium ">
                    <img
                      src={barang.imgpath}
                      alt={barang.namaproduk}
                      style={{ maxWidth: "60px", height: "60px" }}
                    />
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold border-none text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => navigate(`/edit/${barang._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap text-start text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold border-none text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      
                    >
                      Delete
                    </button>
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.fname}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {rupiah(barang.harga)}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.kategori}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {barang.jumlah}
                  </td>
                </tr>
              ))}
        </>
    )
}

export default Data;