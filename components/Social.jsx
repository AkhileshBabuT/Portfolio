import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import React from 'react'

const socials = [
  { icon: <FaGithub />, path: "https://github.com/LordDracula02" },
  { icon: <FaLinkedinIn />, path:"https://www.linkedin.com/in/akhilesh-babu-tumati-5a3064234/"},
  { icon: <FaTwitter />, path: "https://x.com/LordDraculasama?t=C4lpbPQmnLCoz7XYMCJwpQ&s=09"},
];

const Social = ({ containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link 
            key={index} 
            href={item.path} 
            className={iconStyles}
            target="_blank"
            rel="noopener noreferrer"
          >
             {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;