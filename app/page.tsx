import Link from "next/link";

const Home = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-[400px] flex flex-col gap-4">
        <h1 className="text-3xl">Learning D3</h1>
        <p>
          Following along with tutorials to learn about data visualization with
          D3.js. This is relevant to my current project that I am working on,{" "}
          <Link href="https://smite-analyzer.onrender.com/" className="link ex">
            SMITE Analyzer
          </Link>
          , and I can see it having greater applications considering my interest
          in science and engineering.
        </p>
        <ol className="list-decimal">
          <li>
            <Link
              href="https://www.youtube.com/watch?v=2LhoCfjm8R4&t=17192s"
              className="link ex"
            >
              Data Visualization with D3, JavaScript, React - Full Course [2021]
            </Link>
            <ul className="list-disc pl-4">
              <li>
                <Link href={"/projects/face"} className="link in">
                  Making a Face
                </Link>
              </li>
              <li>
                <Link href={"/projects/css-colors"} className="link in">
                  CSS Colors
                </Link>
              </li>
              <li>
                <Link
                  href={"/projects/population-bar-chart"}
                  className="link in"
                >
                  Population Bar Chart
                </Link>
              </li>
              <li>
                <Link href={"/projects/iris-scatter"} className="link in">
                  Iris Scatter
                </Link>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
