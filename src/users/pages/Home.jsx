import React from 'react'

import Footer from '../../components/Footer'
import { BiLogInCircle } from "react-icons/bi";
import { Button } from 'flowbite-react';
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useState } from 'react';
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import Foot from '../components/Foot';



function Home() {
  const text = "Experience the beauty share the passion".split(" ");

  const artworks = [
    "https://www.hdwallpapers.in/download/painting_of_krishna_hd_krishna-HD.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.en7bHVeOcqX-YHl79VEuBgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse1.mm.bing.net/th/id/OIP.f5ABzPyqc8_k0f9QVo_LmgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://images4.alphacoders.com/637/637588.jpg",
    "https://tse4.mm.bing.net/th/id/OIP.cXQX9pKtwrudX_n6orERwAHaEj?rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://wallpaperaccess.com/full/140472.jpg",
    "https://wallpapercave.com/wp/wp3421719.jpg",
    "https://wallpapercave.com/wp/wp6597986.jpg",
  ];

  const itemsPerPage = 4;
  const [page, setPage] = useState(1);

  // Calculate which artworks to show on current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtworks = artworks.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>

      <header className="flex justify-between items-center px-8 py-4  ">

        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.dribbble.com/users/530580/screenshots/5974084/color.gif"
            alt="Logo GIF"
            className="w-40 h-40 rounded"
          />
          <h1 className="text-2xl font-bold text-gray-800">ArtConnect</h1>
        </div>


        <nav className="flex items-center space-x-6">
      
          <Link to={'/login'}>
            <Button
              style={{ backgroundColor: "#9e085d" }}
              className="px-5 py-2 text-xl rounded-lg text-white hover:opacity-90 transition"
            >
              Login <BiLogInCircle className=" ml-2" />
            </Button></Link>
          <label className="switch">
            <input type="checkbox" />

          </label>

        </nav>
      </header>


      <section className="flex flex-col md:flex-row items-center px-8 py-16 md:py-20">

        <div className="flex-1 md:text-left text-center px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 flex flex-wrap justify-center md:justify-start">
            {text.map((word, i) => (
              <motion.span
                key={i}
                className="mr-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>


          <p className="text-2xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Explore stunning artworks, share your passion, and be part of a creative journey.
          </p>

          <Link to={"/login"}>
            <Button

              style={{ backgroundColor: "#9e085d" }}
              className="px-5 py-5 w-32   text-sm font-medium rounded-lg shadow-md hover:opacity-90 transition"
            >
              Explore Art
            </Button></Link>


        </div>

        <div className="flex-1 mt-8 md:mt-0 md:ml-12 flex justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/924/397/large_2x/beautiful-kathak-dance-painting-fine-art-generative-ai-photo.jpg"
            alt="Artwork"
            className="w-90 md:w-10 lg:w-[520px] rounded-lg shadow-md object-cover"
          />
        </div>
      </section>



      <section className="px-8 py-12">
        <h3 className="text-2xl font-bold mb-6">Featured artworks</h3>

        {/* Artworks grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentArtworks.map((art, index) => (
            <img
              key={index}
              src={art}
              alt={`Artwork ${index + 1}`}
              className="rounded-lg shadow-md transition"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(artworks.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#9e085d",         // text color
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#9e085d",
                  color: "#fff",            // white text when active
                },
              }}
            />
          </Stack>
          

        </div>
      </section>
    

<Foot/>



    </div>
  )
}

export default Home
