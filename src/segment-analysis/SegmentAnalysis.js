import React, { useState, useEffect } from "react";

import { useSnackbarError } from "@citydna/common";

import { useDeckGL } from "@citydna/maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import interpolate from "color-interpolate";
import Color from "color";
import { useAgol } from "../useAgol";

import { SegmentAnalysisLegend } from "./SegmentAnalysisLegend";
import { SegmentAnalysisForm } from "./SegmentAnalysisForm";

export const SegmentAnalysis = () => {
  const [value, setValue] = useState("CARRIAGEWAYAREAPERCENT");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const { data, loading, error } = useAgol({
    userId: "KGdHCCUjGBpOPPac",
    service: "FS_SegmentAreaBreakdown",
    featureServer: "0",
    query: {
      where: "OBJECTID>0",
      outFields: "*",
      f: "geojson"
    }
  });

  useSnackbarError(error, "There was an error hitting AGOL");

  const [, setLayers] = useDeckGL();
  useEffect(() => {
    const colormap = interpolate(["#008850", "#F07B05", "#E50E56"]);
    setLayers([
      new GeoJsonLayer({
        id: "segment-area-breakdown",
        data,
        getLineWidth: 0,
        getFillColor: d =>
          Color(colormap(d.properties[value]))
            .rgb()
            .array(),
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
      <SegmentAnalysisLegend value={value} />
      <SegmentAnalysisForm
        value={value}
        loading={loading}
        handleChange={handleChange}
      />
    </>
  );
};
