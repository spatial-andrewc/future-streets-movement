import React, { useState, useEffect } from "react";
import { CongestionAnalysisForm } from "./CongestionAnalysisForm";
import { CongestionAnalysisLegend } from "./CongestionAnalysisLegend";
import { useAgol } from "../useAgol";
import { useSnackbarError } from "@citydna/common";
import { useDeckGL } from "@citydna/maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import Color from "color";

import scaleCluster from "d3-scale-cluster";
// import Color from "color";

export const CongestionAnalysis = () => {
  const [hour, setHour] = useState(0);
  const [layer, setLayer] = useState("FS_HourlyWeekdayDensityCBD_cityDNA");

  const { data, loading, error } = useAgol({
    userId: "KGdHCCUjGBpOPPac",
    service: "Pedestrian_Hourly_Density_Measures_CBD",
    featureServer: layer,
    query: {
      where: "OBJECTID>0",
      outFields: "*",
      f: "geojson"
    }
  });

  useSnackbarError(error, "Error loading density data from AGOL");

  const [, setLayers] = useDeckGL();
  useEffect(() => {
    if (data) {
      const currentHour = `hour_${hour}`;
      const colorScale = setClusters(data, currentHour);
      setLayers([
        new GeoJsonLayer({
          id: "congestion",
          data,
          getFillColor: d => {
            const [r, g, b] = Color(colorScale(d.properties[currentHour]))
              .rgb()
              .array();
            return d.properties[currentHour] > 0 ? [r, g, b] : [r, g, b, 0];
          },
          updateTriggers: {
            getFillColor: [hour]
          },
          transitions: {
            getFillColor: { duration: 250 }
          },
          stroked: false,
          beforeId: "road-label-large"
        })
      ]);
    }
  }, [data, setLayers, hour]);

  return (
    <>
      <CongestionAnalysisForm
        setHour={setHour}
        layer={layer}
        setLayer={setLayer}
        loading={loading}
      />
      <CongestionAnalysisLegend />
    </>
  );
};

const setClusters = (data, current_hour) => {
  const domain = Array.from(data.features, x => x.properties[current_hour]);
  const new_set = [...new Set(domain)].sort();
  var scale = scaleCluster()
    .domain(new_set)
    .range([
      "#008850",
      "#F07B05",
      "#E50E56"
      // "#ffffcc",
      // "#fff1a9",
      // "#fee087",
      // "#fec966",
      // "#feab4b",
      // "#fd893c",
      // "#fa5c2e",
      // "#ec3023",
      // "#d31121",
      // "#af0225",
      // "#af0225"
    ]);
  return scale;
};
