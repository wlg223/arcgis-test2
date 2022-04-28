import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";

import React, { useEffect, useState, useMemo } from "react";

/**
 * This hook is used to query data from AGOL.
 * @param layer is the FeatureLayer to be queried
 * @param q is the query to be run
 * @returns the data from the query
 */
const useQuery = (layer: FeatureLayer, q: Query) => {
  const [data, setData] = useState(null);

  // TODO: comment this out before production build
  // print data to console for debugging purposes
  // useEffect(() => {
  // console.log("[useQuery] data: ", JSON.stringify(data, null, 2));
  // }, [data]);

  useEffect(() => {
    // on load, query the layer
    layer.load().then(function () {
      layer.queryFeatures(q).then(function (response) {
        // only return the attributes from the response. other data is accessibly from the response, but not useful towards our purposes thus far.
        const r = response.features.map((d) => d.attributes);
        setData(r);
      });
    });
  }, []);

  return data;
};

export default useQuery;
