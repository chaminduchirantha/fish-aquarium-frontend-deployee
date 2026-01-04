import React, { useState, useEffect } from 'react';
import { ChevronDown,ChevronLeft,ShoppingBag,Truck,Calendar,CreditCard,MapPin} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { accessoriesOrderSave } from '../services/accessoriesOrders';

const CheckoutPage: React.FC = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = state || {
    itemname: "Unknown Fish",
    price: "0",
    qty: 1,
    image: ""
  };

  // Parse price helper
  const parsePrice = (price: any): number => {
    try {
      if (typeof price === 'number') return isNaN(price) ? 0 : price;
      if (typeof price === 'string') {
        const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(cleanPrice) ? 0 : cleanPrice;
      }
      return 0;
    } catch { return 0; }
  };

  const validPrice = parsePrice(product.price);
  const validQty = parseInt(String(product.qty)) || 1;

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    address: '',
    qty: '',
    description:'',
    orderType: 'Dilivery', 
    paymentMethod: 'card',
    orderDate: new Date().toISOString().split('T')[0],
    amount: 0
  });

  const currentQty = formData.qty ? parseInt(formData.qty) : validQty;
  const subtotal = validPrice > 0 ? validPrice * currentQty : 0;

  useEffect(() => {
    setFormData(prev => ({ ...prev, amount: subtotal }));
  }, [subtotal]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const aaccessoriesOrderData = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        paymentmethod: formData.paymentMethod,
        amount: subtotal.toString(),
        orderType: formData.orderType,
        orderDate: formData.orderDate,
        itemname: product.itemname,
        description : product.description,
        price: validPrice.toString(),
        qty: currentQty,
        status: "pending",
      };

      await accessoriesOrderSave(aaccessoriesOrderData);
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
    <div className="min-h-screen bg-white text-gray-800 flex flex-col lg:flex-row mt-10 font-sans">
      
      {/* LEFT SIDE - Form Section */}
      <div className="w-full lg:w-[58%] px-4 py-8 lg:px-16 lg:py-12 order-2 lg:order-1">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-10 text-sky-900 tracking-tight">Aqua World Checkout</h1>
          
          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                Contact Information
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Shipping Details</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none bg-gray-50 focus:bg-white transition"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none bg-gray-50 focus:bg-white transition"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-sky-500 outline-none bg-gray-50 focus:bg-white transition"
              value={formData.address}
              onChange={handleInputChange}
            />

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="number"
                name="qty"
                placeholder="Quantity"
                className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-sky-500 outline-none bg-gray-50 focus:bg-white transition"
                value={formData.qty}
                onChange={handleInputChange}
              />
              <div className="w-full md:w-1/2 relative">
                 <select 
                   name="orderType"
                   className="w-full border border-gray-300 rounded-lg p-3 appearance-none bg-gray-50 focus:bg-white text-gray-700 focus:ring-2 focus:ring-sky-500 outline-none transition cursor-pointer"
                   value={formData.orderType}
                   onChange={handleInputChange}
                 >
                    <option value="Dilivery">Cash on Delivery</option>
                    <option value="Take Away">Take Away</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

           {/* Payment Method */}
           <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Payment Method</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <label className={`flex items-center p-4 border-b border-gray-200 cursor-pointer transition ${formData.paymentMethod === 'card' ? 'bg-sky-50' : 'bg-white hover:bg-gray-50'}`}>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-3 h-5 w-5 text-sky-600 focus:ring-sky-500"
                    />
                    <label htmlFor="card Payment" className="font-medium flex-1 cursor-pointer">Credit / Debit Card</label>
                    <CreditCard className="text-gray-400 h-5 w-5" />
                </label>
                <label className={`flex items-center p-4 cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'bg-sky-50' : 'bg-white hover:bg-gray-50'}`}>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-3 h-5 w-5 text-sky-600 focus:ring-sky-500 disabled:opacity-50"
                        disabled={formData.orderType === 'Take Away'}
                    />
                     <label htmlFor="Cash On Delivery" className="font-medium flex-1 cursor-pointer">Cash on Delivery</label>
                    <Truck className="text-gray-400 h-5 w-5" />
                </label>
            </div>
           </div>

           {/* Actions */}
           <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
               <button 
                 className="text-gray-600 hover:text-sky-700 flex items-center text-sm font-medium transition"
                 onClick={() => navigate(-1)}
               >
                   <ChevronLeft className="h-4 w-4 mr-1" /> Return to Shop
               </button>
               <button 
                 onClick={handleOrderSubmit}
                 disabled={loading}
                 className="w-full md:w-auto bg-sky-600 cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-sky-700 font-semibold shadow-lg shadow-sky-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {loading ? 'Processing...' : `Order Rs. ${subtotal.toFixed(2)}`}
               </button>
           </div>

           {/* Alert */}
           {alert && (
             <div className={`mt-6 p-4 rounded-lg flex items-center ${alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
               {alert.message}
             </div>
           )}
        </div>
      </div>

      {/* RIGHT SIDE - Order Summary (IMPROVED) */}
      <div className="w-full lg:w-[42%] bg-gray-50 border-l border-gray-200 px-4 py-8 lg:px-12 lg:py-12 order-1 lg:order-2">
        <div className=" lg:top-8 max-w-md mx-auto lg:mx-0">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingBag className="text-sky-600" /> Order Summary
            </h2>

            {/* Product Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 transition hover:shadow-md">
                <div className="flex gap-4">
                    <div className="relative shrink-0">
                        <div className="w-50 h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img 
                                src={product.image} 
                                alt={product.itemname} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full shadow border-2 border-white">
                            {currentQty}
                        </span>
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{product.itemname}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-sm text-gray-400">Qty: {currentQty}</p>
                            <p className="font-bold text-lg text-gray-900">Rs. {isNaN(validPrice) ? '0' : validPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculations */}
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

            {/* Order Details Mini-Summary */}
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