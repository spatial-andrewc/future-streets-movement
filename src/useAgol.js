import { useReducer, useEffect } from "react";
import qs from "query-string";

export const useAgol = ({ userId, service, featureServer, query }) => {
  const [state, dispatch] = useReducer(
    /** reducer function takes previous state, action and returns next state */
    (prev, action) => ({ ...prev, ...action }),
    /** initial state */
    { loading: false }
  );

  const queryString = qs.stringify(query);
  useEffect(() => {
    dispatch({ loading: true });
    fetch(
      `https://services1.arcgis.com/${userId}/arcgis/rest/services/${service}/FeatureServer/${featureServer}/query?${queryString}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) throw Error(res.error);
        return res;
      })
      .then(data => dispatch({ data }))
      .catch(error => dispatch({ error }))
      .finally(() => dispatch({ loading: false }));
  }, [userId, service, featureServer, queryString]);

  return state;
};
