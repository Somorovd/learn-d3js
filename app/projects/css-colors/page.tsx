"use client";

import ProjectPage from "@/components/project-page";
import useCSV from "@/hooks/use-csv";
import * as d3 from "d3";
import { useCallback } from "react";

const dataUrl =
  "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv";

const CssColorProject = () => {
  const data = useCSV({ dataUrl });
  console.log(data?.columns);

  const width = 960;
  const height = 500;

  const dArc = d3.arc();

  const makeArcSegment = useCallback(
    (i: number) => {
      if (!data) return "";

      return dArc({
        innerRadius: 0,
        outerRadius: width,
        startAngle: (i * Math.PI * 2) / data.length,
        endAngle: ((i + 1) * Math.PI * 2) / data.length,
      });
    },
    [data]
  );

  return (
    <ProjectPage name="CSS Colors">
      <svg width={width} height={height}>
        {data ? (
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {data.map((d, i) => (
              <path
                key={i}
                d={makeArcSegment(i) || ""}
                fill={d["RGB hex value"]}
              />
            ))}
          </g>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </svg>
    </ProjectPage>
  );
};

export default CssColorProject;
