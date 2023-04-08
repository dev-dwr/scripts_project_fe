import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
export const JobContext = createContext();

export const JobProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(null)

  const clearErrors = () => {
    setError(null);
  };

  const checkJobApplied = async (id, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.get(
        `${process.env.API_URL}/api/offers/${id}/applied`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (re.data) {
        setApplied(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const applyForJob = async (id, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.post(
        `${process.env.API_URL}/api/offers/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(re.data);
      if (re.data) {
        setLoading(false);
        setApplied(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const getStatistics = async (keyword) => {
    
    try {
      setLoading(true);
      const re = await axios.get(
        `${process.env.API_URL}/api/offers/statistics/${keyword}`
      );
      console.log(re)
      if (re.data) {
        setStats(re.data)
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        error,
        clearErrors,
        applied,
        applyForJob,
        checkJobApplied,
        getStatistics,
        stats
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
