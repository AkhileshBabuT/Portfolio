"use client";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import React from 'react';
import { motion } from "framer-motion";

const services = [
  {
    num: '01',
    title: 'Research and Development',
    description: 'Leveraging advanced artificial intelligence and machine learning techniques to develop customized solutions for various industries. From automating processes to building predictive models, I help businesses solve complex problems and improve efficiency through innovative AI applications.',
    href: "/contact"
  },
  {
    num: '02',
    title: 'Software Development',
    description: 'I specialize in building custom software solutions for various sectors, including finance, healthcare, and manufacturing. Additionally, I develop machine learning models and algorithms that enhance decision-making processes and optimize operational workflows.',
    href: "/contact"
  },
  {
    num: '03',
    title: 'Data Science and Analytics',
    description: 'My data science services focus on analyzing complex datasets to deliver actionable insights for industries such as finance, healthcare, and marketing. I also design and implement scalable data architectures and pipelines that streamline data handling and improve processing efficiency.',
    href: "/contact"
  },
  {
    num: '04',
    title: 'Computer Networks',
    description: 'With a background in cloud computing and network security, I can design and implement secure network architectures and protocols. I provide services in network optimization, cybersecurity assessments, and secure cloud infrastructure management to ensure systems are protected and efficient.',
    href: "/contact"
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between bg-black/20 rounded-lg p-6 min-h-[400px] group"
              variants={itemVariants}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-5xl font-extrabold text-outline group-hover:text-outline-hover transition-all duration-300">
                    {service.num}
                  </div>
                  <Link 
                    href={service.href} 
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-300 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-2xl text-primary transition-colors duration-300" />
                  </Link>
                </div>
                <h2 className="text-[36px] font-bold leading-none text-white group-hover:text-accent transition-all duration-300 mb-4">{service.title}</h2>
                <p className="text-white/60">{service.description}</p>
              </div>
              <div className="border-b border-white/20 w-full mt-auto"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;