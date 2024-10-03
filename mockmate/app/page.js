"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import './globals.css'

const Home = () => {
  const router = useRouter();

  const moveToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg-image.jpg')" }} // Adding background image
    >
      {/* Main Heading */}
      <h1 className="font-extrabold text-4xl md:text-5xl text-white bg-opacity-75 rounded-lg border-blue-800 font-mono mt-10 w-[90%] md:w-[80%] text-center py-6 shadow-xl"
     style={{ background: 'linear-gradient(90deg, #111747, #368fd8)' }}
>
        AI-Powered Mock Interview Practice
      </h1>

      {/* Card Section */}
      <div className="mt-10 md:mt-20 py-6 md:py-10 flex flex-col md:flex-row justify-between w-10/12 gap-6 md:gap-8">
        {/* Start Mock Interview Card */}
        <div className="flex flex-col items-center bg-white h-auto w-full md:w-[48%] rounded-lg border hover:shadow-2xl p-6"
         style={{
          background: "linear-gradient(90deg, #004aad, #cb6ce6)",
           // Gradient Background for Heading
        }}>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Start Your Interview</h2>
          <p className="text-gray-700 text-center px-4">
            Prepare to tackle personalized, interview-style scenarios designed
            just for you! Hone your skills with real-time, AI-powered feedback,
            detailed performance insights, and expert tips to boost your
            confidence and readiness.
          </p>
          <Button
            className="mt-10 md:mt-16 bg-gradient-to-r from-[#004aad] to-[#cb6ce6] text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#cb6ce6] active:scale-95" 
            onClick={moveToDashboard}
          >
            Proceed to Dashboard
          </Button>
        </div>

        {/* Project Description Card */}
        <div className="flex flex-col items-center bg-white h-auto w-full md:w-[48%] rounded-lg border hover:shadow-2xl p-6"
         style={{
          background: "linear-gradient(90deg, #cb6ce6, #004aad)",
           // Gradient Background for Heading
        }}>
          <h2 className="text-xl md:text-2xl font-bold mb-4">About the Project</h2>
          <p className="text-gray-700 text-center px-4">
            This AI-powered interview practice app uses <strong>Next.js</strong>{" "}
            for the front-end and <strong>PostgreSQL with Drizzle ORM</strong>{" "}
            for scalable back-end data management. It integrates{" "}
            <strong>Google's Generative AI API</strong> to deliver dynamic
            interview questions and real-time feedback on your answers. With{" "}
            <strong>speech-to-text functionality and AI-generated feedback</strong>, 
            you'll receive ratings and insights to improve your interview skills. Secure 
            login and user data management are handled by <strong>Clerk.js</strong>.
          </p>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="absolute bottom-5">
        <p className="text-gray-300 text-sm italic text-center">
          Learn how AI technology enhances your interview preparation. Click
          'Proceed' to begin!
        </p>
      </div>
    </div>
  );
};

export default Home;
