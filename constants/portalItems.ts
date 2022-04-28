/**
 * Urls for items stored in AGOL
 */
const portalUrl = "https://lu.maps.arcgis.com/";


const portalItems = {
  map: "daf24955ef5742de8938e2e8bf08b030",
  initiumTable: "4152aeae4eb3457cb1b8681a14c6f389",
  dataTable:
    "https://services.arcgis.com/VXxCfMpXUKuFKFvE/arcgis/rest/services/Initium/FeatureServer",
  buildingTable:
    "https://services.arcgis.com/VXxCfMpXUKuFKFvE/arcgis/rest/services/join_energy_data_to_building_one_to_one/FeatureServer",
  // mapDataLayer:
  // "https://services.arcgis.com/VXxCfMpXUKuFKFvE/arcgis/rest/services/Building_energy_data/FeatureServer",

};

console.log("items have loaded");

export { portalUrl, portalItems as default };
