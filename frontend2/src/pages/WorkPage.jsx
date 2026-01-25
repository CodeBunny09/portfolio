import React, { useEffect, useState, useMemo, useRef } from 'react';
import Masonry from 'react-masonry-css';
import Navbar from '../components/layout/Navbar';
import ParticlesBackground from '../components/layout/ParticlesBackground';
import CustomCursor from '../components/ui/CustomCursor';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import defaultProjectImage from '../assets/default-project.jpg';
import WorkCarousel from '../components/sections/WorkCarousel';
import { useFeaturedProjects, useAllProjects } from '../hooks/useAPI';

const breakpointColumnsObj = {
  default: 5,
  1800: 5,
  1500: 5,
  1200: 4,
  900: 3,
  600: 2,
};

function WorkPage() {
  const { data: featuredProjectsRaw, loading: loadingFeatured } = useFeaturedProjects(100);

  // Always be arrays (guards)
  const featuredProjects = Array.isArray(featuredProjectsRaw) ? featuredProjectsRaw : [];

  // For infinite scrolling project state
  const [otherProjects, setOtherProjects] = useState([]); // this is the full paginated project list
  const [page, setPage] = useState(1); // page starts at 1
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // search/query state
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const galleryRef = useRef(null);
  const showCursor = typeof window !== "undefined" && window.innerWidth >= 700;
  const [userSearched, setUserSearched] = useState(false);

  // Manual fetch for initial and further pages
  useEffect(() => {
    if (query.trim()) return; // don't fetch if searching
    setLoadingProjects(true);
    fetch(`http://127.0.0.1:8000/api/projects?page=1&page_size=18`)
      .then(res => res.json())
      .then(data => {
        let projects =
          Array.isArray(data) ? data :
          (data.results && Array.isArray(data.results)) ? data.results : [];
        setOtherProjects(projects);
        setHasMore(data.next !== null && projects.length > 0);
        setLoadingProjects(false);
        setInitialLoadDone(true); // signal initial fetch is done
        setPage(2); // after initial, next page for scroll is 2
      })
      .catch(() => {
        setLoadingProjects(false);
        setInitialLoadDone(true);
      });
  }, [query]);

  // Infinite scroll event
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 220);
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 350
        && hasMore && !loadingProjects && !query.trim()
        && initialLoadDone
      ) {
        setLoadingProjects(true);
        fetch(`http://127.0.0.1:8000/api/projects?page=${page}&page_size=18`)
          .then(res => res.json())
          .then(data => {
            let projects =
              Array.isArray(data) ? data :
              (data.results && Array.isArray(data.results)) ? data.results : [];
            setOtherProjects(prev => [...prev, ...projects]);
            setHasMore(data.next !== null && projects.length > 0);
            setLoadingProjects(false);
            setPage(prev => prev + 1); // increment for the next scroll
          })
          .catch(() => setLoadingProjects(false));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loadingProjects, query, page, initialLoadDone]);

  // Suggestions + search
  useEffect(() => {
    if (!searchInput.trim()) setSuggestions([]);
    else {
      const q = searchInput.toLowerCase();
      let allLoadedProjects = [...otherProjects, ...featuredProjects];
      let candidates = allLoadedProjects.filter(project =>
        [
          project.title || "",
          project.description || "",
          project.type || "",
          ...(project.tech_stack ? project.tech_stack.map(t => t.name) : []),
          ...(project.tech_stack_names || []),
          ...(project.tags || [])
        ].some(val => val && val.toLowerCase().includes(q))
      );
      setSuggestions(candidates.slice(0, 8));
    }
  }, [searchInput, otherProjects, featuredProjects]);

  // Main filtered results (search)
  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const candidates = [...featuredProjects, ...otherProjects];
    return candidates.filter(project =>
      [
        project.title || "",
        project.description || "",
        project.type || "",
        ...(project.tech_stack ? project.tech_stack.map(t => t.name) : []),
        ...(project.tech_stack_names || []),
        ...(project.tags || [])
      ].some(val => val && val.toLowerCase().includes(q))
    );
  }, [query, featuredProjects, otherProjects]);

  // Skeleton cards for loading
  const skeletonCards = Array.from({ length: 12 }, (_, i) => (
    <div
      key={`skel-${i}`}
      className="animate-pulse w-full h-[340px] rounded-2xl bg-gray-800/40 border shadow-inner"
      style={{ marginBottom: '18px' }}
    >
      <div className="h-48 bg-gray-700/50 rounded-t-2xl" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-700/60 rounded" />
        <div className="h-4 w-2/3 bg-gray-700/40 rounded" />
        <div className="h-3 w-1/2 bg-gray-700/30 rounded" />
      </div>
    </div>
  ));

  // Search suggestion click
  const handleSuggestionClick = val => {
    setQuery(val.title);
    setSearchInput(val.title);
    setSuggestions([]);
    setUserSearched(true);
  };
  const handleSearchSubmit = e => {
    e.preventDefault();
    setQuery(searchInput.trim());
    setSuggestions([]);
    setUserSearched(true);
  };

  useEffect(() => {
    if (userSearched && galleryRef.current && query.trim()) {
      window.scrollTo({ top: galleryRef.current.offsetTop - 12, behavior: "smooth" });
      setUserSearched(false);
    }
  }, [userSearched, query]);

  const showGallery = !query.trim();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ParticlesBackground />
      {showCursor && <CustomCursor />}
      <div className={`transition-opacity duration-500 ease-in-out
          ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ zIndex: 40, position: "relative" }}>
        <Navbar />
      </div>
      {/* Top search bar */}
      <div className="w-full flex flex-row items-center my-8 z-20 px-3 md:px-6">
        <form
            className="flex flex-row gap-3 items-center"
            onSubmit={handleSearchSubmit}
            autoComplete="off"
        >
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow transition-all duration-300 order-first"
          >
            Search
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
              if (query) setQuery('');
            }}
            placeholder="Search projects, tech, tags..."
            className="flex-1 px-4 py-2 rounded-lg bg-[#23272A] text-white border border-white/20 outline-none focus:ring focus:border-purple-400 transition-all duration-300"
            style={{ fontSize: '1rem' }}
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 top-12 w-full bg-[#23272A] border border-white/20 z-50 rounded shadow-lg mt-1">
              {suggestions.map(s => (
                <div key={s.id}
                  className="px-4 py-2 cursor-pointer text-white hover:bg-purple-600 transition-colors"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span className="font-semibold">{s.title}</span>
                  <span className="text-sm text-gray-300 ml-2">{s.type}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      {/* Sticky Blurred MY WORK Header */}
      <div className={`fixed z-30 top-0 left-0 w-full flex justify-center pointer-events-none transition-all duration-300 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`} style={{
        background: "rgba(24,26,27,0)",
        backdropFilter: "blur(3px)",
        minHeight: "54px"
      }}>
        <h1 className="text-center" style={{
          fontSize: "2.4rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          margin: "0.5em 0",
          color: "#fff"
        }}>
          MY WORK
        </h1>
      </div>
      {/* Gallery */}
      <div
        ref={galleryRef}
        className="flex flex-col items-center justify-start pb-12 z-10 relative w-full"
      >
        <div className="w-full px-3 md:px-6">
          {(loadingFeatured || loadingProjects) ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="da-masonry-grid"
              columnClassName="da-masonry-grid_column"
            >
              {skeletonCards}
            </Masonry>
          ) : query.trim()
            ? (
              // Show only search results
              filteredProjects.length === 0 ? (
                <div className="text-center text-gray-400 py-8 text-xl">No projects found.</div>
              ) : (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="da-masonry-grid"
                  columnClassName="da-masonry-grid_column"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                  <div className="da-masonry-invisible-spacer" />
                </Masonry>
              )
            )
            : (
              <>
                {/* Featured Work Section */}
                <h2 className="text-3xl font-bold text-white mb-6 mt-12 text-center">Featured Work</h2>
                <WorkCarousel projectsData={featuredProjects} />
                {/* Other Projects Section */}
                <h2 className="text-3xl font-bold text-white mb-6 mt-16 text-center">Other Projects</h2>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="da-masonry-grid"
                  columnClassName="da-masonry-grid_column"
                >
                  {otherProjects
                    .filter(project => !featuredProjects.some(fp => fp.id === project.id))
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  <div className="da-masonry-invisible-spacer" />
                  {loadingProjects && skeletonCards}
                </Masonry>
              </>
            )
          }
        </div>
        <ScrollToTopButton visible={scrolled} />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      className="group bg-white/5 border border-white/10 shadow-xl rounded-2xl overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-300"
      style={{
        width: "100%",
        minHeight: "340px",
        marginBottom: "18px",
      }}
    >
      <div
        className="h-48 md:h-56 bg-cover bg-center rounded-t-2xl"
        style={{
          backgroundImage: `url(${project.image || defaultProjectImage})`,
        }}
      />
      <div className="p-6 flex-1 flex flex-col gap-2">
        <h3 className="text-lg md:text-xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-300 text-base">{project.description}</p>
        <div className="text-xs text-gray-400">
          <span className="text-gray-200">Type:</span> {project.type || 'N/A'}
          {project.project_date && (
            <span className="ml-2"><span className="text-gray-200">Date:</span> {project.project_date}</span>
          )}
        </div>
        {project.tech_stack?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {project.tech_stack.slice(0, 8).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-1 text-xs rounded bg-white/10 text-gray-200 border border-white/20"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
          {project.type === 'github' && (
            <>
              <span>★ {project.github_stars ?? 0}</span>
              <span>🍴 {project.github_forks ?? 0}</span>
            </>
          )}
          {project.type === 'linkedin' && (
            <>
              <span>👍 {project.linkedin_likes ?? 0}</span>
              <span>💬 {project.linkedin_comments ?? 0}</span>
            </>
          )}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-full text-center bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg transition-colors duration-300 font-semibold"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
}

export default WorkPage;
