import  { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ResultTable from "../components/ResultTable";
import HistoryTable from "../components/HistoryTable";
import {
  runExperiment,
  listExperiments,
} from "../api"; 

const Home = () => {
  const [result, setResult] = useState([]);
  const [data, setData] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await listExperiments(); 
      console.log(JSON.stringify(res?.data,null,2), "Fetched history data");
      setData(res?.data || {});
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleSubmit = async (brands, categories) => {
    try {
      const res = await runExperiment({ brands, categories });
      setResult(res.data.rankings || []);
      fetchHistory(); 
    } catch (err) {
      alert(err?.response?.data?.error || "Ranking failed");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
          Brand Ranker
        </Typography>

        <SearchBar onSubmit={handleSubmit} />

        {result?.length > 0 && <ResultTable data={result} />}

        <HistoryTable history={data} />
      </Container>
    </>
  );
};

export default Home;
