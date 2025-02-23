"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

//image
import forestBG from "../../../public/banner/forest.jpg";
const Home = () => {
  const techStack = [
    {
      title: "Frontend",
      tech: "Next.js",
      detail:
        "For seamless user experience, fast rendering, and server-side rendering capabilities.",
    },
    {
      title: "UI Library",
      tech: "React",
      detail:
        "For building interactive UI components and managing the view layer efficiently.",
    },
    {
      title: "TypeScript",
      tech: "TypeScript",
      detail:
        "For static typing and type safety to improve code reliability and maintainability.",
    },
    {
      title: "Markup",
      tech: "HTML",
      detail:
        "For structuring web pages and content with semantic elements and accessibility in mind.",
    },
    {
      title: "Styling",
      tech: "CSS",
      detail:
        "For styling and laying out web pages, ensuring responsive design and smooth user experiences.",
    },
    {
      title: "Styling",
      tech: "Tailwind CSS",
      detail: "For flexible and utility-first CSS styling.",
    },
    {
      title: "UI Components",
      tech: "MUI",
      detail: "For pre-built React components that speed up UI development.",
    },
    {
      title: "Backend",
      tech: "Laravel",
      detail:
        "For handling APIs and server-side logic with security and efficiency. We also use Laravel Sanctum for authentication.",
    },
    {
      title: "Database",
      tech: "MySQL",
      detail: "For reliable data storage and management.",
    },
    {
      title: "Data Visualization",
      tech: "Chart.js and react-chartjs-2",
      detail: "For rendering interactive and dynamic charts.",
    },
    {
      title: "State Management",
      tech: "Zustand",
      detail: "For lightweight and fast state management.",
    },
    {
      title: "API Requests",
      tech: "Axios",
      detail: "For handling HTTP requests between frontend and backend.",
    },
    {
      title: "Animations",
      tech: "Framer Motion",
      detail: "For animations in React components.",
    },
  ];
  const tools = [
    {
      title: "API Management",
      tool: "Postman",
      detail:
        "For testing and managing APIs with ease, ensuring proper request-response handling.",
    },
    {
      title: "Version Control",
      tool: "VS Code",
      detail:
        "For writing and managing code with support for debugging, extensions, and version control.",
    },
    {
      title: "Design",
      tool: "Figma",
      detail:
        "For designing user interfaces and creating visual prototypes for web and mobile applications.",
    },
    {
      title: "FTP Client",
      tool: "FileZilla",
      detail:
        "For managing file transfers between local machines and remote servers via FTP.",
    },
    {
      title: "Database Management",
      tool: "HeidiSQL",
      detail:
        "For managing MySQL databases with an intuitive GUI for query execution and data manipulation.",
    },
  ];

  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className="flex w-full min-h-screen flex-col relative">
      <div className="text-black bg-gray-300 shadow-2xl my-10 p-[50px] rounded-xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className=" font-bold text-[50px] flex flex-row gap-4 justify-center w-full">
            We are
            <span className="text-orange-500">Sakaerat Protocol&apos;s</span>
            team
          </div>
          <div className=" font-bold text-[45px] flex flex-row gap-4 justify-center w-full">
            We build Inventory with modern technologies
          </div>
          <div className=" font-normal text-[20px] flex flex-row gap-4 mt-4 justify-center w-full">
            Our inventory system is built using a robust tech stack to ensure
            reliability and security:
            <div></div>
          </div>
        </motion.div>
      </div>
      <section className="bg-gray-900 text-white py-16 px-4 rounded-xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-yellow-500 mb-6">
              .Life Inventory
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6">
              .Life Store is a modern lifestyle store that offers innovative
              gadgets, health and wellness products, home essentials,
              stationery, and stylish lifestyle items designed to make your
              daily life more convenient and enjoyable.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6">
              At .Life Store, we believe that every lifestyle can be enhanced
              with the right products to make life easier!
            </p>
            <div className="mt-8">
              <p className="text-md sm:text-lg text-gray-400">
                Visit us at our nearest store or shop online anytime, anywhere!
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;