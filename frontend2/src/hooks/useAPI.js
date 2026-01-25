// src/hooks/useAPI.js
import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000/api";

/* ===================== FEATURED PROJECTS ===================== */
export function useFeaturedProjects(limit = 4) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/projects/?featured=true&limit=${limit}`
        );
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        if (Array.isArray(json)) setData(json);
        else if (json.results) setData(json.results);
        else setData([]);
      } catch (e) {
        setError(e.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [limit]);

  return { data, loading, error };
}

/* ===================== PROFILE ===================== */
export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/profile/`);
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { data, loading, error };
}

/* ===================== TESTIMONIALS (WITH FALLBACK) ===================== */
const FALLBACK_TESTIMONIALS = [
  {
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },
  {
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },
  {
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },
  {
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },{
    client_name: "John Doe",
    client_title: "Founder, StartupX",
    content:
      "Working with Pratik was a game-changer. Clear thinking, fast execution, zero nonsense.",
    rating: 5,
  },
  {
    client_name: "Sarah Lee",
    client_title: "Product Manager",
    content:
      "Delivered exactly what we needed and improved the solution beyond expectations.",
    rating: 5,
  },
  {
    client_name: "Amit Sharma",
    client_title: "CTO, FinTech Co.",
    content:
      "Strong fundamentals, great communication, and solid problem-solving skills.",
    rating: 4,
  },
  
];

export function useTestimonials() {
  const [data, setData] = useState(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials/`);
        if (!res.ok) throw new Error(res.status);
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          setData(json);
        }
      } catch (e) {
        setError(e.message);
        // fallback already set
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return { data, loading, error };
}

/* ===================== GALLERY ===================== */
export function useGalleryImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery/`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setData(json);
        else if (json.results) setData(json.results);
        else setData([]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/* ===================== CONTACT PLATFORMS ===================== */
export function useContactPlatforms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/contact-platforms/`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setData(json);
        else if (json.results) setData(json.results);
        else setData([]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/* ===================== ALL PROJECTS ===================== */
export function useAllProjects({ page = 1, page_size = 18 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/projects?page=${page}&page_size=${page_size}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json)) setData(json);
        else if (json.results) setData(json.results);
        else setData([]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, page_size]);

  return { data, loading, error };
}

/* ===================== RESUME ===================== */
export function useResume() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/resume/`)
      .then((res) => res.json())
      .then((json) => {
        if (json.results) setData(json.results);
        else setData(json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/* ===================== GALLERY ACTIONS (REQUIRED BY ModalPost.jsx) ===================== */

export async function addGalleryLike(id) {
  return fetch(`${API_BASE_URL}/gallery/${id}/add_like/`, {
    method: "POST",
  });
}

export async function addGalleryComment(id, text) {
  return fetch(`${API_BASE_URL}/gallery/${id}/add_comment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}
