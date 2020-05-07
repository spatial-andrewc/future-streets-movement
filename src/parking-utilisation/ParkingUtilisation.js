import React, { useState, useEffect } from "react";

import { useSnackbarError } from "@citydna/common";

import { useDeckGL } from "@citydna/maps";
import { GeoJsonLayer } from "@deck.gl/layers";

import { useAgol } from "../useAgol";

import { ParkingUtilisationLegend } from "./ParkingUtilisationLegend";
import { ParkingUtilisationForm } from "./ParkingUtilisationForm";

const getFillColor = d => {
  if (d.properties.Utilisation === "positive") {
    return [229, 14, 86];
  } else if (d.properties.Utilisation === "negative") {
    return [0, 136, 80];
  } else if (d.properties.Utilisation === "moderate") {
    return [240, 123, 5];
  }
};

export const ParkingUtilisation = () => {
  const [value, setValue] = useState("FS_SegmentParkingUtilisation_weekday");

  const { data, loading, error } = useAgol({
    userId: "KGdHCCUjGBpOPPac",
    service: "Street_Segment_Parking_Utilisation",
    featureServer: value,
    query: {
      where: "OBJECTID>0",
      outFields: "*",
      f: "geojson"
    }
  });

  useSnackbarError(error, "There was an error hitting AGOL");

  const [, setLayers] = useDeckGL();
  useEffect(() => {
    setLayers([
      new GeoJsonLayer({
        id: "parking-analysis",
        data,
        getFillColor,
        getLineWidth: 0,
        updateTriggers: {
          getFillColor: [value]
        },
        transitions: {
          getFillColor: { duration: 250 }
        },
        beforeId: "road-label-large",
        pickable: true
      })
    ]);
  }, [data, value, setLayers]);

  return (
    <>
      <ParkingUtilisationLegend value={value} />
      <ParkingUtilisationForm
        value={value}
        loading={loading}
        setValue={setValue}
      />
    </>
  );
};
