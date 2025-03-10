import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { BtnSpinnerIcon } from "../../components/SvgIcons";
import { useToast } from "../../components/common/AppToaster";
import { changePassword } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";
import EyeIcon from "../../components/EyeIcon";
import Carousel from "../../components/Carousel";
import { store } from "../../store";
import { API_SUCCESS } from "../../constants/constants";

export default function ChangePassword() {
  const navigate = useNavigate();
  const state = store.getState();
  const { isDarkMode } = useTheme();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!state.auth.accessToken) {
      navigate("/login");
    }
  }, [state.auth.accessToken, navigate]);

  const handleChangePassword = async (values) => {
    setLoading(true);
    try {
      const response = await changePassword(values, showError);
      if (response.status === API_SUCCESS) {
        showSuccess("Password changed successfully. Please login with your new password.");
        navigate("/login");
      }
    } catch (error) {
      // Error handling is done in the changePassword function
    } finally {
      setLoading(false);
    }
  };

  const changePasswordFormik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required("Old password is required"),
      new_password: Yup.string().required("New password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      handleChangePassword(values);
    },
  });

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-full w-full bg-cardBackground">
      <Carousel />
      <div className="flex w-[100%] lg:w-[30%] flex-col justify-center px-4 py-10 sm:px-6 lg:flex-1 lg:px-10 xl:px-10 bg-cardBackground">
        <div className="mx-auto w-full max-w-md lg:w-96">
          <div className="text-start">
            <img src={isDarkMode ? require("../../assets/images/logo_dark.svg").default : require("../../assets/images/logo.svg").default} alt="logo" className="h-12 w-auto mx-auto mb-8" />
          </div>
          <div className="animate-slideInRight">
            <div className="text-start">
              <p className="title-text xl">Change Password</p>
              <p className="mt-2 text-sm text-text4">Update your existing password.</p>
            </div>
            <form onSubmit={changePasswordFormik.handleSubmit} className="space-y-6 mt-6">
              <div>
                <label htmlFor="old_password">
                  Old Password <span className="required">*</span>
                </label>
                <div className="mt-2 relative">
                  <input
                    id="old_password"
                    name="old_password"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter here"
                    value={changePasswordFormik.values.old_password}
                    onChange={changePasswordFormik.handleChange}
                    onBlur={changePasswordFormik.handleBlur}
                    required
                  />
                  {changePasswordFormik.values.old_password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleOldPasswordVisibility}>
                      <EyeIcon isVisible={showOldPassword} />
                    </div>
                  )}
                  {changePasswordFormik.errors.old_password && changePasswordFormik.touched.old_password && (
                    <div className="error-text">
                      <ExclamationCircleIcon className="w-5 h-5" />
                      {changePasswordFormik.errors.old_password}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="new_password">
                  New Password <span className="required">*</span>
                </label>
                <div className="mt-2 relative">
                  <input
                    id="new_password"
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter here"
                    value={changePasswordFormik.values.new_password}
                    onChange={changePasswordFormik.handleChange}
                    onBlur={changePasswordFormik.handleBlur}
                    required
                  />
                  {changePasswordFormik.values.new_password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleNewPasswordVisibility}>
                      <EyeIcon isVisible={showNewPassword} />
                    </div>
                  )}
                  {changePasswordFormik.errors.new_password && changePasswordFormik.touched.new_password && (
                    <div className="error-text">
                      <ExclamationCircleIcon className="w-5 h-5" />
                      {changePasswordFormik.errors.new_password}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="confirm_password">
                  Confirm Password <span className="required">*</span>
                </label>
                <div className="mt-2 relative">
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter here"
                    value={changePasswordFormik.values.confirm_password}
                    onChange={changePasswordFormik.handleChange}
                    onBlur={changePasswordFormik.handleBlur}
                    required
                  />
                  {changePasswordFormik.values.confirm_password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                      <EyeIcon isVisible={showConfirmPassword} />
                    </div>
                  )}
                  {changePasswordFormik.errors.confirm_password && changePasswordFormik.touched.confirm_password && (
                    <div className="error-text">
                      <ExclamationCircleIcon className="w-5 h-5" />
                      {changePasswordFormik.errors.confirm_password}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-xl btn-primary w-full mt-2" disabled={loading}>
                  {loading ? (
                    <>
                      <BtnSpinnerIcon />
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
              <p className="text-sm text-text3 text-center cursor-pointer" onClick={() => navigate("/login")}>
                Back to <span className="text-primary text-sm font-bold">Login</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
