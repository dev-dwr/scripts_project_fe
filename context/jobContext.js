import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(null);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);


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
      if (re.data) {
        setLoading(false);
        setApplied(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteOffer = async (id, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.delete(
        `${process.env.API_URL}/api/offers/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (re.data) {
        setLoading(false);
        setDeleted(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const createNewOffer = async (data, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.post(
        `${process.env.API_URL}/api/offers/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (re.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (err) {
      setLoading(false);
      setCreated(false);
      setError(err);
    }
  };

  const updateExistingOffer = async (id, data, accessToken) => {
    try {
      setLoading(true);
      const re = await axios.put(
        `${process.env.API_URL}/api/offers/${id}/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (re.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (err) {
      setLoading(false);
      setUpdated(false);
      setError(err);
    }
  };

  const getStatistics = async (keyword) => {
    try {
      setLoading(true);
      const re = await axios.get(
        `${process.env.API_URL}/api/offers/statistics/${keyword}`
      );
      if (re.data) {
        setStats(re.data);
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
        stats,
        createNewOffer,
        setCreated,
        created,
        updateExistingOffer,
        updated,
        setUpdated,
        deleteOffer,
        deleted,
        setDeleted,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
