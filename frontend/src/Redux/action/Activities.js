import axios from "axios";

 const url = "http://localhost:4000/";
//const url = "https://mytinerary-lee-backend.herokuapp.com/";

const activitiesActions = {
	findActivityFromItinerary: (id) => {
		return async (dispatch, getState) => {
			const res = await axios.get(url + `api/activities/itineraries/${id}`);
			// console.log(res);
			dispatch({
				type: "FIND_ACTIVITY_FROM_ITINERARY",
				payload: res.data.response,
			});
			return res;
		};
	},
};

export default activitiesActions;