"use client";
import { easeIn, motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "AI/ML",
    description: "I co-authored a research paper on detecting Mahabharata characters using a custom dataset. It analyzed CNNs, Vision Transformers, and object detection models like ResNet-50, VGG-19, YOLOv5, and Detectron-V3 to determine the best-performing model for accuracy and precision. The study was presented at the 2023 IEEE International Conference",
    stack: [{ name: "Google Colab" }, { name: "Roboflow" }, { name: "OverLeaf" }, { name: "Python" }],
    image: "/assets/work/data_map_conf.png",
    live: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=akhilesh%20babu%20tumati",
    github: "https://github.com/Akhilandrew/project_846/tree/main/Multiple_Character_detection",
  },
  {
    num: "02",
    category: "AI/ML",
    description: "Utilized ARIMA and SARIMA for time series prediction of cryptocurrency values, achieving a prediction accuracy of 85 percent",
    stack: [{ name: "Google Colab" }, { name: "Python" }],
    image: "/assets/work/crypto_forecasting.png",
    live: "",
    github: "https://github.com/Akhilandrew/project_846/blob/main/Crypto_currency_predictioin.ipynb",
  },
  {
    num: "03",
    category: "Software Development",
    description: "It is an Enterprize application for selling productions based on aviation industry,At Honeywell, I developed Katalon automation scripts, cutting testing time by 30% and boosting coverage by 25%. I also improved front-end performance with JavaScript and Angular, increasing user satisfaction by 15% and reducing page load times by 20%  ",
    stack: [{ name: "Java Script" },{ name: "Angular/React"}, {name: "Spring-boot"}],
    image: "/assets/work/Honeywell_ASDS_screenshot.png",
    live: "https://ads.honeywell.com/login",
    github: "",
  },
  {
    num: "04",
    category: "Software Development",
    description: "This project-based learning initiative delivers a Credit Card Fraud Detection System for MCCS E-Commerce, utilizing machine learning and AI to identify fraudulent transactions in real-time while minimizing false positives. The solution includes fraud detection models, a real-time API, customized dashboards, and automated alerts to protect both the business and its customers.",
    stack: [{ name: "vite/React"}, {name: "Node.js"}, {name: "Python"}, {name: "MongoDB"}, {name: "AWS"}],
    image: "/assets/work/MCCS_aboutus.png",
    live: "",
    github: "https://github.com/LokeshVarma-Konduru/MCCS-E-commerce-Fraud-Detection",
  },
  {
    num: "05",
    category: "Software Development",
    description: "Technovere – Blog Platform\nA modern, responsive blog application built using Next.js and styled with Tailwind CSS, powered by Sanity CMS for content management. The platform enables real-time content updates, SEO optimization, and dynamic routing. Deployed seamlessly on Vercel, it offers fast performance and a smooth editorial experience for blog publishing.",
    stack: [
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Sanity CMS" },
      { name: "Vercel" }
    ],
    image: "/assets/work/technoverse.png", 
    live: "https://technoverse-blog.vercel.app/",
    github: "https://github.com/LordDracula02/Technoverse_blog"
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: {delay:1.0, duration:0.4, ease: "easeIn"} }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px] items-start">
          <div className="w-full xl:w-[50%] flex flex-col xl:justify-between order-2 xl:order-none mb-8 xl:mb-0">
            <div className="flex flex-col gap-[30px]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <p className="text-white/60">{project.description}</p>
              <ul className="flex flex-wrap gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%] xl:sticky xl:top-0">
            <div className="relative">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="h-[460px]"
                onSlideChange={handleSlideChange}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <Image src={project.image} alt={project.category} layout="fill" objectFit="cover" />
                    </div>
                  </SwiperSlide>
                ))}
                <WorkSliderBtns 
                  containerStyles="flex gap-2 absolute bottom-4 right-4 z-20"
                  btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                  iconStyles="text-2xl"
                />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;