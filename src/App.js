import React, { useEffect } from "react";
import { Theme, Header } from "@citydna/common";
import { SegmentAnalysis } from "./segment-analysis/SegmentAnalysis";
import { ParkingUtilisation } from "./parking-utilisation/ParkingUtilisation";
import { CongestionAnalysis } from "./congestion-analysis/CongestionAnalysis";
import { DeckGLMapboxMap, useUpdateViewport } from "@citydna/maps";
import { Switch, Route, Redirect } from "react-router-dom";
import { Menu } from "./Menu";

export default function App() {
  const { setViewport } = useUpdateViewport();

  useEffect(() => {
    setViewport({
      latitude: -37.812,
      longitude: 144.9631,
      zoom: 14
    });
  }, [setViewport]);

  return (
    <Theme>
      <Header left={<Menu />} />
      <Switch>
        <Route path="/congestion-analysis">
          <CongestionAnalysis />
        </Route>
        <Route path="/parking-utilisation">
          <ParkingUtilisation />
        </Route>
        <Route path="/segment-analysis">
          <SegmentAnalysis />
        </Route>
        <Redirect to="/congestion-analysis" />
      </Switch>
      <DeckGLMapboxMap
        width="100%"
        height="100vh"
        staticMapProps={{
          mapboxApiAccessToken:
            "pk.eyJ1IjoiZ2lzZmVlZGJhY2siLCJhIjoiY2s4cXh2N2YxMDh1aDNpcDJ6Ym9mY281NiJ9.OCDLj3paLS3Z1wUDK4_0OA"
        }}
      />
    </Theme>
  );
}
