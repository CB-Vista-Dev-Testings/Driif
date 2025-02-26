import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useToast } from "../../components/common/AppToaster";

const testimonials = [
  {
    image: require("../../assets/images/login/login_bg_1.gif"),
    desc: "Dominate with AI-powered dynamic pricing. Real-time analytics optimise prices using competitor insights, demand shifts, and inventory—driving 15-20% revenue growth and 5-10% margin gains with precision.",
    logo: require("../../assets/images/login/wave_logo.svg").default,
    position: "Professional pricing, perfected",
  },
  {
    image: require("../../assets/images/login/login_bg_2.gif"),
    desc: "Covrr transforms auto insurance with telematics—real-time tracking and AI-powered video telematics—delivering personalized, usage-based policies that outshine traditional models. By analyzing driving behavior, Covrr enhances risk accuracy by up to 25% compared to conventional methods, while safe drivers can enjoy premium reductions of 15-30% annually. Drive Smart, Insure Smarter.",
    logo: require("../../assets/images/login/covrr_logo.svg").default,
    position: "Drive Smart, Insure Smarter.",
  },
  {
    image: require("../../assets/images/login/login_bg_3.gif"),
    desc: "Flex redefines fleet management with on-demand fuel delivery, eliminating theft, monitoring consumption, preventing fleet card misuse, and ending manual reconciliation. Fleet operators using Flex report up to 10% savings on fuel costs, a 20% reduction in fuel-related fraud, and a 30% decrease in administrative time spent on fuel tracking. Reliable, timely deliveries keep operations humming. On-Demand Fuel, Total Control",
    logo: require("../../assets/images/login/flex_logo.svg").default,
    position: "On-Demand Fuel, Total Control",
  },
  {
    image: require("../../assets/images/login/login_bg_4.gif"),
    desc: "Scale your fleet faster with Propel. Access tailored financing solutions for new vehicles, refinancing, and working capital. Reduce administrative burden by 25% and accelerate fleet growth by up to 15%.",
    logo: require("../../assets/images/login/propel_logo.svg").default,
    position: "Propel Drives Your Growth.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { showSuccess } = useToast();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (!animating) {
      setAnimating(true);
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!animating) {
      setAnimating(true);
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      // login(userData);
      showSuccess("You have successfully logged in.");
      navigate("/dashboard");
    },
  });

  return (
    <>
      <div className="flex min-h-full w-full bg-cardBackground">
        <div className="w-[60%] xl:w-[60%] mx-auto bg-none rounded-2xl shadow-lg overflow-hidden relative m-5 ms-5 h-[95vh] hidden lg:flex">
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-themeBlue opacity-75" />
                  <img src={testimonial.image} alt="Testimonial" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 p-6 text-white z-20 bg-[#00000029] border-t-[0.5px] border-[#FFFFFF4D] w-full h-auto backdrop-blur-sm">
            <img src={testimonials[current].logo} className="h-[50px] w-auto mb-4" />
            <p className="text-[18px] text-left">{testimonials[current].desc}</p>
            <div className="flex justify-between pt-4 items-center mt-4">
              <div>
                <p className="text-[18px] font-light">{testimonials[current].position}</p>
              </div>
              <div className="flex gap-x-10 justify-end">
                <button className="p-2 bg-transparent border border-white rounded-full text-white" onClick={handlePrev}>
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <button className="p-2 bg-transparent border border-white rounded-full text-white" onClick={handleNext}>
                  <ArrowRightIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[100%] lg:w-[30%] flex-col justify-center px-4 py-10 sm:px-6 lg:flex-1 lg:px-10 xl:px-10 bg-cardBackground">
          <div className="mx-auto w-full max-w-md lg:w-96">
            <div className="text-center">
              <img src={require("../../assets/images/logo.svg").default} alt="logo" className="w-24 mx-auto mb-6" />

              <p className="mt-2 text-[15px] text-text4">Welcome back! Please enter your details.</p>
            </div>
            <div className="mt-6">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username">
                    Mobile number <span className="required">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="username" name="username" type="text" placeholder="Enter here" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} required autoComplete="username" />
                    {formik.errors.username && formik.touched.username && (
                      <div className="error-text">
                        <ExclamationCircleIcon className="w-5 h-5" />
                        {formik.errors.username}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password">
                    Password<span className="required">*</span>
                  </label>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" placeholder="Enter here" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required autoComplete="current-password" />
                    {formik.errors.password && formik.touched.password && (
                      <div className="error-text">
                        <ExclamationCircleIcon className="w-5 h-5" />
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div>
                    <label htmlFor="remember" className="text-text2 text-[15px] flex items-center">
                      <input type="checkbox" id="remember" name="remember" className="me-2 w-4 h-4" />
                      Remember for 30 days
                    </label>
                  </div>
                  <p className="font-semibold text-primary text-[15px] text-center">Forgot password?</p>
                </div>
                <div>
                  <button type="submit" className="btn btn-xl btn-primary w-full mt-2">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
