import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";

/**
 * This method is to print debug information about the layers currently attached to the mao
 */
export const printMapLayersAndTables = (webmap: WebMap) => {
  const mapLayers = webmap.layers.map((l) => {
    return { id: l.id, title: l.title };
  });

  const mapTables = webmap.tables.map((t) => {
    return { id: t.id, title: t.title, url: t.get("url") };
  });

  console.log("all layers: " + JSON.stringify(mapLayers, null, 2));
  console.log("all tables: " + JSON.stringify(mapTables, null, 2));
};

/**
 * Show / Hide layers on the map
 * @param l layer to modify
 * @param isVisible true if visible, false if not
 */
export const setLayerVisibility = (l: Layer, isVisible: boolean) => {
  l.visible = isVisible;
};

/**
 * Log the data stored in the fields (attributes) of the feature layer
 * @param fl: feature layer to query
 * @param? query: optional query to run
 * @param? queryOptions: optional query options to use in query
 */
type QueryType = Parameters<FeatureLayer["queryFeatures"]>;
export const queryFeatureLayer = (
  fl: FeatureLayer,
  query?: QueryType[0],
  queryOptions?: QueryType[1]
) => {
  query = query || fl.createQuery();
  fl.queryFeatures(query, queryOptions)
    .then((res) => {
      res.features.map((f) =>
        console.log(JSON.stringify(f.attributes, null, 2))
      );
    })
    .catch((e) => console.log("error: ", e));
};
