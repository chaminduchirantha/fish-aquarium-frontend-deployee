import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import image from '../assets/18156825.jpg';
import { deliverySave } from '../services/delivery';

const DeliveryPage: React.FC = () => {
    const [customername, setCustomerName] = useState("")
    const [phonenumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [address , setAddress] = useState("")
    const [city , setCity] = useState("")
    const [deliveryDate, setDeliveryDate] = useState("")
    const [deliveryTime, setDeliveryTime] =useState("")
    const [postelCode, setPostelCode] = useState("")
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async()=>{
      if(!customername || !phonenumber || !email || !address || !city || !postelCode || !deliveryDate || !deliveryTime) {
        alert("Please fill all fields and select a rating.");
        return;
      }

      setLoading(true);

      const deliveryData = {
        customername, 
        phonenumber,
        email,
        address,
        city,
        deliveryDate,
        deliveryTime,
        postelCode
      };

      try {

        await deliverySave(deliveryData);
        alert("Delivery Submitted Successfully!");

        setCustomerName("");
        setPhoneNumber
        setEmail("");
        setAddress("");
        setCity("");
        setDeliveryDate("")
        setDeliveryTime("")
        setPostelCode("")

      } catch (error) {
        console.error(error);
        alert("Error submitting Delivery.");
      } finally {
        setLoading(false);
      }

    }

  return (
    <div className="min-h-screen bg-slate-50 mt-9 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-sky-800 mb-3">
            Delivery Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our smart aquarium solutions from intelligent fish care
            systems to automated tank management tools that make your aquarium
            experience easier and more enjoyable.
          </p>
        </div>

        {/* Main Content: Form + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Side: Delivery Form */}
          <form className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6 h-full flex flex-col">
            
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Truck className="text-teal-600" />
              <h2 className="text-xl font-semibold text-slate-800">Delivery Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Customer Name</label>
                <input 
                type="text"
                value={customername} 
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter You are Name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input 
                type="tel"
                value={phonenumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter You are Phone number" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your email" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Address</label>
                <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Enter your Address" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">City</label>
                <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="city" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Postal Code</label>
                <input 
                type="text"
                value={postelCode}
                onChange={(e) => setPostelCode(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="postal code" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Delivery Date</label>
                <input 
                type="date" 
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Delivery Time</label>
                <input 
                type="time" 
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full border mt-3 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button onClick={handleSubmit} disabled={loading} className="w-full bg-sky-600 text-white py-2 rounded-xl cursor-pointer text-lg font-semibold hover:bg-sky-800 transition">
                {loading ? "Submitting..." : "Submit Delivery"}
              </button>
            </div>
          </form>

          {/* Right Side: Image */}
          <div className="flex items-start justify-center h-full">
            <img
              src={image}
              alt="Aquarium"
              className="rounded-xl shadow-lg w-full object-cover h-full"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
