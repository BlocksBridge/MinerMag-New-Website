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

  const miningData = [
    {
      "State/Province": "Québec",
      "Power Capacity (MW)": 212,
    },
    {
      "State/Province": "New Brunswick",
      "Power Capacity (MW)": 43,
    },
    {
      "State/Province": "Alberta",
      "Power Capacity (MW)": 109,
    },
    {
      "State/Province": "British Columbia",
      "Power Capacity (MW)": 160,
    },
    {
      "State/Province": "Alabama",
      "Power Capacity (MW)": 55,
    },
    {
      "State/Province": "North Dakota",
      "Power Capacity (MW)": 386,
    },
    {
      "State/Province": "Kentucky",
      "Power Capacity (MW)": 150,
    },
    {
      "State/Province": "North Carolina",
      "Power Capacity (MW)": 104,
    },
    {
      "State/Province": "South Carolina",
      "Power Capacity (MW)": 44,
    },
    {
      "State/Province": "Georgia",
      "Power Capacity (MW)": 525,
    },
    {
      "State/Province": "Mississippi",
      "Power Capacity (MW)": 70,
    },
    {
      "State/Province": "Texas",
      "Power Capacity (MW)": 2717,
    },
    {
      "State/Province": "Washington",
      "Power Capacity (MW)": 30.5,
    },
    {
      "State/Province": "New York",
      "Power Capacity (MW)": 404,
    },
    {
      "State/Province": "Pennsylvania",
      "Power Capacity (MW)": 279,
    },
    {
      "State/Province": "Ohio",
      "Power Capacity (MW)": 82.5,
    },
    {
      "State/Province": "Nebraska",
      "Power Capacity (MW)": 100,
    },
    {
      "State/Province": "Tennessee",
      "Power Capacity (MW)": 141,
    },
  ];

  // Fetch US States GeoJSON data
  useEffect(() => {
    fetch(
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_lakes.geojson"
    )
      .then((response) => response.json())
      .then((data) => {
        // Add power capacity data to the GeoJSON
        const enhancedGeoJson = {
          ...data,
          features: data.features.map((feature) => {
            // Try to match state/province name
            const stateName = feature.properties.name;
            const stateData = miningData.find(
              (item) => item["State/Province"] === stateName
            );

            // Add power capacity to the feature properties if match found
            if (stateData) {
              return {
                ...feature,
                properties: {
                  ...feature.properties,
                  powerCapacity: stateData["Power Capacity (MW)"],
                },
              };
            }
            return feature;
          }),
        };
        setStateGeoJson(enhancedGeoJson);
      })
      .catch((error) => console.error("Error fetching state GeoJSON:", error));
  }, []);

  // Initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2h1YmhhbXZzIiwiYSI6ImNtOG9idnUxazAxM2EybXNjNWxnbWtma2kifQ.hnlDhCKz8NO_Ms5dsxbfMg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11", // Light style for better visibility of data
      center: [-98.5795, 39.8283],
      projection: { name: "albers" },
      zoom: 3.5,
      pitch: 0, // Make the map flat
      renderWorldCopies: false, // Prevents map from repeating
      maxBounds: [
        [-128, 25], // Southwest coordinates of USA
        [-66, 50], // Northeast coordinates of USA
      ], // Restrict to USA
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Add the choropleth layer when stateGeoJson changes
  useEffect(() => {
    if (!mapRef.current || !stateGeoJson) return;

    // Wait for map to load
    mapRef.current.on("load", () => {
      // Add the source
      if (!mapRef.current.getSource("states")) {
        mapRef.current.addSource("states", {
          type: "geojson",
          data: stateGeoJson,
        });

        // Add fill layer for states with mining data
        mapRef.current.addLayer({
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
        mapRef.current.addLayer({
          id: "state-borders",
          type: "line",
          source: "states",
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.5,
          },
        });

        // Add labels for states with power capacity
        mapRef.current.addLayer({
          id: "state-labels",
          type: "symbol",
          source: "states",
          filter: ["has", "powerCapacity"],
          layout: {
            "text-field": ["to-string", ["get", "powerCapacity"]],
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-size": 14,
            "text-allow-overlap": true,
            "text-ignore-placement": true,
          },
          paint: {
            "text-color": "#ffffff",
            "text-halo-color": "#000000",
            "text-halo-width": 1,
          },
        });

        // Add hover effect
        mapRef.current.on("mouseenter", "state-fills", () => {
          mapRef.current.getCanvas().style.cursor = "pointer";
        });

        mapRef.current.on("mouseleave", "state-fills", () => {
          mapRef.current.getCanvas().style.cursor = "";
        });

        // Add popups on click
        mapRef.current.on("click", "state-fills", (e) => {
          if (e.features.length > 0 && e.features[0].properties.powerCapacity) {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                `<div class="p-2">
                  <strong>${e.features[0].properties.name}</strong><br/>
                  Power Capacity: ${e.features[0].properties.powerCapacity} MW
                </div>`
              )
              .addTo(mapRef.current);
          }
        });
      }
    });

    // If map is already loaded, update the data
    if (mapRef.current.loaded() && mapRef.current.getSource("states")) {
      mapRef.current.getSource("states").setData(stateGeoJson);
    }
  }, [stateGeoJson]);

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <h1 className="text-2xl font-semibold mb-2">
        Operational Bitcoin Mining Power Capacity Distribution in North America
      </h1>
      <p className="text-gray-600 mb-6">
        Data sourced from 22 mining operators as of Q4'23 including their
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
            <div className="w-6 h-6 bg-blue-100"></div>
            <div className="w-6 h-6 bg-blue-200"></div>
            <div className="w-6 h-6 bg-blue-300"></div>
            <div className="w-6 h-6 bg-blue-400"></div>
            <div className="w-6 h-6 bg-blue-500"></div>
            <div className="w-6 h-6 bg-blue-600"></div>
            <div className="w-6 h-6 bg-blue-800"></div>
            <div className="ml-2 flex justify-between w-32 text-xs">
              <span>31</span>
              <span>2,717</span>
            </div>
          </div>
        </div>

        {/* Data Note */}
        <div className="text-xs text-gray-500 border-t pt-3">
          <p>
            Data represents operational Bitcoin mining capacity as of Q4 2023
          </p>
          <p>Source: SEC Filings; Press releases</p>
          <p className="mt-2">Map: TheMinerMap</p>
        </div>
      </div>
    </div>
  );
}
