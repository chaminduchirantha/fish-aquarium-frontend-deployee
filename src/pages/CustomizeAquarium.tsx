import { useState, type ChangeEvent } from "react";
import image1 from "../assets/beautiful-color-mandarin-fish-colorfull-mandarin-fish-mandarin-fish-closeup.jpg"
import image2 from "../assets/beautiful-group-fish-underwater.jpg"
import image3 from "../assets/top-view-colorful-koi-fishes.jpg"
import image4 from "../assets/closeup-shot-yellow-cichlidae-cichlid-home-aquarium.jpg"


import { ImagePlus, Loader2 } from "lucide-react";
import { createCustomizedAquarium } from "../services/customizedAquarium";

export default function CustomTankForm() {
  const [customername, setCustomerName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [meterial, setMeterial] = useState("");
  const [extrafeatures, setExtraFeatures] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [ setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("customername", customername);
      formData.append("phonenumber", phonenumber);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("length", length);
      formData.append("material", meterial);
      formData.append("extrafeatures", extrafeatures);
      formData.append("notes", notes);

      if (image) {
        formData.append("image", image);
      }

      await createCustomizedAquarium(formData);

      // Reset all fields
      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setWidth("");
      setHeight("");
      setLength("");
      setMeterial("");
      setExtraFeatures("");
      setNotes("");
      setImage(null);
      // setPreview("");
      showAlert("success", "Custom Tank Request Submitted Successfully!");
    } catch (error : any) {

      if (error.response?.status === 400) {
        showAlert("error", error.response.data.message);
      } else {
        showAlert("error", "Failed to submit. Try again!");
      }
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-16 px-4 md:px-8 mt-10">
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Inspiration & Info */}
        <div className="p-8 md:p-16 bg-slate-900 text-white flex flex-col justify-center">
          <header className="mb-10">
            <span className="text-sky-400 font-bold tracking-widest uppercase text-xs">Custom Creations</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 leading-tight">
              Design Your <span className="text-sky-400">Masterpiece</span>
            </h2>
          </header>

          {/* Modern Bento Grid for Images */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <img src={image1} className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500" alt="Tank 1" />
            <img src={image4} className="w-full h-48 object-cover rounded-2xl shadow-lg mt-8 hover:scale-[1.02] transition-transform duration-500" alt="Tank 2" />
            <img src={image3} className="w-full h-48 object-cover rounded-2xl shadow-lg -mt-8 hover:scale-[1.02] transition-transform duration-500" alt="Tank 3" />
            <img src={image2} className="w-full h-48 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500" alt="Tank 4" />
          </div>

          <div className="space-y-6 text-slate-400 leading-relaxed text-sm md:text-base">
            <p>
              Choose your ideal custom fish tank design from our stunning collection of colorful and vibrant aquatic themes. 
              Each is crafted to inspire creativity and a deeper connection with aquatic life.
            </p>
            <p>
              Whether you prefer a natural planted environment or a sleek modern aesthetic, our system allows you to 
              customize every detail—from dimensions and materials to advanced smart sensors and lighting.
            </p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="p-8 md:p-14 bg-white">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Request a Quotation</h3>
            <p className="text-slate-500 text-sm mt-1">Fill in the details below and our experts will contact you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition"
                  placeholder="John Doe"
                  value={customername}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Phone Number</label>
                <input
                  type="text"
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition"
                  placeholder="07X XXX XXXX"
                  value={phonenumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col col-span-3 md:col-span-1">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Width (ft)</label>
                <input type="number" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-400" placeholder="0.0" value={width} onChange={(e)=>setWidth(e.target.value)} />
              </div>
              <div className="flex flex-col col-span-3 md:col-span-1">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Height (ft)</label>
                <input type="number" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-400" placeholder="0.0" value={height} onChange={(e)=>setHeight(e.target.value)} />
              </div>
              <div className="flex flex-col col-span-3 md:col-span-1">
                <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Length (ft)</label>
                <input type="number" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-400" placeholder="0.0" value={length} onChange={(e)=>setLength(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Primary Material</label>
              <select
                className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-400 appearance-none"
                value={meterial}
                onChange={(e) => setMeterial(e.target.value)}
                required
              >
                <option value="">Select Material</option>
                <option value="Glass">Ultra-Clear Glass</option>
                <option value="Acrylic">Premium Acrylic</option>
                <option value="Smart Tank">Smart Tank (AI Integrated)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Inspiration / Notes</label>
              <textarea
                className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                placeholder="Tell us about your dream setup..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Improved Upload Area */}
            <div className="relative group">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer group-hover:border-sky-400 group-hover:bg-sky-50 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImagePlus className="text-slate-400 group-hover:text-sky-500 mb-2 transition-colors" size={24} />
                  <p className="text-xs text-slate-500 group-hover:text-sky-600 font-medium">
                    {image ? image.name : "Click to upload design reference"}
                  </p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all duration-300 shadow-xl shadow-slate-200 flex justify-center items-center gap-3 disabled:opacity-70 mt-4"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : null}
              {loading ? "Processing Request..." : "Submit Custom Design"}
            </button>

            {alert && (
              <div className={`mt-4 p-4 rounded-xl text-sm font-medium border ${alert.type === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                {alert.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
