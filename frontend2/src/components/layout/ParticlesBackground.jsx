// src/components/layout/ParticlesBackground.jsx - Updated with new colors
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { 
          color: "transparent" 
        },
        fpsLimit: 60,
        particles: {
          number: { value: 150, density: { enable: true, area: 800 } },
          color: { value: ["#FF2DD1", "#FDFFB8", "#4DFFBE", "#63C8FF"] },
          shape: { 
            type: "circle"
          },
          opacity: { 
            value: 0.6,
            random: false
          },
          size: { 
            value: { min: 1, max: 2 },
            random: true
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: false },
          },
          links: {
            enable: true,
            distance: 120,
            color: "#FF2DD1",
            opacity: 0.3,
            width: 1
          },
        },
        interactivity: {
          events: {
            onHover: { 
              enable: true, 
              mode: ["grab", "bubble"]
            },
            onClick: { 
              enable: false
            },
            resize: true,
          },
          modes: {
            grab: { 
              distance: 150, 
              links: { 
                opacity: 0.6,
                color: "#63C8FF"
              } 
            },
            bubble: { 
              distance: 100, 
              size: 4, 
              duration: 1.5, 
              opacity: 0.8 
            }
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;