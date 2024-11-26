"use client";
import { loginAdmin } from "@/api/api";
import useSnackbar from "@/hooks/useSnackbar";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoaderFullScreen from "../common/Loader/LoaderFullScreen";
import useAuth from "@/app/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({ username: "", password: "" });

    const newErrors = { username: "", password: "" };
    if (!formData.username || formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }
    if (!formData.password || formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoader(true);
      const response: any = await loginAdmin(
        formData.username,
        formData.password,
      );
      setUser(response.user);
      setCookie("token", response.token, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
      setCookie("userId", response.user._id, { maxAge: 60 * 60 * 24 * 30 });
      setCookie("UserName", response.user.name, { maxAge: 60 * 60 * 24 * 30 });
      router.push("/dashboard");
      showSnackbar("Login successful", "success");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials, please try again.";
      setErrors((prev) => ({
        ...prev,
        password: errorMessage,
      }));
      showSnackbar(errorMessage, "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="bg-opacity-00 relative flex h-screen items-center justify-center bg-black">
      <div className="absolute inset-0">
        <Image
          src={require("../../../public/images/logo/Image.png")}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
      <div className="relative z-10 mx-4 w-full max-w-lg rounded-lg bg-white bg-opacity-30 p-8 shadow-lg backdrop-blur-md sm:mx-auto">
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter the username..."
                autoComplete="username"
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.username && (
                <p className="py-1 text-sm font-bold text-red-500">
                  {errors.username}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-50 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter the password..."
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="py-1 text-sm font-bold text-red-500">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {loader && <LoaderFullScreen />}
    </div>
  );
}
