import {EXAMPLE} from "../../DATA_TYPE";

const initalState = {
    bag: []
};
export default function example(state = initalState, action) {
    switch(action.type) {
        case EXAMPLE:
            return Object.assign({}, state, {bag: action.payload.bag});
        default:
            return state;

    }
}
