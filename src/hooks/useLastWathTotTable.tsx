import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";

import React, { useEffect, useState, useMemo } from "react";
import { API_KEY } from "../../secrets";
import portalItems, { portalUrl } from "../../constants/portalItems";
import useQuery from "./useQuery";

const useLastWathTotTable = (q?: Query) => {
  const table = new FeatureLayer({
    url: "https://services.arcgis.com/VXxCfMpXUKuFKFvE/arcgis/rest/services/Originis/FeatureServer",
  });

  return useQuery(table, q || table.createQuery());
};

// const getOptions = useMemo(assignOptions, [data])
export default useLastWathTotTable;
