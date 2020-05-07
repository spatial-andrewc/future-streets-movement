import React from "react";
import { Subtitle } from "@citydna/common";
import { LegendScale } from "@citydna/maps";
import { Box, Paper } from "@material-ui/core";

const keys = [
  { id: "1", label: "0%", color: { hex: "#008850" } },
  { id: "2", label: "50%", color: { hex: "#F07B05" } },
  { id: "3", label: "100%", color: { hex: "#E50E56" } }
];

export const CongestionAnalysisLegend = () => {
  return (
    <Box position="absolute" width={250} top={124} right={24} zIndex={1301}>
      <Paper>
        <Box p={2}>
          <Subtitle primary="Map Legend" />
          <br />
          <LegendScale keysOrIntervals={keys} />
        </Box>
      </Paper>
    </Box>
  );
};
