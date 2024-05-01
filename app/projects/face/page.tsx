import { arc } from "d3-shape";

const FaceProject = () => {
  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 245;
  const strokeWidth = 10;

  const eyeOffsetX = 100;
  const eyeOffsetY = 60;
  const eyeRadius = 50;

  const mouthArc = arc();
  const mouthWidth = 20;
  const mouthRadius = 180;

  return (
    <div className="project-page">
      <h1>Making a Face Pt.1</h1>
      <div>
        <svg width={width} height={height}>
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="yellow"
            stroke="black"
            stroke-width={strokeWidth}
          />
          <g transform={`translate(${centerX}, ${centerY})`}>
            <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
            <circle cx={+eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
            <path
              d={
                mouthArc({
                  innerRadius: mouthRadius,
                  outerRadius: mouthRadius + mouthWidth,
                  startAngle: Math.PI / 2,
                  endAngle: (3 * Math.PI) / 2,
                }) || ""
              }
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FaceProject;
