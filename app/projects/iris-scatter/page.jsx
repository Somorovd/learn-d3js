"use client";

import ProjectPage from "@/components/project-page";
import useCSV from "@/hooks/use-csv";
import React, { useCallback } from "react";
import * as d3 from "d3";

const dataUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const keyToText = (key) => {
  const parts = key.split("_");
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
};

const IrisScatterPage = () => {
  const rowFunc = useCallback((d) => {
    d["sepal_length"] = +d["sepal_length"];
    d["sepal_width"] = +d["sepal_width"];
    d["petal_length"] = +d["petal_length"];
    d["petal_width"] = +d["petal_width"];
    return d;
  }, []);

  const data = useCSV({ dataUrl, rowFunc });
  console.log("Data", data, data?.columns);

  if (!data) return <div>Loading...</div>;

  // Control Values
  // ------------------------------------------------
  const width = 960;
  const height = 500;

  const margin = { top: 20, right: 20, bottom: 60, left: 90 };

  const xAxisKey = "sepal_length";
  const yAxisKey = "sepal_width";

  const xAxisLabelOffset = 45;
  const yAxisLabelOffset = 50;

  // ------------------------------------------------

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d[xAxisKey];
  const yValue = (d) => d[yAxisKey];

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  return (
    <ProjectPage name="Iris Scatter">
      <svg
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue) => (
            <g
              key={tickValue}
              transform={`translate(${xScale(tickValue)}, 0)`}
            >
              <line
                y2={innerHeight}
                stroke="lightgray"
              />
              <text
                y={innerHeight}
                dy="1.2rem"
                style={{ textAnchor: "middle" }}
              >
                {tickValue}
              </text>
            </g>
          ))}
          {yScale.ticks().map((tickValue) => (
            <g
              key={tickValue}
              transform={`translate(0, ${yScale(tickValue)})`}
            >
              <line
                x2={innerWidth}
                stroke="lightgray"
              />
              <text
                dx={"-2rem"}
                dy={"0.5rem"}
              >
                {tickValue}
              </text>
            </g>
          ))}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(xValue(d))}
              cy={yScale(yValue(d))}
              r={10}
            />
          ))}
          <text
            className="text-3xl"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            dy=""
            textAnchor="middle"
          >
            {keyToText(xAxisKey)}
          </text>
          <text
            className="text-3xl"
            dy=""
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset}, ${
              innerHeight / 2
            }) rotate(-90)`}
          >
            {keyToText(yAxisKey)}
          </text>
        </g>
      </svg>
    </ProjectPage>
  );
};

export default IrisScatterPage;
