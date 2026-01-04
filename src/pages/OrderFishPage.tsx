import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft,MapPin, ShoppingBag, Truck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fishOrderSave } from '../services/fishOrder';
import { useAuth } from '../context/authContext';


const CheckoutPage: React.FC = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = state || {
    fishName: "Unknown Fish",
    price: "0",
    qty: 1,
    image: ""
  };

  // Parse price to ensure it's a number with fallback
  const parsePrice = (price: any): number => {
    try {
      if (typeof price === 'number') {
        return isNaN(price) ? 0 : price;
      }
      if (typeof price === 'string') {
        const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(cleanPrice) ? 0 : cleanPrice;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  const validPrice = parsePrice(product.price);
  const validQty = parseInt(String(product.qty)) || 1;

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    address: '',
    apartment: '',
    qty: '',
    orderType: '',
    paymentMethod: '',
    orderDate: new Date().toISOString().split('T')[0],
    amount: 0
  });

  const currentQty = formData.qty ? parseInt(formData.qty) : validQty;
  const subtotal = validPrice > 0 ? validPrice * currentQty : 0;

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, amount: subtotal }));
  }, [subtotal]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
      // If Take Away selected → force card payment
      if (name === 'orderType' && value === 'Take Away') {
        return {
          ...prev,
          orderType: value,
          paymentMethod: 'card'
        };
      }

      return { ...prev, [name]: value };
    });
  };


  const handleOrderSubmit = async () => {
    if (!formData.email || !formData.firstname || !formData.lastname || !formData.address) {
      setAlert({ type: 'error', message: 'Please fill all required fields' });
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        paymentmethod: formData.paymentMethod,
        amount: subtotal.toString(),
        orderType: formData.orderType,
        orderDate: formData.orderDate,
        fishname: product.fishName,
        price: validPrice.toString(),
        qty: currentQty,
        status: "pending",

      };

      await fishOrderSave(orderData);
      setAlert({ type: 'success', message: 'Order placed successfully!' });

        if (formData.paymentMethod === 'card') {
            navigate('/payment', { state: { amount: subtotal } }); 
        } else if (formData.paymentMethod === 'cod') {
            navigate('/dilivery'); 
        }
    
    } catch (error: any) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to place order' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-gray-800 flex flex-col lg:flex-row mt-10">
      
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-[58%] px-6 py-10 lg:px-20 lg:py-14 order-2 lg:order-1">
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Header / Logo Area */}
          <h1 className="text-3xl font-extrabold mb-10 text-sky-900 tracking-tight">
            Aqua <span className="text-sky-500">World</span>
          </h1>
          
          {/* Contact Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">Contact</h2>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email "
              className="w-full border rounded-xl border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Fill the Orders</h2>

            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="w-full md:w-1/2 border rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="w-full md:w-1/2 border rounded-xl border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>

            {/* Address Fields */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.address}
              onChange={handleInputChange}
            />

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="number"
                name="qty"
                placeholder="Qty"
                className="w-full md:w-1/2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.qty}
                onChange={handleInputChange}
              />
              <div className="w-full md:w-1/2 relative">
                 <select 
                    name="orderType"
                    className="w-full border border-gray-300 rounded-xl p-3 appearance-none bg-white text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.orderType}
                    onChange={handleInputChange}
                 >
                    <option value="Dilivery">Cash On Dilivery</option>
                    <option value="Take Away">Take Away</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

           {/* Payment Method Section (Added based on request) */}
           <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="border border-gray-300 rounded-xl overflow-hidden">
                <div className="flex items-center p-4 border-b border-gray-200 bg-gray-50">
                    <input 
                        type="radio" 
                        id="card" 
                        name="paymentMethod" 
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="card Payment" className="font-medium flex-1 cursor-pointer">Credit / Debit Card</label>
                </div>
                <div className="flex items-center p-4 cursor-pointer">
                    <input 
                        type="radio" 
                        id="cod" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-blue-600  disabled:opacity-50"
                        disabled={formData.orderType === 'Take Away'}
                    />
                    <label htmlFor="Cash On Delivery" className="font-medium flex-1 cursor-pointer">Cash on Delivery</label>
                </div>
            </div>
           </div>

           {/* Pay Button & Footer */}
           <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-8 gap-4">
              <button 
                 className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                 onClick={() => navigate(-1)}
               >
                   <ChevronLeft className="h-4 w-4 mr-1 cursor-pointer" /> Back
              </button>
              <button 
                 onClick={handleOrderSubmit}
                 disabled={loading}
                 className="w-full md:w-auto cursor-pointer bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 font-semibold shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {loading ? 'Processing...' : `Order Rs. ${subtotal.toFixed(2)}`}
              </button>
           </div>

           {/* Alert */}
           {alert && (
             <div className={`mt-4 p-3 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
               {alert.message}
             </div>
           )}
        </div>
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="w-full lg:w-[42%] bg-gray-50 border-l border-gray-200 px-4 py-8 lg:px-12 lg:py-12 order-1 lg:order-2">
        <div className="lg:top-8 max-w-md mx-auto lg:mx-0">
             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingBag className="text-sky-600" /> Order Summary
            </h2>
            
            {/* Product Item */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 transition hover:shadow-md">
                <div className="flex gap-4">
                    <div className="relative shrink-0">
                        <div className="w-50 h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img 
                                src={product.image} 
                                alt={product.fishname} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full shadow border-2 border-white">
                            {currentQty}
                        </span>
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{product.fishName}</h3>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-400">Qty: {currentQty}</p>
                            <p className="font-bold text-lg text-gray-900">Rs. {isNaN(validPrice) ? '0' : validPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex justify-between items-center mb-3 text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">Rs. {isNaN(subtotal) ? '0.00' : subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                
                <div className="h-px bg-gray-100 my-4 w-full"></div>

                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <div className="text-right">
                        <span className="text-sm text-gray-400 font-normal mr-2">LKR</span>
                        <span className="text-2xl font-extrabold text-sky-700">
                            {isNaN(subtotal) ? '0.00' : subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                <h4 className="text-sm font-semibold text-sky-800 mb-3 uppercase tracking-wider">Order Details</h4>
                <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="h-4 w-4 mr-3 text-sky-500" />
                        <span>Date: <span className="font-medium">{formData.orderDate}</span></span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                        {formData.orderType === 'Dilivery' ? (
                            <Truck className="h-4 w-4 mr-3 text-sky-500" />
                        ) : (
                            <MapPin className="h-4 w-4 mr-3 text-sky-500" />
                        )}
                        <span>Type: <span className="font-medium">{formData.orderType === 'Dilivery' ? 'Home Delivery' : 'Store Pickup'}</span></span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;