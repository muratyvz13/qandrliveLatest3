import {USER} from "../../DATA_TYPE";

const initalState = {
    info: {},
};
export default function user(state = initalState, action) {
    switch (action.type) {
        case USER:
            return Object.assign({}, state, {info: action.payload.info});
        default:
            return state;

    }
}

