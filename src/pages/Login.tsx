import{ useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import loginImage from "../assets/freepik__a-vibrant-osca-fish-swims-in-a-clear-tank-bubbles-__26356.png";
import bgImage from "../assets/top-view-colorful-koi-fishes.jpg";
import { getMyDetails, login } from "../services/auth";
import { useAuth } from "../context/authContext";
import { showErrorAlert, showSuccessAlert } from "../util/alerts";

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      showErrorAlert("Missing Fields, Please fill all required fields.");
      return
    }

    try {
      const res = await login(email, password)
      console.log(res.data.accessToken)

      if (!res.data.accessToken) {
        showErrorAlert("Invalid email or password.");
        return
      }

      await localStorage.setItem("accessToken", res.data.accessToken)
      await localStorage.setItem("refreshToken", res.data.refreshToken)

      const detail = await getMyDetails()

      const userData = ({
        ...detail.data,
        roles: detail.data.role    
      })

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(detail.data))

      showSuccessAlert(`Welcome Back Login Successful`);

      setTimeout(() => {
        if (userData.roles?.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err :any) {
      console.error(err)

      if (err.response?.status === 401 || err.response?.status === 400) {
       showErrorAlert("Invalid email or password.");
      } else {
       showErrorAlert("Error,Something went wrong. Try again.");
      }
    }
  }


  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat absolute inset-0 -z-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/50 text-white shadow-lg backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-sky-200 opacity-100">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <img
            src={loginImage}
            alt="AquaWorld Logo"
            className="w-26 h-26 mx-auto mb-2 rounded-full"
          />
          <h2 className="text-3xl font-bold">Aqua World</h2>
          <p className="text-sm mt-1">
            Welcome back to your aquarium world.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-white"
              required
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm">
              <input 
                type="checkbox" 
                className="mr-2 accent-sky-600" 
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 text-center">
          <span className="px-2 text-sm">or</span>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-sky-700 font-medium hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}