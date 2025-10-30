import React, { useState, useEffect, useRef } from "react";
import { useGalleryImages } from "../hooks/useAPI";
import Masonry from "react-masonry-css";
import Navbar from "../components/layout/Navbar";
import ParticlesBackground from "../components/layout/ParticlesBackground";
import CustomCursor from "../components/ui/CustomCursor";
import ModalPost from "../components/gallery/ModalPost";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import "../App.css";

const breakpointColumnsObj = {
  default: 3,
  1600: 4,
  1200: 3,
  1000: 2,
  900: 2,
  600: 1,
};

/*function ScrollToTopButton({ visible }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 right-5 z-50
        px-4 py-3
        bg-white/80 hover:bg-white transition
        rounded-full shadow-lg
        backdrop-blur
        text-black text-xl
        flex items-center justify-center
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        transition-opacity duration-400
      `}
      aria-label="Scroll to top"
      style={{
        boxShadow: "0 2px 12px 0 #0003",
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      ↑
    </button>
  );
} */

const truncate = (text, len = 42) => (text.length > len ? text.substr(0, len - 1) + "…" : text);
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 700;

const Gallery = () => {
  const { data: images, loading } = useGalleryImages();
  const [hideIds, setHideIds] = useState([]);
  const [modalPost, setModalPost] = useState(null);
  const [focusIds, setFocusIds] = useState([]);
  const imgRefs = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const [mobile, setMobile] = useState(isMobile());
  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobile) {
      setFocusIds(images.map(img => img.id));
    } else {
      setFocusIds([]);
    }
  }, [mobile, images.length]);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      setScrolled(heroBottom <= 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showCursor = !isMobile();

  return (
    <div className="w-screen min-h-screen relative overflow-x-hidden">
      <ParticlesBackground />
      {showCursor && <CustomCursor />}
      <div
        className={`transition-opacity duration-500 ease-in-out
          ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ zIndex: 40, position: "relative" }}
      >
        <Navbar />
      </div>
      <div
        className={`fixed z-30 top-0 left-0 w-full flex justify-center pointer-events-none transition-all duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "rgba(24,26,27,0)",
          backdropFilter: "blur(3px)",
          minHeight: "54px"
        }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: "2.4rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            margin: "0.5em 0",
            color: "#fff"
          }}
        >
          MY PHOTO GALLERY
        </h1>
      </div>
      <div className="flex flex-col items-center justify-start pt-24 px-2 pb-12 z-10 relative">
        <div
          ref={heroRef}
          className="w-full flex flex-col items-center justify-center mb-6 mt-0"
        >
          <h1
            className="text-center"
            style={{
              fontSize: "3rem",
              animationDelay: "0.3s",
              color: "#fff",
              textShadow: "none",
              letterSpacing: "0.1px",
              marginTop: "0",
              lineHeight: "1.1",
              fontWeight: 600
            }}
          >
            MY PHOTO GALLERY
          </h1>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="da-masonry-grid"
          columnClassName="da-masonry-grid_column"
        >
          {(images || []).map((img, idx) =>
            !img.image_url || hideIds.includes(img.id)
              ? null
              : (
                <div
                  key={img.id}
                  className="da-gallery-img group w-full relative overflow-hidden cursor-pointer"
                  style={{ marginBottom: "6px" }}
                  onClick={() => setModalPost(img)}
                >
                  <img
                    ref={el => (imgRefs.current[idx] = el)}
                    src={img.image_url}
                    alt={img.title}
                    data-id={img.id}
                    onError={() => setHideIds(ids => [...ids, img.id])}
                    className="w-full h-auto block transition duration-500 group-hover:brightness-75"
                    style={{
                      borderRadius: "0px",
                      background: "#181a1b"
                    }}
                    draggable={false}
                  />
                  <div
                    className={
                      "absolute left-0 bottom-0 w-full transition-opacity duration-500 z-20 pointer-events-none " +
                      (
                        mobile
                          ? (focusIds.includes(img.id) ? "opacity-100" : "opacity-0")
                          : "group-hover:opacity-100 opacity-0"
                      )
                    }
                    style={{
                      padding: "0.7em 1em",
                      minHeight: "54px"
                    }}
                  >
                    <div className="text-white font-semibold text-lg" style={{ letterSpacing: "0.01em" }}>
                      {img.title}
                    </div>
                    <div className="text-white/80 text-sm mb-1">
                      {truncate(img.description, 56)}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                      <span className="mr-2 text-pink-400">
                        ♥ {img.likes}
                      </span>
                      <span className="mr-2 text-blue-300">
                        💬 {img.comments.length}
                      </span>
                      {img.tags.map((t, idx2) => (
                        <span
                          key={idx2}
                          className="px-2 py-0.5 bg-white/10 rounded-full text-white/90 font-semibold"
                        >
                          #{t}
                        </span>
                      ))}
                      <span className="ml-auto text-white/50">{img.date}</span>
                    </div>
                  </div>
                </div>
              )
          )}
          <div className="da-masonry-invisible-spacer" />
        </Masonry>
      </div>
      <ModalPost
        open={!!modalPost}
        onClose={() => setModalPost(null)}
        post={modalPost}
        likeCount={modalPost ? modalPost.likes : 0}
        commentCount={modalPost ? modalPost.comments.length : 0}
        comments={modalPost ? modalPost.comments : []}
      />
      <ScrollToTopButton visible={scrolled} />
    </div>
  );
};

export default Gallery;
