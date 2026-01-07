// import React from "react";
// import { assets } from "../../assets/assets";

// const Hero = () => {
//   return (
//     <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">

//       <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
//         Discover courses that turn passion into progress 
//         <span className="text-blue-600"> — start today.</span>
//         <img
//           src={assets.sketch}
//           alt="sketch"
//           className="md:block hidden absolute -bottom-7 right-0"
//         />
//       </h1>

//       {/* Desktop Paragraph */}
//       <p className=" md:block hidden text-gray-500 max-w-2xl mx-auto">
//         Join a global network of learners and mentors sharing knowledge, creativity, 
//         and growth. Together, we make education accessible, engaging, and inspiring 
//         for everyone.
//       </p>

//       {/* Mobile Paragraph */}
//       <p className="md:hidden text-gray-500 max-w-sm mx-auto">
//         Our experienced instructors are committed to helping you grow, achieve excellence, 
//         and stand out in your professional field.
//       </p>

//     </div>
//   );
// };

// export default Hero;


import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full pt-20 md:pt-36 px-6 md:px-0 space-y-8 text-center bg-gradient-to-b from-cyan-100/70 to-white overflow-hidden">

      {/* Decorative sketch image */}
      <img
        src={assets.sketch}
        alt="sketch"
        className="absolute md:block hidden -bottom-10 right-10 w-24 opacity-30 animate-pulse"
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 max-w-3xl mx-auto leading-tight">
        Discover courses that turn <span className="text-blue-600">passion into progress</span>
        <span className="block md:inline"> — start today.</span>
      </h1>

      {/* Desktop Paragraph */}
      <p className="hidden md:block text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        Join a global network of learners and mentors sharing knowledge, creativity, 
        and growth. Together, we make education accessible, engaging, and inspiring 
        for everyone.
      </p>

      {/* Mobile Paragraph */}
      <p className="md:hidden text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
        Our experienced instructors are committed to helping you grow, achieve excellence, 
        and stand out in your professional field.
      </p>

      <SearchBar/>

    </div>
  );
};

export default Hero;




