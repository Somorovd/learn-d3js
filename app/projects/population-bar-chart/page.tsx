"use client";

import ProjectPage from "@/components/project-page";
import useCSV from "@/hooks/use-csv";
import React, { useEffect } from "react";
import * as d3 from "d3";

const dataUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const PopulationBarChartProject = () => {
  const data = useCSV({ dataUrl, numRows: 10 });
  console.log(data?.columns);

  const margin = { top: 20, right: 20, bottom: 20, left: 200 };
  const width = 960;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  if (!data) return <div>Loading...</div>;

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d["Country"]) || [])
    .range([0, innerHeight]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d["2020"]) || 0])
    .range([0, innerWidth]);

  return (
    <ProjectPage name="Population Bar Chart">
      <svg
        width={width}
        height={height}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue) => (
            <g
              key={tickValue}
              transform={`translate(${xScale(tickValue)}, 0)`}
            >
              <line
                y2={innerHeight}
                stroke="black"
              />
              <text
                y={innerHeight}
                dy="1rem"
                style={{ textAnchor: "middle" }}
              >
                {tickValue}
              </text>
            </g>
          ))}

          {data.map((d) => (
            <rect
              key={d["Country"]}
              y={yScale(d["Country"])}
              x={0}
              width={xScale(+d["2020"])}
              height={yScale.bandwidth()}
            />
          ))}
          {yScale.domain().map((tickValue) => (
            <text
              key={tickValue}
              x={-3}
              y={(yScale(tickValue) || 0) + yScale.bandwidth() / 2}
              dy="0.32rem"
              style={{ textAnchor: "end" }}
            >
              {tickValue}
            </text>
          ))}
        </g>
      </svg>
    </ProjectPage>
  );
};

export default PopulationBarChartProject;
