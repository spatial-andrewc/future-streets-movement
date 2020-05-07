import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

export const Menu = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Tabs
      value={location.pathname}
      onChange={(e, value) => history.push(value)}
    >
      <Tab value="/congestion-analysis" label="Congestion Analysis" />
      <Tab value="/parking-utilisation" label="Parking Utilisation" />
      <Tab value="/segment-analysis" label="Segment Analysis" />
    </Tabs>
  );
};
