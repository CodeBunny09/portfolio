import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ParticlesBackground from '../components/layout/ParticlesBackground';
import CustomCursor from '../components/ui/CustomCursor';
import { useContactPlatforms } from '../hooks/useAPI';

import '../App.css';

const Contact = () => {
  /*const [contacts, setContacts] = useState([]);

    useEffect(() => {
    fetch('/api/contact-platforms/')
        .then(res => res.json())
        .then(data => {
        setContacts(data.results); // Fix: assign the actual array!
        });
    }, []); */


const { data: contacts, loading, error } = useContactPlatforms();


  return (
    <div className="w-screen min-h-screen cursor-none relative overflow-y-auto overflow-x-hidden hide-scrollbar bg-transparent">
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      <div className="flex flex-col items-center justify-start pt-24 px-4 pb-12">
        <h1 className="text-4xl font-bold text-white mb-8 fade-line" style={{ animationDelay: '0.6s' }}>
          Contact & Hire Me Across Platforms
        </h1>
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-6 fade-in" style={{ animationDelay: '1.2s' }}>
          {contacts.map(({ id, title, url, description }, idx) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group flex items-center gap-4 rounded-lg px-4 py-3
                transition-all duration-300
                font-semibold
                ${idx % 3 === 0 ? 'text-[#FF2DD1]' : idx % 3 === 1 ? 'text-[#63C8FF]' : 'text-[#4DFFBE]'}
                hover:bg-gradient-to-r hover:from-[#FF2DD1] hover:to-[#63C8FF] hover:text-white
                shadow
              `}
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.09)",
                boxShadow: "0 2px 8px 0 rgba(63,200,255,0.07)"
              }}
            >
              <span className="text-lg font-semibold">{title}</span>
              <span className="text-sm opacity-80">{description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
