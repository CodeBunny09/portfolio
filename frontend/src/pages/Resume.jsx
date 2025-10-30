import React from "react";
import { useResume } from "../hooks/useAPI";
import Navbar from "../components/layout/Navbar";
import ParticlesBackground from "../components/layout/ParticlesBackground";
import CustomCursor from "../components/ui/CustomCursor";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use public/ for worker with Vite!
// IMPORTANT: this must match the filename copied by your vite-plugin-static-copy config!
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const Resume = () => {
  const { data, loading, error } = useResume();
  const resumeUrl = data && data.length > 0 ? data[0].file_url : null;

  const showCursor = typeof window !== "undefined" ? window.innerWidth >= 700 : true;

  return (
    <div className="w-screen min-h-screen relative overflow-x-hidden">
      <ParticlesBackground />
      {showCursor && <CustomCursor />}
      <div style={{ zIndex: 40, position: "relative" }}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center pt-32 px-2 pb-12 z-10 relative">
        <h1 className="text-3xl font-bold text-white mb-6">Resume</h1>
        {loading ? (
          <p className="text-white/70">Loading...</p>
        ) : error ? (
          <p className="text-red-400">Error fetching resume.</p>
        ) : resumeUrl ? (
          <div
            className="mb-8 rounded-lg shadow-2xl bg-white p-4"
            style={{ maxWidth: 900, width: "100%" }}
          >
            <Document
              file={resumeUrl}
              loading="Loading PDF…"
              error="Sorry, the PDF cannot be displayed."
            >
              <Page pageNumber={1} width={820} />
            </Document>
          </div>
        ) : (
          <p className="text-white/70">Resume not available.</p>
        )}
      </div>
      <ScrollToTopButton visible={true} />
    </div>
  );
};

export default Resume;
