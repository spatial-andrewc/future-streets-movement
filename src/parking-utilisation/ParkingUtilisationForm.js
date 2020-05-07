import React from "react";

import { Subtitle } from "@citydna/common";
import { Box, Paper, LinearProgress } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export const ParkingUtilisationForm = ({ value, setValue, loading }) => {
  return (
    <Box position="absolute" top={124} left={25} zIndex={1301} maxWidth={300}>
      <Paper>
        {loading && <LinearProgress />}
        <Box p={2}>
          <Subtitle
            primary="Sensor Equipped Car Space Parking Analysis"
            secondary="This visualisation describes the average occupancy of car spaces in each street segment as compared against the average occupancy of all sensor equipped spaces in the CBD."
          />
          <FormControl component="fieldset">
            <RadioGroup value={value} onChange={e => setValue(e.target.value)}>
              <FormControlLabel
                control={<Radio value="FS_SegmentParkingUtilisation_weekday" />}
                label="Weekdays"
              />
              <FormControlLabel
                control={<Radio value="FS_SegmentParkingUtilisation_weekend" />}
                label="Weekends"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};
