import * as Types from "../constants/ActionTypeTour";
import callApi from "../utils/ApiCaller";

export const actFetchToursReq = () => {
    return (dispatch) => {
        return callApi("tour/get-all-tour", "GET", null)
            .then(res => {
                dispatch(actFetchTours(res.data))
            })
    };
}

export const actFetchTours = (tours) => {
    return {
        type: Types.FECTH_TOURS,
        tours //tours : tours
    }
}

export const actAddTourReq = (tour) => {
    return dispatch => {
        return callApi("tour/add-tour", "POST", tour)
            .then((res) => {
                dispatch(actAddTour(res.data));
            })
    }
}

export const actAddTour = (tour) => {
    return {
        type: Types.ADD_TOURS,
        tour
    }
}

export const actDeleteTourReq = (id) => {
    return dispatch => {
        if (confirm("do you want delete tour")) { //eslint-disable-line
            return callApi(`tour/delete-tour/${id}`, "DELETE", null)
                .then((res) => {
                    dispatch(actDeleteTour(id));
                })
        }
    }
}

export const actDeleteTour = (id) => {
    return {
        type: Types.DELETE_TOURS,
        id
    }
}

export const actGetTourByIDReq = (tourID) => {
    return dispatch => {
        return callApi(`tour/get-tourid/${tourID}`, "GET", null)
            .then((res) => {
                dispatch(actGetTourByID(res.data))
            })
            .catch((err) => {
                console.log(err, '[err]');
            })
    }
}

export const actGetTourByID = (tour) => {
    return {
        type: Types.GET_TOUR_BY_ID,
        tour
    }
}

export const actEditTourReq = (tour) => {
    return dispatch => {
        return callApi(`tour/update-tour/${tour._id}`, "PUT", tour)
            .then((res) => {
                dispatch(actEditTour(res.data));
            })
    }
}

export const actEditTour = (tour) => {
    return {
        type: Types.UPDATE_TOURS,
        tour
    }
}