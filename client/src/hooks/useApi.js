import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5000/api';

export function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
      setData(Array.isArray(response.data) ? response.data : [response.data]);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const postData = useCallback(async (payload) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      toast.success('Data saved successfully');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to save data: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData
  };
}

export default useApi;