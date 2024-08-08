import React, { useState } from "react";
import styles from "./homepage.module.css";
import axios from "axios";
import { MdAnalytics } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import Metric from "../Metric/Metric";
import { metricValue } from './../../Utils/metricValue';
import { IoArrowBackCircle } from "react-icons/io5";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [performances, setPerformances] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const handleBack = () => {
    setMetrics(null);
    setPerformances(null);
    setUrl(null);
  }

  const fetchPerformanceMetrics = async () => {
    if(!url || url.trim().length===0) return;
    try {
      setProcessing(true);
      const response = await axios.post(
        "http://localhost:5000/api/performance",
        { url }
      );
      setMetrics(response?.data?.metrics);
      setPerformances(response?.data?.performance);
      setProcessing(false);
    } catch (error) {
      toast.error("Error fetching performance data");
      setMetrics(null);
      setPerformances(null);
      setProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MdAnalytics /> Performance Analyst
      </div>
      {processing ? (
        <div className={styles.processor}>
          Running analysis <Loader />
        </div>
      ) : (
        <>
          {metrics ? (
            <div className={styles.main}>
              <div className={styles.goBack}>
                <div className={styles.back} onClick={handleBack}>
                <IoArrowBackCircle className={styles.backIcon}/> Go back
                </div>
              </div>
              <div className={styles.metricContainer}>
                <div className={styles.performances}>
                  <div className={styles.performanceCard}>
                    <div>Page Load Time</div>
                    <div className={styles.score}>
                      {performances?.pageLoadTime}ms
                    </div>
                  </div>
                  <div className={styles.performanceCard}>
                    <div>Total Size</div>
                    <div className={styles.score}>
                      {Math.round(performances?.totalRequestSize)} kb
                    </div>
                  </div>
                  <div className={styles.performanceCard}>
                    <div>Total Network Request</div>
                    <div className={styles.score}>{performances?.numberOfRequests}</div>
                  </div>
                </div>
                <div className={styles.metric}>
                  {Object.entries(metrics).map(([key, value]) => (
                    <Metric key={key} metric={value} metricValue={metricValue[key]}/>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                className={styles.input}
              />
              <button
                className={styles.analyze}
                onClick={fetchPerformanceMetrics}
              >
                Analyze
              </button>
            </div>
          )}
        </>
      )}

      {/* {metrics && (
          <div>
            <h2>Performance Metrics</h2>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
          </div>
        )} */}
    </div>
  );
};

export default HomePage;
