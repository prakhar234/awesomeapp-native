import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE,
  SET_PLACES
} from "./actionTypes";

import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());

    fetch(
      "https://us-central1-awesome-places-1556196290114.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        console.log("Error !!! ", err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        const placeData = {
          name: placeName,
          location: location,
          image: { uri: parsedResponse.imageUrl }
        };

        return fetch(
          "https://awesome-places-1556196290114.firebaseio.com/places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch("https://awesome-places-1556196290114.firebaseio.com/places.json")
      .catch(err => {
        alert("Something went wrong. Please try again later. :(");
        console.log("Error!!!", err);
      })
      .then(res => res.json())
      .then(res => {
        const places = [];
        for (let key in res) {
          places.push({
            ...res[key],
            id: key
          });
        }
        dispatch(setPlaces(places));
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};

export const removePlace = key => {
  return dispatch => {
    fetch(
      "https://awesome-places-1556196290114.firebaseio.com/places.json",
      {
        method: "DELETE",
        
      }
    )
      .catch(err => {
        alert("Something went wrong. Please try again later. :(");
        console.log("Error!!!", err);
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(deletePlace(key));
      });
  };
};

export const selectPlace = key => {
  return {
    type: SELECT_PLACE,
    placeKey: key
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};
