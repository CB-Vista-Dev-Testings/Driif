import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useToast } from "../../components/common/AppToaster";
import { useTheme } from "../../context/ThemeContext";
import { login } from "../../services/authService";
import { BtnSpinnerIcon } from "../../components/SvgIcons";
import { useDispatch } from "react-redux";
import Carousel from "../../components/Carousel";
import { store } from "../../store";
import { API_SUCCESS } from "../../constants/constants";

const EyeIcon = ({ isVisible, onClick }) => (
  <svg
    onClick={onClick}
    className="shrink-0 text-text2 size-3.5 h-5 w-5 cursor-pointer"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {isVisible ? (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </>
    )}
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { showSuccess, showError } = useToast();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await login(values, showError);
      //fleet.driif.ai/driif/regions/regions?company_id=1001nse.data);
      if (response.status === API_SUCCESS) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: response.data.user,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            roles: response.data.roles,
            must_change_password: response.data.must_change_password,
          },
        });
        if (response.data.must_change_password) {
          navigate("/change-password");
        } else {
          showSuccess("You have successfully logged in.");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      // Error handling is done in the login function
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone_number: "9988776655",
      password: "olectra",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex min-h-full w-full bg-cardBackground">
        <Carousel />
        <div className="flex w-[100%] lg:w-[30%] flex-col justify-center px-4 py-10 sm:px-6 lg:flex-1 lg:px-10 xl:px-10 bg-cardBackground">
          <div className="mx-auto w-full max-w-md lg:w-96">
            <div className="text-start">
              <img src={isDarkMode ? require("../../assets/images/logo_dark.svg").default : require("../../assets/images/logo.svg").default} alt="logo" className="h-12 w-auto mx-auto mb-8" />
            </div>
            <div className="mt-6 animate-slideInRight">
              <div className="text-start">
                <p className="title-text xl">Login</p>
                <p className="mt-2 text-sm text-text4">Welcome back! Please enter your details.</p>
              </div>
              <div className="mt-6">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="phone_number">
                      Mobile number <span className="required">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone_number"
                        name="phone_number"
                        type="text"
                        placeholder="Enter here"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        maxLength="10"
                        autoComplete="phone_number"
                      />
                      {formik.errors.phone_number && formik.touched.phone_number && (
                        <div className="error-text">
                          <ExclamationCircleIcon className="w-5 h-5" />
                          {formik.errors.phone_number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password">
                      Password<span className="required">*</span>
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter here"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        autoComplete="current-password"
                      />
                      {formik.values.password && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                          <EyeIcon isVisible={showPassword} />
                        </div>
                      )}
                      {formik.errors.password && formik.touched.password && (
                        <div className="error-text">
                          <ExclamationCircleIcon className="w-5 h-5" />
                          {formik.errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="hidden">
                      <label htmlFor="remember" className="text-text2 text-sm flex items-center ">
                        <input type="checkbox" id="remember" name="remember" className="me-2 w-4 h-4" />
                        Remember for 30 days
                      </label>
                    </div>
                    <p className="hidden font-semibold text-primary text-sm text-center cursor-pointer">Reset password?</p>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-xl btn-primary w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <BtnSpinnerIcon />
                          <span className="ml-2">Loading...</span>
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
