import React from "react";

import { Subtitle } from "@citydna/common";
import { Box, Paper, LinearProgress } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { labelMap } from "./SegmentAnalysisLegend";

export const SegmentAnalysisForm = ({ value, loading, handleChange }) => {
  return (
    <Box position="absolute" top={124} left={25} zIndex={1301} maxWidth={300}>
      <Paper>
        {loading && <LinearProgress />}
        <Box p={2}>
          <Subtitle
            primary="Street Segment Area Analysis"
            secondary="This visualisation describes the area percentage breakdown of street segments within the CBD."
          />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="streets"
              name="streets"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="CARRIAGEWAYAREAPERCENT"
                control={<Radio />}
                label={labelMap.CARRIAGEWAYAREAPERCENT}
              />
              <FormControlLabel
                value="FOOTPATHAREAPERCENT"
                control={<Radio />}
                label={labelMap.FOOTPATHAREAPERCENT}
              />
              <FormControlLabel
                value="OTHERAREAPERCENTAGE"
                control={<Radio />}
                label={labelMap.OTHERAREAPERCENTAGE}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};
