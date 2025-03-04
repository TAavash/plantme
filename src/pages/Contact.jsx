"use client";
import Magma from "@/components/Magma";
import React from "react";

const Contact = () => {
  return (
    <div className="w-screen h-screen bg-[#ff0000] flex flex-col relative p-2 overflow-auto">
      <Magma />

      <div className="z-10 flex justify-center items-start py-10 mt-5">
        <div
          className="relative p-8 rounded-xl bg-black/80 border-4 border-red-500 
          shadow-[0_0_30px_rgba(255,69,0,0.6)] max-w-2xl w-full"
        >
          <h2 className="my-6 text-center text-3xl text-white">Get in Touch</h2>
          <p className="my-6 text-center text-lg text-white/80">
            Please contact me directly at{" "}
            <span
              className="bg-gradient-to-r from-green-500 via-green-600 to-[#FAD5A5] 
                bg-clip-text tracking-tight text-transparent animate-gradient"
            >
              aavashlopchan@gmail.com
            </span>{" "}
            or through this form.
          </p>
          <form className="flex flex-col items-center gap-4">
            <label className="w-full">
              <span className="text-white font-medium mb-2">Your Name</span>
              <input
                type="text"
                name="name"
                placeholder="What's your name?"
                className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-600
              text-black rounded-lg outline-none border-none font-medium hover:shadow-lg"
              />
            </label>
            <label className="w-full">
              <span className="text-white font-medium mb-2">Your Email</span>
              <input
                type="email"
                name="email"
                placeholder="What's your email?"
                className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-600 
              text-black rounded-lg outline-none border-none font-medium hover:shadow-lg"
              />
            </label>
            <label className="w-full">
              <span className="text-white font-medium mb-2">Your Message</span>
              <textarea
                rows="5"
                name="message"
                placeholder="What do you want to say?"
                className="w-full bg-gray-100 py-3 px-4 placeholder:text-gray-600
              text-black rounded-lg outline-none border-none font-medium hover:shadow-lg"
              />
            </label>

            <button
              type="submit"
              className="bg-red-500 py-2 px-6 outline-none w-fit text-white 
            font-bold shadow-md rounded-xl hover:bg-red-600 hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>

          <div className="text-center tracking-tighter mt-6">
            <p className="my-2 text-white">Nepal</p>
            <p className="my-2 text-white">977-9876543210</p>
            <a
              href="mailto:aavashlopchan@gmail.com"
              className="border-b text-white hover:text-gray-300 hover:underline"
            >
              aavashlopchan@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
