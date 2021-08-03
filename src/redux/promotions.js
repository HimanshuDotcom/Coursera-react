import { PROMOTIONS } from '../shared/promotions';
import * as ActionTypes from './ActionTypes';

// export const Promotions = (state = PROMOTIONS, action) => {
//     switch(action.type) {
//         default :
//             return state;
//     }
// }

export const Promotions = (state = {
    promotions: [],
    isLoad: true,
    errMess: null
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROMOS :
            return {...state, promotions: action.payload}
        case ActionTypes.PROMOS_LOADING :
            return {...state, isLoad: true}
        case ActionTypes.PROMOS_FAILED :
            return {...state, errMess: action.payload, isLoad: false}
        default :
            return state;
    }
}
