"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export default function Heatmap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const toGeoCode = [
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

  const [mapData, setMapData] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let geocodeobj = {};
      let geocode = await Promise.all(
        toGeoCode.map(async (i) => {
          let getCoord = await fetch(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${
              i["State/Province"] + ", United States"
            }&access_token=pk.eyJ1Ijoic2h1YmhhbXZzIiwiYSI6ImNtOG9idnUxazAxM2EybXNjNWxnbWtma2kifQ.hnlDhCKz8NO_Ms5dsxbfMg`
          ).then((res) => res.json());
          let getCorrectCoord = getCoord.features.filter((i) => {
            if (i.properties.feature_type == "region") return i;
          });
          geocodeobj[i["State/Province"]] = getCorrectCoord;
          return getCorrectCoord;
        })
      );
      setMapData(geocode);
    })();
  }, []);

  // Initialize map when component mounts
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2h1YmhhbXZzIiwiYSI6ImNtOG9idnUxazAxM2EybXNjNWxnbWtma2kifQ.hnlDhCKz8NO_Ms5dsxbfMg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-98.5795, 39.8283],
      projection: { name: "albers" },
      zoom: 3,
      pitch: 0, // Make the map flat

      renderWorldCopies: false, // Prevents map from repeating
      maxBounds: [
        [-128, 25], // Southwest coordinates of USA
        [-66, 50], // Northeast coordinates of USA
      ], // Restrict to USA
    });
    mapRef.current.on("style.load", () => {
      mapRef.current.setTerrain(null);
      mapRef.current.setFog({});
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // Remove all markers
      markers.forEach((marker) => marker.remove());
    };
  }, []);

  // Add markers when mapData changes
  useEffect(() => {
    if (!mapRef.current || mapData.length === 0) return;

    // Remove existing markers
    markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    mapData.forEach((location, index) => {
      if (location.length) {
        const coordinates = location[0].geometry.coordinates;
        const stateData = toGeoCode.find(
          (item) => item["State/Province"] === location[0].properties.name
        );

        if (stateData) {
          // Create marker element
          const el = document.createElement("div");
          el.className = "marker-container";
          el.innerHTML = `
          <div class="relative flex flex-col items-center">
  <div class="bg-white text-xs sm:text-sm font-semibold px-1 rounded mb-1 whitespace-nowrap">
    ${location[0].properties.name}
  </div>
  <div class="bg-blue-600 text-white font-bold rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg text-xs sm:text-base">
    ${stateData["Power Capacity (MW)"]}
  </div>
</div>
          `;

          const marker = new mapboxgl.Marker({
            element: el,
          })
            .setLngLat(coordinates)
            .addTo(mapRef.current);

          // Add popup on click
          el.addEventListener("click", () => {
            new mapboxgl.Popup({ offset: 25 })
              .setLngLat(coordinates)
              .setHTML(
                `
                <div class="p-2">
                  <strong>${location[0].properties.name}</strong><br/>
                  Power Capacity: ${stateData["Power Capacity (MW)"]} MW<br/>
                  Count: ${stateData["Count"]}
                </div>
              `
              )
              .addTo(mapRef.current);
          });

          newMarkers.push(marker);
        }
      }
    });

    setMarkers(newMarkers);
  }, [mapData]);

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <h1 className="text-lg font-semibold">Bitcoin Mining Heatmap</h1>
      <div className="flex justify-center items-center m-10">
        <div ref={mapContainerRef} className="w-[90vw] h-[500px]" />
      </div>
    </div>
  );
}
