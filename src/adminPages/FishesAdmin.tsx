import { ImagePlus, Loader2 } from "lucide-react";
import { useState, useRef, type ChangeEvent } from "react";
import { createFish, updateFish } from "../services/Fish";
import FishCardGrid, { type FishCardGridHandle } from "./FishCardGrid";

interface Fish {
  _id: string;
  fishName: string;
  price: string;
  description: string;
  fishCategory: string;
  imageUrl: string;
}

function FishesAdmin() {
    const fishCardGridRef = useRef<FishCardGridHandle>(null);
    
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [fishName , setFishName] = useState("")
    const [editFishId, setEditFishId] = useState<string | null>(null);
    const [price , setPrice] = useState("")
    const [description , setDescription] = useState("")
    const [fishCategory , setFishCategoury] = useState("")
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const showAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleEditClick = (fish: Fish) => {
        setIsEditMode(true);
        setEditFishId(fish._id);  
        setFishName(fish.fishName);
        setPrice(fish.price);
        setDescription(fish.description);
        setFishCategoury(fish.fishCategory);
        setPreview(fish.imageUrl);
        setImage(null);
        setShowModal(true);
    };

    const handleAddNewClick = () => {
        setIsEditMode(false);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setFishName("");
        setPrice("");
        setDescription("");
        setFishCategoury("");
        setImage(null);
        setPreview("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
        setIsEditMode(false);
    };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append("fishName", fishName);
          formData.append("price", price);
          formData.append("description", description);
          formData.append("fishCategory", fishCategory);
        
          if (image) {
            formData.append("image", image); 
          } else if (isEditMode) {
            formData.append("imageUrl", preview); 
          }

          if (isEditMode && editFishId) {
            await updateFish(editFishId, formData);
            showAlert("success", "Fish updated successfully!");
          } else {
            await createFish(formData);
            showAlert("success", "Fish added successfully!");
          }
        
          showAlert("success", isEditMode ? "Fish updated successfully!" : "Fish added successfully!");
          resetForm();
          setShowModal(false);
          setIsEditMode(false);
          
          // Refresh the fish card grid
          fishCardGridRef.current?.refreshData();
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
    <div className="max-w-7xl mx-auto p-2 animate-in fade-in duration-700">
  
  {/* HEADER SECTION */}
  <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fish Inventory</h1>
      <p className="text-slate-500 font-medium mt-1">Manage your aquatic stock, categories, and market pricing.</p>
    </div>

    {/* ADD FISH BUTTON */}
    <button
      onClick={handleAddNewClick}
      className="group bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-sky-600 transition-all duration-300 shadow-2xl shadow-slate-200 active:scale-95"
    >
      <div className="bg-white/20 rounded-lg p-1 group-hover:rotate-90 transition-transform duration-500">
        <i className="bx bx-plus text-xl"></i>
      </div>
      <span>Add New Stock</span>
    </button>
  </div>

  {/* GRID SECTION */}
  <div className="relative">
    <FishCardGrid 
      ref={fishCardGridRef} 
      onEditClick={handleEditClick} 
      onDeleteSuccess={() => showAlert("success", "Stock item removed successfully!")}
    />
  </div>

  {/* PREMIUM MODAL OVERLAY */}
  {showModal && (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-100 p-4 animate-in fade-in duration-300">
      
      {/* ALERT NOTIFICATION (Floating inside modal) */}
      {alert && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md z-110 animate-in slide-in-from-top-4 duration-300">
          <div className={`p-4 rounded-2xl border shadow-2xl flex items-center justify-between ${
            alert.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
          }`}>
            <div className="flex items-center gap-3">
              <i className={`bx ${alert.type === "success" ? "bx-check-circle" : "bx-error-circle"} text-2xl`}></i>
              <span className="font-bold text-sm">{alert.message}</span>
            </div>
            <button onClick={() => setAlert(null)} className="hover:rotate-90 transition-transform">
               <i className="bx bx-x text-xl"></i>
            </button>
          </div>
        </div>
      )}

      {/* MODAL CONTENT CARD */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative max-h-[90vh] overflow-hidden flex flex-col border border-slate-100 animate-in zoom-in-95 duration-300">
        
        {/* MODAL HEADER */}
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEditMode ? "Update Fish Stock" : "Register New Fish"}
            </h2>
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Stock Entry System</p>
          </div>
          <button
            onClick={handleCloseModal}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:shadow-lg transition-all"
          >
            <i className="bx bx-x text-3xl"></i>
          </button>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fish Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fish Identification Name</label>
              <input
                type="text"
                value={fishName}
                onChange={(e) => setFishName(e.target.value)}
                placeholder="e.g. Blue Neon Tetra"
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none placeholder:text-slate-300"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Market Price (Rs.)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300">LKR</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border-none rounded-2xl pl-16 pr-5 py-4 text-slate-700 font-bold focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none placeholder:text-slate-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Species Category</label>
            <select
              value={fishCategory}
              onChange={(e) => setFishCategoury(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
              required
            >
              <option value="">Select a Category</option>
              <option value="Carps">Carps</option>
              <option value="Barbs">Barbs</option>
              <option value="Gouramies">Gouramies</option>
              <option value="Tetras">Tetras</option>
              <option value="Predatory">Predatory</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the fish temperament, size, and care level..."
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-slate-700 font-bold focus:ring-2 focus:ring-sky-500/20 focus:bg-white transition-all outline-none placeholder:text-slate-300 resize-none"
            ></textarea>
          </div>

          {/* IMAGE UPLOAD ZONE */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Visual Asset</label>
            <div className="flex flex-col items-center">
              <label className="group w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer hover:bg-sky-50 hover:border-sky-200 transition-all p-8 bg-slate-50/50">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <ImagePlus className="text-sky-500" size={28} />
                </div>
                <span className="text-slate-800 font-black tracking-tight">{image ? image.name : "Select High-Quality Image"}</span>
                <span className="text-xs text-slate-400 mt-1 font-medium">JPG, PNG or WEBP (Max 5MB)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              {preview && (
                <div className="mt-6 w-full relative">
                   <img
                    src={preview}
                    alt="preview"
                    className="w-full h-64 object-cover rounded-xl shadow-2xl border-4 border-white"
                  />
                  <div className="absolute top-4 right-4 bg-sky-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                    Preview Mode
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-sky-600 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <i className="bx bx-save text-2xl group-hover:animate-bounce"></i>
            )}
            <span>{loading ? "Syncing Data..." : (isEditMode ? "Confirm Update" : "Finalize Registration")}</span>
          </button>
        </form>
      </div>
    </div>
  )}
</div>

    
    
    
  )
}

export default FishesAdmin;
