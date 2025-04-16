"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

// Color scale function for the choropleth
const getCapacityColor = (capacity) => {
  if (capacity < 50) return "#e0f7fa"; // Very light blue
  if (capacity < 100) return "#b2ebf2"; // Light blue
  if (capacity < 200) return "#80deea"; // Medium-light blue
  if (capacity < 300) return "#4db6ac"; // Medium blue
  if (capacity < 400) return "#4285F4"; // Medium-dark blue
  if (capacity < 500) return "#1976d2"; // Dark blue
  return "#0d47a1"; // Very dark blue for highest values (Texas)
};

export default function Heatmap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [stateGeoJson, setStateGeoJson] = useState(null);
  const [miningData, setMiningData] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Fetch mining data
  useEffect(() => {
    const fetchMiningData = async () => {
      try {
        const response = await fetch(`/Q4.json`);
        const data = await response.json();
        setMiningData(data);
      } catch (error) {
        console.error("Error fetching mining data:", error);
      }
    };

    fetchMiningData();
  }, []);

  // Fetch US States and Canadian Provinces GeoJSON data
  useEffect(() => {
    if (!miningData.length) return;

    const fetchGeoJsonData = async () => {
      try {
        // Fetch US data
        const usResponse = await fetch(
          "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_lakes.geojson"
        );
        const usData = await usResponse.json();

        // Filter US states only
        const usFeatures = usData.features.filter(
          (feature) => feature.properties.iso_a2 === "US"
        );

        // Process US data
        const enhancedUsFeatures = usFeatures.map((feature) => {
          const stateName = feature.properties.name;
          const stateData = miningData.find(
            (item) =>
              item["State"] === stateName && item["Country"] === "United States"
          );

          if (stateData) {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                powerCapacity: stateData["Power Capacity (MW)"],
                country: "United States",
              },
            };
          }
          return {
            ...feature,
            properties: {
              ...feature.properties,
              country: "United States",
            },
          };
        });

        // Fetch Canadian data
        const canadaResponse = await fetch(
          "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson"
        );
        const canadaData = await canadaResponse.json();

        // Process Canadian data
        const enhancedCanadaFeatures = canadaData.features.map((feature) => {
          const provinceName = feature.properties.name;
          const provinceData = miningData.find(
            (item) =>
              item["State"] === provinceName && item["Country"] === "Canada"
          );

          if (provinceData) {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                powerCapacity: provinceData["Power Capacity (MW)"],
                country: "Canada",
              },
              geometry: convertToPolygon(feature.geometry),
            };
          }
          return {
            ...feature,
            properties: {
              ...feature.properties,
              country: "Canada",
            },
            geometry: convertToPolygon(feature.geometry),
          };
        });

        // Combine the datasets properly
        const combinedGeoJson = {
          type: "FeatureCollection",
          features: [...enhancedUsFeatures, ...enhancedCanadaFeatures],
        };

        // Set state with combined data
        setStateGeoJson(combinedGeoJson);
      } catch (error) {
        console.error("Error fetching or processing GeoJSON data:", error);
      }
    };

    fetchGeoJsonData();
  }, [miningData]);

  // Function to convert MultiPolygon to Polygon
  function convertToPolygon(geometry) {
    if (!geometry) {
      return { type: "Polygon", coordinates: [[]] };
    }

    if (geometry.type === "Polygon") {
      return geometry; // Already a Polygon, no conversion needed
    }

    if (geometry.type === "MultiPolygon") {
      // Find the polygon with the largest area (approximated by number of points)
      let largestPolygon = geometry.coordinates[0];
      let maxPoints = countPoints(largestPolygon);

      for (let i = 1; i < geometry.coordinates.length; i++) {
        const points = countPoints(geometry.coordinates[i]);
        if (points > maxPoints) {
          maxPoints = points;
          largestPolygon = geometry.coordinates[i];
        }
      }

      return {
        type: "Polygon",
        coordinates: largestPolygon,
      };
    }

    console.warn("Unsupported geometry type:", geometry.type);
    return { type: "Polygon", coordinates: [[]] };
  }

  // Helper function to count points in a polygon
  function countPoints(polygon) {
    return polygon.reduce((sum, ring) => sum + ring.length, 0);
  }

  // Initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283],
      projection: { name: "albers" },
      zoom: 3,
      pitch: 0,
      renderWorldCopies: false,
      maxBounds: [
        [-180, 15], // Southwest coordinates (expanded to include more of Canada)
        [-50, 80], // Northeast coordinates (expanded to include more of Canada)
      ],
    });

    mapRef.current = map;

    map.on("load", () => {
      setMapLoaded(true);
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Add the choropleth layer when stateGeoJson changes and map is loaded
  useEffect(() => {
    if (!mapRef.current || !stateGeoJson || !mapLoaded) return;

    const map = mapRef.current;

    // Check if source already exists and remove it if needed
    if (map.getSource("states")) {
      map.removeLayer("state-labels");
      map.removeLayer("state-borders");
      map.removeLayer("state-fills");
      map.removeSource("states");
    }

    // Add the source
    map.addSource("states", {
      type: "geojson",
      data: stateGeoJson,
    });

    // Add fill layer for states with mining data
    map.addLayer({
      id: "state-fills",
      type: "fill",
      source: "states",
      filter: ["has", "powerCapacity"],
      paint: {
        "fill-color": [
          "case",
          ["has", "powerCapacity"],
          [
            "interpolate",
            ["linear"],
            ["get", "powerCapacity"],
            30,
            getCapacityColor(30),
            50,
            getCapacityColor(50),
            100,
            getCapacityColor(100),
            200,
            getCapacityColor(200),
            400,
            getCapacityColor(400),
            600,
            getCapacityColor(600),
            2717,
            getCapacityColor(2717),
          ],
          "transparent",
        ],
        "fill-opacity": 0.8,
      },
    });

    // Add outline for all states
    map.addLayer({
      id: "state-borders",
      type: "line",
      source: "states",
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.5,
      },
    });

    // Add labels for states with power capacity
    // Add labels for states with power capacity
    map.addLayer({
      id: "state-labels",
      type: "symbol",
      source: "states",
      filter: ["has", "powerCapacity"],
      layout: {
        "text-field": ["to-string", ["get", "powerCapacity"]],
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": 14,
        // REMOVED: "text-allow-overlap": true,
        // REMOVED: "text-ignore-placement": true,
      },
      paint: {
        "text-color": "#ffffff",
        "text-halo-color": "#000000",
        "text-halo-width": 1,
      },
    });

    // Add hover effect
    map.on("mouseenter", "state-fills", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "state-fills", () => {
      map.getCanvas().style.cursor = "";
    });

    // Add popups on click
    map.on("click", "state-fills", (e) => {
      if (e.features.length > 0 && e.features[0].properties.powerCapacity) {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="p-2">
              <strong>${e.features[0].properties.name}</strong><br/>
              Power Capacity: ${e.features[0].properties.powerCapacity} MW
            </div>`
          )
          .addTo(map);
      }
    });
  }, [stateGeoJson, mapLoaded]);

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <h1 className="text-2xl font-semibold mb-2">
        Operational Bitcoin Mining Power Capacity Distribution in North America
      </h1>
      <p className="text-gray-600 mb-6">
        Data sourced from 20 mining operators as of Q4'24 including their
        self-mining and colocation capacities
      </p>
      <div className="flex justify-center items-center mb-6">
        <div
          ref={mapContainerRef}
          className="w-[90vw] h-[600px] border rounded-lg shadow-md"
        />
      </div>
      <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Map Legend</h3>

        {/* Color Scale */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-semibold">Unit: Megawatts</div>
          <div className="flex items-center">
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(30) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(50) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(100) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(200) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(300) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(500) }}></div>
            <div
              className="w-6 h-6"
              style={{ backgroundColor: getCapacityColor(2000) }}></div>
          </div>
        </div>

        {/* Data Note */}
        <div className="text-xs text-gray-500 border-t pt-3">
          <p>
            Data represents operational Bitcoin mining capacity as of Q4 2024
          </p>
          <p>Source: SEC Filings; Press releases</p>
          <p className="mt-2">Map: TheMinerMag</p>
        </div>
      </div>
    </div>
  );
}
