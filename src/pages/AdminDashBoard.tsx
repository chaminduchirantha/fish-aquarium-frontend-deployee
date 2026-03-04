import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import fish from "../assets/icons8-fish-50.png";
import delivery from "../assets/icons8-delivery-50.png";
import { getAllFish } from "../services/Fish";
import { getAllUser } from "../services/user";
import { getAllFishOrder } from "../services/fishOrder";
import { getAllAccessoriesOrder } from "../services/accessoriesOrders";
import { getAllAccessories } from "../services/accessories";

interface UserType {
  name: string;
  role: string;
}

interface Stats {
  label: string;
  count: string;
  icon: string;
  color: string;
  trend: string;
}

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  // Dashboard Overview eka pennanna ona route eka check kirima
  const isDashboardHome = location.pathname === "/admin" || location.pathname === "/admin/";

  const user: UserType = {
    name: "Chamindu Chirantha",
    role: "ADMIN",
  };

  const username = user?.name || "User";
  const firstLetter = username.charAt(0).toUpperCase();

  const [asideOpen, setAsideOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const [stats, setStats] = useState<Stats[]>([
    { label: "Total Fishes", count: "...", icon: "bx-water", color: "from-blue-500 to-blue-600", trend: "+12%" },
    { label: "Total Orders", count: "...", icon: "bx-package", color: "from-orange-400 to-orange-600", trend: "+5%" },
    { label: "Total Customers", count: "...", icon: "bx-user", color: "from-emerald-400 to-emerald-600", trend: "+18%" },
    { label: "Accessories", count: "...", icon: "bx-heart", color: "from-purple-500 to-purple-700", trend: "+2%" },
  ]);

  // Dropdown eken eliya click kalama wahanna
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const extractTotal = (response: any): number => {
    if (!response) return 0;
    return (
      response.totalElements ?? response.total ?? response.totalItems ??
      response.count ?? response?.data?.length ?? response?.content?.length ??
      (Array.isArray(response) ? response.length : 0)
    );
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [fData, uData, foData, aData, aoData] = await Promise.all([
          getAllFish(1, 100), 
          getAllUser(1, 100), 
          getAllFishOrder(1, 100),
          getAllAccessories(1, 100), 
          getAllAccessoriesOrder(1, 100),
        ]);

        const fCount = extractTotal(fData);
        const uCount = extractTotal(uData);
        const totalO = extractTotal(foData) + extractTotal(aoData);
        const aCount = extractTotal(aData);

        setStats([
          { label: "Total Fishes", count: fCount.toLocaleString(), icon: "bx-water", color: "from-blue-500 to-blue-600", trend: "+12%" },
          { label: "Total Orders", count: totalO.toLocaleString(), icon: "bx-package", color: "from-orange-400 to-orange-600", trend: "+5%" },
          { label: "Total Customers", count: uCount.toLocaleString(), icon: "bx-user", color: "from-emerald-400 to-emerald-600", trend: "+18%" },
          { label: "Accessories", count: aCount.toLocaleString(), icon: "bx-heart", color: "from-purple-500 to-purple-700", trend: "+2%" },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    if (isDashboardHome) fetchCounts();
  }, [isDashboardHome]);

  return (
    <main className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      
      {/* HEADER SECTION */}
      <header className="flex w-full items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <button
            className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300"
            onClick={() => setAsideOpen(!asideOpen)}
          >
            <i className={`bx ${asideOpen ? "bx-menu-alt-left" : "bx-menu"} text-2xl text-slate-600`}></i>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-200">
               <i className="bx bx-waves text-white text-xl"></i>
            </div>
            <span className="text-xl font-black tracking-tight bg-linear-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent uppercase">
              Aqua World
            </span>
          </div>
        </div>

        <div className="relative flex items-center space-x-4" ref={profileRef}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">{username}</p>
            <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mt-1">{user.role}</p>
          </div>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="group relative h-11 w-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-xl transition-all hover:rotate-3"
          >
            {firstLetter}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-60 rounded-2xl border border-slate-100 bg-white shadow-2xl z-50 py-3 animate-in fade-in zoom-in duration-200">
              <div className="p-2">
                <Link to="/login" className="flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium">
                  <i className="bx bx-log-out-circle text-xl"></i>
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR SECTION */}
        <aside
          className="w-80 px-4 overflow-hidden transition-all duration-500 flex flex-col border-r border-slate-200 bg-white">
          <nav className="flex-1 overflow-y-auto py-8 space-y-2">
            
            <p className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Main Menu</p>
            <SidebarLink to="/admin" icon={<i className="bx bxs-dashboard text-xl"></i>} label="Dashboard Overview" />

            <div className="my-4 border-t border-slate-50 mx-4"></div>

            <p className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Inventory</p>
            <SidebarLink to="/admin/fishes" icon={<img className="w-5 grayscale group-hover:grayscale-0 transition-all" src={fish} />} label="Fishes" />
            <SidebarLink to="/admin/accessories" icon={<i className="bx bx-grid-alt text-xl"></i>} label="Accessories" />
            
            <p className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-[2px] mt-8 mb-4">Operations</p>
            <SidebarLink to="/admin/customers" icon={<i className="bx bx-user-circle text-xl"></i>} label="Customer Base" />
            <SidebarLink to="/admin/orders" icon={<i className="bx bx-shopping-bag text-xl"></i>} label="Fish Orders" />
            <SidebarLink to="/admin/ordersAccess" icon={<i className="bx bx-package text-xl"></i>} label="Accessory Orders" />
            <SidebarLink to="/admin/delivery" icon={<img className="w-5 opacity-70 group-hover:opacity-100 transition-all" src={delivery} />} label="Logistics" />
          </nav>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {isDashboardHome ? (
            <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
              <header>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Insights</h1>
                <p className="text-slate-500 mt-1 font-medium">Monitoring live updates from your aquarium business.</p>
              </header>

              {/* DYNAMIC STATS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                  <div key={i} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col space-y-4">
                      <div className={`w-14 h-14 bg-linear-to-br ${s.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <i className={`bx ${s.icon} text-2xl`}></i>
                      </div>
                      <div>
                        <div className="flex items-center justify-between w-full">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                          <span className="text-emerald-500 text-[10px] font-bold bg-emerald-50 px-2 py-1 rounded-lg">{s.trend}</span>
                        </div>
                        <h3 className="text-3xl font-black mt-1 text-slate-800">
                          {s.count === "..." ? (
                            <span className="flex space-x-1">
                              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </span>
                          ) : s.count}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PREMIUM ANALYTICS VISUALS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Stock Performance</h4>
                        <div className="flex space-x-2">
                           <span className="w-3 h-3 bg-sky-500 rounded-full"></span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase">Live Data</span>
                        </div>
                    </div>
                    <div className="h-64 flex items-end justify-between space-x-3">
                        {[50, 80, 65, 95, 75, 90, 60].map((h, i) => (
                            <div key={i} className="relative group w-full">
                                <div style={{height: `${h}%`}} className="bg-slate-50 rounded-2xl w-full group-hover:bg-sky-500 transition-all duration-500 cursor-pointer"></div>
                            </div>
                        ))}
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl flex flex-col justify-between">
                    <div>
                        <i className="bx bx-shield-quarter text-sky-400 text-4xl"></i>
                        <p className="text-2xl font-black mt-4 leading-tight">Secure Admin Terminal</p>
                        <p className="text-slate-400 text-xs mt-2">All data is synced with the production database.</p>
                    </div>
                    <button className="w-full py-4 bg-sky-600 hover:bg-sky-500 rounded-2xl font-bold transition-colors text-sm">
                        Generate Report
                    </button>
                  </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </main>
  );
};

// HELPER COMPONENT FOR SIDEBAR LINKS
const SidebarLink = ({ to, icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`group flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-slate-900 text-white shadow-xl scale-[1.02]"
          : "text-slate-500 hover:bg-slate-50 hover:text-sky-600"
      }`}
    >
      <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-sky-600"} transition-colors`}>
        {icon}
      </span>
      <span className="text-sm font-bold tracking-tight">{label}</span>
      {isActive && <i className="bx bx-chevron-right ml-auto text-xl animate-pulse"></i>}
    </Link>
  );
};

export default DashboardLayout;