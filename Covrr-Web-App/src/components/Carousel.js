import React, { useState, useEffect, useRef } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    image: require("../assets/images/login/login_bg_1.gif"),
    desc: "Dominate with AI-powered dynamic pricing. Real-time analytics optimise prices using competitor insights, demand shifts, and inventory—driving 15-20% revenue growth and 5-10% margin gains with precision.",
    logo: require("../assets/images/login/wave_logo.svg").default,
    position: "Professional pricing, perfected",
  },
  {
    image: require("../assets/images/login/login_bg_2.gif"),
    desc: "Covrr transforms auto insurance with telematics—real-time tracking and AI-powered video telematics—delivering personalized, usage-based policies that outshine traditional models. By analyzing driving behavior, Covrr enhances risk accuracy by up to 25% compared to conventional methods, while safe drivers can enjoy premium reductions of 15-30% annually. Drive Smart, Insure Smarter.",
    logo: require("../assets/images/login/covrr_logo.svg").default,
    position: "Drive Smart, Insure Smarter.",
  },
  {
    image: require("../assets/images/login/login_bg_3.gif"),
    desc: "Flex redefines fleet management with on-demand fuel delivery, eliminating theft, monitoring consumption, preventing fleet card misuse, and ending manual reconciliation. Fleet operators using Flex report up to 10% savings on fuel costs, a 20% reduction in fuel-related fraud, and a 30% decrease in administrative time spent on fuel tracking. Reliable, timely deliveries keep operations humming. On-Demand Fuel, Total Control",
    logo: require("../assets/images/login/flex_logo.svg").default,
    position: "On-Demand Fuel, Total Control",
  },
  {
    image: require("../assets/images/login/login_bg_4.gif"),
    desc: "Scale your fleet faster with Propel. Access tailored financing solutions for new vehicles, refinancing, and working capital. Reduce administrative burden by 25% and accelerate fleet growth by up to 15%.",
    logo: require("../assets/images/login/propel_logo.svg").default,
    position: "Propel Drives Your Growth.",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);

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

  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(handleNext, 2000);
  };

  return (
    <div className="w-[60%] xl:w-[60%] mx-auto bg-none rounded-2xl shadow-lg overflow-hidden relative m-5 ms-5 h-[95vh] hidden lg:flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        <p className="text-lg text-left">{testimonials[current].desc}</p>
        <div className="flex justify-between pt-4 items-center mt-4">
          <div>
            <p className="text-md font-light">{testimonials[current].position}</p>
          </div>
          <div className="flex gap-x-10 justify-end">
            <button className="p-2 bg-transparent border border-white rounded-full text-white" onClick={!animating ? handlePrev : undefined}>
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <button className="p-2 bg-transparent border border-white rounded-full text-white" onClick={!animating ? handleNext : undefined}>
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
