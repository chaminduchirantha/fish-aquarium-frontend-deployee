import React, { useState } from "react";
import { CreditCard, Calendar, User, Lock, Phone, Mail, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../assets/pexels-shvetsa-4482900.jpg";
import { paymentSave } from "../services/payment";
import { useAuth } from "../context/authContext";

export default function PaymentPage() {
  const { state } = useLocation();
  useNavigate();

  // Get amount from navigation state or use default
  const orderAmount = state?.amount || 0;
  const formattedAmount = typeof orderAmount === 'string' ? parseFloat(orderAmount.replace(/[^0-9.]/g, '')) : orderAmount;

  // Individual state for each field
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { user } = useAuth();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setCardNumber(formatted);
      return;
    }

    // Format expiry date MM/YY
    if (name === "expireDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2").slice(0, 5);
      setExpireDate(formatted);
      return;
    }

    // Limit CVV to 4 digits
    if (name === "cvv") {
      if (value.length <= 4) {
        setCvv(value);
      }
      return;
    }

    if (name === "email") setEmail(value);
    if (name === "phonenumber") setPhonNumber(value);
    if (name === "cardHolderName") setCardHolderName(value);
  };

  const validateForm = (): boolean => {
    if (!email || !phonenumber || !cardHolderName || !cardNumber || !expireDate || !cvv) {
      setAlert({ type: "error", message: "Please fill all fields" });
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert({ type: "error", message: "Invalid email address" });
      return false;
    }

    // Validate card number (basic check)
    const cardNum = cardNumber.replace(/\s/g, "");
    if (cardNum.length < 13) {
      setAlert({ type: "error", message: "Invalid card number" });
      return false;
    }

    // Validate CVV
    if (cvv.length < 3) {
      setAlert({ type: "error", message: "Invalid CVV" });
      return false;
    }

    // Validate phone number (basic check)
    if (phonenumber.length < 10) {
      setAlert({ type: "error", message: "Invalid phone number" });
      return false;
    }

    return true;
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setAlert(null);

      const paymentData = {
        email,
        phonenumber,
        cardHolderName,
        cardNumber,
        expireDate,
        cvv,
        paymentDate: new Date().toISOString(),
        amount: formattedAmount.toString(),
      };

      await paymentSave(paymentData);
      
      setAlert({ type: "success", message: "Payment processed successfully!" });
      setPaymentSuccess(true);

      // Reset form and redirect after 2 seconds
      
        setEmail("");
        setPhonNumber("");
        setCardHolderName("");
        setCardNumber("");
        setExpireDate("");
        setCvv("");
        // navigate('/fish');
      

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Payment failed. Please try again.";
      setAlert({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen from-green-50 to-blue-50 flex items-center justify-center p-4 mt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500" size={64} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">Your payment has been processed successfully</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Transaction Date</p>
            <p className="text-lg font-bold text-sky-600">{new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-sm text-gray-600">Amount Paid</p>
            <p className="text-2xl font-bold text-sky-700">Rs. {formattedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>

          <button 
              onClick={() => window.open(`http://localhost:5000/api/v1/payment/payment-slip/${user.email}`, "_blank")}
              className="bg-sky-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-sky-700"
            >
              Download Payment Slip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 mt-12">

      {/* TOP TITLE + DESCRIPTION */}
      <h1 className="text-5xl font-bold text-sky-800 text-center mt-4">
        Process your Payment
      </h1>

      <p className="text-gray-600 text-center mt-4 max-w-3xl">
        Discover our smart aquarium solutions, from intelligent fish care systems
        to automated tank management tools that make your aquarium experience
        easier and more enjoyable.
      </p>

      {/* Alert Message */}
      {alert && (
        <div className={`max-w-5xl w-full mt-6 p-4 rounded-lg flex items-center gap-3 ${
          alert.type === "success" 
            ? "bg-green-100 text-green-800 border border-green-300" 
            : "bg-red-100 text-red-800 border border-red-300"
        }`}>
          {alert.type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <span>{alert.message}</span>
        </div>
      )}

      {/* PAYMENT CARD */}
      <div className="bg-white shadow-2xl rounded-2xl max-w-6xl w-full mt-10 grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block">
          <img
            src={image}
            alt="Payment"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 md:p-10">

          {/* Card Logos */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              className="h-8"
              alt="Visa"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              className="h-8"
              alt="Mastercard"
            /> 
          </div>

          {/* FORM */}
          <form className="space-y-6" onSubmit={handlePaymentSubmit}>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 focus-within:border-blue-500">
                <Mail className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 focus-within:border-blue-500">
                <Phone className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="phonenumber"
                  placeholder="Enter your phone number"
                  value={phonenumber}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block font-medium mb-1">Cardholder Name</label>
              <div className="flex items-center border rounded-xl p-3 bg-gray-50 focus-within:border-blue-500">
                <User className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="Enter Cardholder Name"
                  value={cardHolderName}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Card Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="w-5 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className="w-full pl-12 pr-20 py-4 border border-black rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 bg-white/50 hover:bg-white font-mono text-lg tracking-wider font-semibold"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-1.5">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    className="h-4 opacity-50 hover:opacity-100 transition-opacity"
                    alt="Visa"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    className="h-5 opacity-50 hover:opacity-100 transition-opacity"
                    alt="Mastercard"
                  />
                </div>
              </div>
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Expiry Date</label>
                <div className="flex items-center border rounded-xl p-3 bg-gray-50 focus-within:border-blue-500">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="expireDate"
                    placeholder="MM/YY"
                    value={expireDate}
                    onChange={handleChange}
                    maxLength={5}
                    className="w-full bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">CVV</label>
                <div className="flex items-center border rounded-xl p-3 bg-gray-50 focus-within:border-blue-500">
                  <Lock className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={handleChange}
                    maxLength={4}
                    className="w-full bg-transparent outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl mt-3 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Pay Now Rs. {formattedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </>
              )}
            </button>

          </form>

          {/* Amount Display */}
          {formattedAmount > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Payment Amount</p>
              <p className="text-2xl font-bold text-sky-700">Rs. {formattedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
          )}

          {/* Security Info */}
           {/* Premium Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-6">Trusted by thousands of customers worldwide</p>
          <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14  from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-7 h-7 text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-gray-600">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14  from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle className="w-7 h-7 text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-gray-600">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-14 h-14  from-purple-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Lock className="w-7 h-7 text-purple-600" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-gray-600">Encrypted</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
