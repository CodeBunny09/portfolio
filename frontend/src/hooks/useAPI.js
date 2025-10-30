// src/hooks/useAPI.js
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // change for production



export function useFeaturedProjects(limit = 4) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/?featured=true&limit=${limit}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        // Always ensure array
        if (Array.isArray(json)) setData(json);
        else if ('results' in json && Array.isArray(json.results)) setData(json.results);
        else setData([]);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [limit]);

  return { data, loading, error };
}



export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { data, loading, error };
}

export function useGalleryImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery/`)
      .then(res => res.json())
      .then(json => {
        // support paginated and non-paginated:
        if (Array.isArray(json)) setData(json);
        else if ('results' in json && Array.isArray(json.results)) setData(json.results);
        else setData([]); // fallback
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}


export async function addGalleryLike(id) {
  return fetch(`${API_BASE_URL}/gallery/${id}/add_like/`, { method: 'POST' });
}

export async function addGalleryComment(id, text) {
  return fetch(`${API_BASE_URL}/gallery/${id}/add_comment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
}


export function useContactPlatforms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/contact-platforms/`)
      .then(res => res.json())
      .then(json => {
        // support paginated and non-paginated:
        if (Array.isArray(json)) setData(json);
        else if ('results' in json && Array.isArray(json.results)) setData(json.results);
        else setData([]);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}


export function useAllProjects({ page = 1, page_size = 18 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects?page=${page}&page_size=${page_size}`)
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setData(json);
        else if ('results' in json && Array.isArray(json.results)) setData(json.results);
        else setData([]);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, page_size]);
  return { data, loading, error };
}
