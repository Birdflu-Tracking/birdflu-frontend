import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { Ref } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
type MapBoxType = {
  ref: HTMLDivElement;
  cords: { lat: number; long: number };
};
export const MapBox = ({ ref, cords }: MapBoxType): mapboxgl.Map => {
  //@ts-ignore
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicmh1dGlrcDMiLCJhIjoiY2tzeGdzMzVnMjlvZTMyb2Q5Z3JncHNhbyJ9.dyzZoCM1Te0UZ48pie2mPg";
  const map = new mapboxgl.Map({
    container: ref, // container ID
    style: "mapbox://styles/rhutikp3/clffci30v000i01o0bdvn1hs3", // style URL
    center: [cords.lat, cords.long],
    // pitch: 60, // pitch in degrees
    // bearing: 0, // bearing in degrees
    zoom: 16, // starting zoom
    // minZoom: 3.5,
    // maxZoom: 500,
  });
  return map;
};
