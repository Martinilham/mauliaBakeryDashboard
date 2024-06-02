import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailPesanan = ({ idProduct ,closeTab}) => {
  const [pesanan, setPesanan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pesanan/${idProduct}`);
        setPesanan(response.data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idProduct]);

  const updatePaymentStatus = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `https://mauliya-bakeryserve.vercel.app/updatepembayaran/${idProduct}`,
        { statusbayar: "success" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setPesanan((prev) => ({ ...prev, statusbayar: "success" }));
      } else {
        console.error("Failed to update payment status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const updateDiterima = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `https://mauliya-bakeryserve.vercel.app/updateDiterima/${idProduct}`,
        { statusditerima: "diterima" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setPesanan((prev) => ({ ...prev, statusditerima: "diterima" }));
      } else {
        console.error("Failed to update diterima status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating diterima status:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteProduk = async (id) => {
    try {
      const res = await axios.delete(`https://mauliya-bakeryserve.vercel.app/pesanan/${id}`);
      if (res.status === 200) {
        closeTab();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { _id,namapemesan, items, alamat, notlpn, total, statusbayar, statusditerima, tglorder } = pesanan;


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Nama Pemesan</h3>
            <p>{namapemesan}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <ul>
              {items.map(item => (
                <li key={item._id.$oid}>
                  <p>{item.namaproduk}</p>
                  <p>Harga: Rp {item.harga}</p>
                  <p>Jumlah: {item.jumlah}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Alamat Pengiriman</h3>
            <p>{alamat}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Nomor Telepon</h3>
            <p>{notlpn}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Harga</h3>
            <p>Rp {total}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Status Pembayaran</h3>
            <p>{statusbayar}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Status Diterima</h3>
            <p>{statusditerima}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Tanggal Order</h3>
            <p>{new Date(tglorder.$date).toLocaleString()}</p>
          </div>

              <div className="flex justify-between flex-wrap w-full">
              {statusbayar == "Bayar Ditempat" ? 
            <button className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 mr-2"
            onClick={updatePaymentStatus}
            >Pembayaran</button> 
            : 
            <button className="cursor-not-allowed mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 mr-2">Lunas</button>
          }
          {statusditerima == "processing" ? 
            <button className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={updateDiterima}
            >DiTerima</button> 
            : 
            <button className=" cursor-not-allowed mx-auto mt-4 linear rounded-[20px]  bg-gray-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">Diterima</button>
          }
          <button className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={()=>deleteProduk(idProduct)}
            >Dibatalkan</button> 

          
          <button className="mx-auto mt-4 linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
            onClick={()=>closeTab()}
            >Tutup</button> 
              </div>
          
        </div>
      </div>
    </div>
  );
};

export default DetailPesanan;
