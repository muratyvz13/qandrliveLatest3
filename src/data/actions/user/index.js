import {store} from '../../../store';
import {USER} from "../../DATA_TYPE";

export function set_user(info) {
    store.dispatch({
        type: USER,
        payload: {
            info
        }
    });
}
