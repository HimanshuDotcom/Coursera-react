import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

const initialState = {
    dishes: [],
    isLoading: true,
    errMsg: null,
}
export const Dishes = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES :
            return {...state, isLoading: false, dishes: action.payload};
        case ActionTypes.DISHES_LOADING :
            return {...state, isLoading: true};
        case ActionTypes.DISHES_FAILED :
            return {...state, isLoading: false, errMsg: action.payload}
        default :
            return state;
    }
}
