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
        setData(json);
      } catch (err) {
        setError(err.message);
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