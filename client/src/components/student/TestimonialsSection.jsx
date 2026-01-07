import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-8 md:px-40">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>

      <p className="md:text-base text-gray-500 mt-3">
        Discover real stories from learners who have grown their skills, advanced their goals, and
        <br />
        transformed their futures with the help of our platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:my-16 my-10">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-300/40 rounded-lg bg-white shadow-md overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-700/80 text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="h-5"
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-5 leading-relaxed">{testimonial.feedback}</p>
            </div>
            <a
              href="#"
              className="text-blue-500 underline px-5 pb-5 mt-auto hover:text-blue-600 transition-colors"
            >
              Read more
            </a> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
