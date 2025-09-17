import React from 'react';
import Header from '../components/Header';
import Foot from '../components/Foot';

function About() {
  return (
    <div className="bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen bg-[url('https://cdn.pixabay.com/photo/2017/12/12/02/41/artist-3013762_1280.jpg')] bg-cover bg-center relative">
        <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-lg">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#9e085d' }}>
            About Us
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            The story behind our strokes – connecting artists and enthusiasts through the magic of colors.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: '#9e085d' }}>
          Our Journey
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Timeline item */}
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#9e085d' }}>2019</div>
            <div className="ml-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-300">
              <h3 className="font-semibold text-xl " style={{ color: '#9e085d' }}>Founded</h3>
              <p className="text-gray-600 mt-2">Our journey began with a vision to connect artists globally.</p>
            </div>
          </div>

          <div className="flex items-center flex-row-reverse">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#9e085d' }}>2020</div>
            <div className="mr-6 bg-white p-6 rounded-xl shadow-lg border-r-4 border-blue-300">
              <h3 className="font-semibold text-xl " style={{ color: '#9e085d' }}>First Exhibition</h3>
              <p className="text-gray-600 mt-2">Showcasing the talent of local artists to a broader audience.</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12  rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#9e085d' }}>2022</div>
            <div className="ml-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-300">
              <h3 className="font-semibold text-xl" style={{ color: '#9e085d' }}>Global Collaborations</h3>
              <p className="text-gray-600 mt-2">Partnered with artists and communities around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-16 bg-purple-50">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: "#9e085d" }}
        >
          Meet Our Founders
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Founder 1 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200">
              <img
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&w=400&h=400"
                alt="Alice"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-700">Alice</h3>
            <p className="text-gray-600 mt-2">
              Loves expressing emotions through vibrant strokes.
            </p>
          </div>

          {/* Founder 2 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200">
              <img
                src="https://thvnext.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?w=117&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
                alt="Bob"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-700">Bob</h3>
            <p className="text-gray-600 mt-2">
              Passionate about minimalism and clean design.
            </p>
          </div>

          {/* Founder 3 */}
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=400&h=400"
                alt="Clara"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-purple-700">Clara</h3>
            <p className="text-gray-600 mt-2">
              Brings stories to life through abstract art.
            </p>
          </div>
        </div>
      </section>


      {/* Quotes Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 " style={{ color: '#9e085d' }}>Inspiration</h2>
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          {[
            `"Art enables us to find ourselves and lose ourselves at the same time." – Thomas Merton`,
            `"Every artist was first an amateur." – Ralph Waldo Emerson`,
            `"Creativity takes courage." – Henri Matisse`,
          ].map((quote, idx) => (
            <p
              key={idx}
              className="bg-pink-100/70 p-6 rounded-xl text-purple-700 text-lg italic shadow-md"
            >
              {quote}
            </p>
            
          ))}
          
        </div>
      </section>
        <Foot/>
     
    </div>
    
   
  );
}

export default About;
