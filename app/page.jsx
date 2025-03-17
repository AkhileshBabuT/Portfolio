import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import React from 'react'
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Link from "next/link";

const Home = () => {
  return (
    <section className="h-full">
       <div className="container mx-auto h-full py-12">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
            <div className="text-center xl:text-left flex-1 order-2 xl:order-none">
               <span className="text-xl">Software Developer</span>
               <h1 className="h1 mb-4">
                Hello I'm <br /> <span className="text-accent">Akhilesh Babu Tumati</span>
               </h1>
               <p className="max-w-[600px] mx-auto xl:mx-0 mb-9 text-white/80">As a recent computer science graduate, I enjoy developing software and working with cloud technologies. I'm all about building great web apps, streamlining processes, and simplifying things for users. I'm very excited about AI, particularly computer vision and LLMs. I want to use these skills to generate new ideas and solve complex technological problems and I'm always eager to learn and can't wait to see where this field will take me next.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6">
                  <Link 
                    href="assets/resume/Resume_akhilesh_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline"
                      size="lg"
                      className="uppercase flex items-center gap-2"
                    >
                      <span>Download CV</span>
                      <FiDownload className="text-xl" />
                    </Button>
                  </Link>
                  <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500" />
               </div>
            </div>
            <div className="flex-1 flex justify-center items-center order-1 xl:order-none mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
        <Stats />
    </section>
  )
}

export default Home;