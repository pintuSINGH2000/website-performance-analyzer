import React from "react";
import style from "./metric.module.css";

const Metric = ({ metric, metricValue }) => {
  const value = metricValue.timeUnit===1?metric.numericValue / 1000:metric.numericValue;
  const timeUnit = metricValue.timeUnit===1?" s":(metricValue.timeUnit===2?" ms":"");
  return (
    <div className={style.container}>
      <div className={style.score}>
        <svg className={style.svg} viewBox="0 0 100 100" role="presentation">
          <circle
            className={`${style.circle} ${style.circle1}`}
            r="47.5"
            cx={50}
            cy={50}
            opacity={1}
            stroke={
              value <= metricValue.minValue
                ? "green"
                : value > metricValue.maxValue
                ? "red"
                : "orange"
            }
          />
        </svg>
        <div className={style.displayValue}>{metric.numericValue?(value.toFixed(2)+" "+timeUnit):"NA"}</div>
      </div>
      <div className={style.title}>
        {metric.title}
        <span style={{ textTransform: "uppercase" }}>
          (
          {metric.title
            .split(" ")
            .map((word) => word[0])
            .join("")}
          )
        </span>
      </div>
      <div className="metricValue">
        <hr/>
        <div className={`${style.good} ${style.value}`}>
          <div>Good</div>
          <div>&#8804; { metricValue.minValue}{timeUnit}</div>
        </div>
        <div className={`${style.average} ${style.value}`}>
          <div>Need Improvement</div>
          <div>{metricValue.minValue}{timeUnit} - {metricValue.maxValue}{timeUnit}</div>
        </div>
        <div className={`${style.poor} ${style.value}`}>
          <div>Poor</div>
          <div>{"> " + metricValue.maxValue}{timeUnit}</div>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Metric;
