"use client";

import { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { DSVRowArray, DSVRowString } from "d3";

type UseCSVProps = {
  dataUrl: string;
  rowFunc?: (rawRow: DSVRowString) => DSVRowString;
  numRows?: number;
};

const useCSV = ({ dataUrl, numRows, rowFunc }: UseCSVProps) => {
  const [data, setData] = useState<DSVRowArray | null>(null);

  useEffect(() => {
    csv(dataUrl, rowFunc ? rowFunc : (d: DSVRowString) => d).then((data) =>
      setData(data.slice(0, numRows) as DSVRowArray)
    );
  }, [dataUrl, rowFunc]);

  return data;
};

export default useCSV;
