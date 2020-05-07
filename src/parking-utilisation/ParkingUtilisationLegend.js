import React from "react";
import { Subtitle } from "@citydna/common";
import { LegendOrdinalNominal } from "@citydna/maps";
import { Box, Paper } from "@material-ui/core";

export const ParkingUtilisationLegend = () => {
  return (
    <Box position="absolute" right={24} top={124} zIndex={999}>
      <Paper>
        <Box p={2}>
          <Subtitle primary="Map Legend" />
          <LegendOrdinalNominal
            keysOrIntervals={[
              {
                id: 1,
                label: "Less usage",
                color: { hex: "#008850" }
              },
              {
                id: 2,
                label: "Neutral",
                color: { hex: "#F07B05" }
              },
              {
                id: 3,
                label: "More usage",
                color: { hex: "#E50E56" }
              }
            ]}
          />
        </Box>
      </Paper>
    </Box>
  );
};
