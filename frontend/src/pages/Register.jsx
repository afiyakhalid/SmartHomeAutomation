import { useState } from "react";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("User created successfully");
      nav("/login");

    } catch (err) {
      console.log(err.response?.data);
      alert("Register failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-12">

      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* Header */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <UserPlus size={24} />
            </div>

            <h1 className="text-3xl font-semibold tracking-[-1px]">
              Create account
            </h1>

            <p className="mt-2 text-sm text-[#86868b]">
              Create an account to access your smart-home control center.
            </p>

          </div>


          {/* Card */}

          <div className="rounded-3xl border border-[#e5e5e7] bg-white p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* Username */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-[#86868b]">
                  USERNAME
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
                  />

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#d2d2d7] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
                  />

                </div>

              </div>


              {/* Email */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-[#86868b]">
                  EMAIL
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#d2d2d7] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
                  />

                </div>

              </div>


              {/* Password */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-[#86868b]">
                  PASSWORD
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#86868b]"
                  />

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-[#d2d2d7] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
                  />

                </div>

              </div>


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-2xl bg-[#0071e3] py-3.5 text-sm font-semibold text-white transition hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

            </form>


            {/* Login */}

            <div className="mt-6 border-t border-[#e5e5e7] pt-6 text-center">

              <p className="text-sm text-[#86868b]">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => nav("/login")}
                className="mt-2 text-sm font-semibold text-[#0071e3] hover:underline"
              >
                Sign in
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}