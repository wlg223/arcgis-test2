import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";

import React, { useEffect, useState, useMemo } from "react";
import { API_KEY } from "../../secrets";
import portalItems, { portalUrl } from "../constants/portalItems";
import useQuery from "./useQuery";

/**
 * The initium table is where the building data is stored.
 * This hook is a convenience wrapper around the useQuery hook, that makes it easier to query the table as it will be accessed the most.
 * @param q is the query to be run. If none is provided the default query is run.
 * @returns
 */
const useInitiumTable = (q?: Query) => {
  const table = new FeatureLayer({
    url: portalItems.dataTable,
  });

  return useQuery(table, q || table.createQuery());
};

export default useInitiumTable;
