import React, { useRef, useEffect, useContext, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import portalItems, { portalUrl } from "../../constants/portalItems";
import styles from "../../src/styles/EsriMap.module.scss";
import { API_KEY } from "../../secrets";
import esriConfig from "@arcgis/core/config.js";
import {
  SideBarContext,
  UNFOCUS,
  UPDATE_FOCUSSED_BUILDING,
} from "../pages/index";
import FILTERS from "../constants/filters";
import {
  printMapLayersAndTables,
  queryFeatureLayer,
  setLayerVisibility,
} from "../helpers/mapUtils";



function EsriMap() {
  const mapDiv = useRef(null);
  esriConfig.apiKey = API_KEY;
  const map = useRef<WebMap>(null);

  //Get the dispatcher so we can update the SideBarState from the map
  const {
    state: { filters },
    dispatch,
  } = useContext(SideBarContext);

  const configureMap = () => {
    // The map being referenced must have its sharing settings set to fully public for it to load, otherwise you will see a brown screen with some map widgets.
    // To display private maps we likely need to authenticate somehow
    const webmap = new WebMap({
      portalItem: {
        id: portalItems.map,
        url: portalUrl,
      },
    });

    map.current = webmap;

    // MapView displays our map in 2D.
    const view = new MapView({
      container: mapDiv.current,
      map: webmap,
    });

    /**
     * Automatically close the popups to "disable" them.
     * Instead we will show that data in the sidebar.
     */
    view.popup.watch("visible", (newValue) => {
      if (newValue) {
        view.popup.close();
      }
    });

    // Get data from features corresponding to where a user clicks on the map
    // Then dispatch the data to update the sidebar
    view.on("click", (event) => {
      view.popup.fetchFeatures(event).then((res) => {
        // get all the features for the point we clicked
        let layerData = {};
        res.promisesPerLayerView.forEach((layer) => {
          layer.promise
            .then((p) => {
              p.forEach((q) => {
                // build the data object from multiple layers
                // initially this was because building data and energy data were on separate layers
                // if all data is on one layer we may not need this code anymore...
                layerData = { ...layerData, ...q.attributes };
              });
            })
            .then(() => {
              // once we have all the data, update the sidebar
              // console.log("clicked on", JSON.stringify(layerData, null, 2));

              dispatch({
                type: UPDATE_FOCUSSED_BUILDING,
                payload: { buildingData: layerData },
              });
            });
        });
      });
    });
  };

  // Update the visible layers of the map when filters change
  useEffect(() => {
    map.current &&
      map.current.when(() => {
        // ? memoize to improve performance
        const mapLayers = map.current.layers.filter((l) =>
          Object.values(FILTERS).includes(l.id)
        );

        if (Array.isArray(filters) && filters.length != 0) {
          // show layers for which the filters are turned on
          mapLayers.forEach((l) =>
            setLayerVisibility(l, filters.includes(l.id))
          );
        } else {
          // make sure all view layers are visible
          mapLayers.forEach((l) => setLayerVisibility(l, true));
        }
      });
  }, [filters]);

    useEffect(() => {
      if (mapDiv.current) {
        configureMap();
      }
    }, [dispatch]);

  return <div className={styles.mapDiv} ref={mapDiv}></div>;
}

export default EsriMap;