import { Ref, useEffect, useRef, useState } from "react";
import { MapBox } from "@/config/mapbox.config";
import { renderToString } from "react-dom/server";
import mapboxgl from "mapbox-gl";
type MapProps = {
  // locations: { cords: mapboxgl.LngLatLike; rcl: number }[];
  setMapBox?: (mapBox: any) => void;
};
const Map: React.FC<MapProps> = ({ setMapBox }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>();
  useEffect(() => {
    if (map.current) return;

    map.current = MapBox({
      //@ts-ignore
      ref: mapContainerRef.current,
      cords: {
        //@ts-ignore
        lat: 73.7947491,
        //@ts-ignore
        long: 15.5949654,
      },
    })
    if (setMapBox) {
      setMapBox(map.current);
    }
  });
  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="absolute h-full w-full "></div>
      {/* <button
        className="absolute z-10 right-5 bottom-28 sm:right-5 sm:bottom-[90%] bg-white/50 p-1 rounded-lg shadow backdrop-blur-md"
        onClick={() =>
          map.current.flyTo({
            center: [
              //@ts-ignore
              locations[0].cords[0],
              //@ts-ignore
              locations[0].cords[1],
            ],
            zoom: 16, // starting zoom
            essenstial: true,
          })
        }
      >
      </button> */}
    </div>
  );
};

export default Map;
