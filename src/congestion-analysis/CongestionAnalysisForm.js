import React from "react";
import { Subtitle } from "@citydna/common";
import {
  Slider,
  Typography,
  Box,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  LinearProgress
} from "@material-ui/core";
import { marks } from "./marks";

export const CongestionAnalysisForm = ({
  setHour,
  layer,
  setLayer,
  loading
}) => {
  return (
    <Box position="absolute" bottom={24} right={24} width={800} zIndex={1301}>
      <Paper>
        {loading && <LinearProgress />}
        <Box p={2}>
          <Subtitle
            primary="Pedestrian Congestion Analysis"
            secondary="Each street segment's pedestrian congestion is normalized against every other street segment for each respective hour"
          />
          <Typography variant="body1"> Data collected by DSpark </Typography>
          <RadioGroup
            row
            value={layer}
            onChange={e => setLayer(e.target.value)}
          >
            <FormControlLabel
              label="Weekday"
              control={<Radio value="FS_HourlyWeekdayDensityCBD_cityDNA" />}
            />
            <FormControlLabel
              label="Weekend"
              control={<Radio value="FS_HourlyWeekendDensityCBD_cityDNA" />}
            />
          </RadioGroup>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider-custom"
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={23}
            onChangeCommitted={(e, val) => setHour(val)}
          />
        </Box>
      </Paper>
    </Box>
  );
};
