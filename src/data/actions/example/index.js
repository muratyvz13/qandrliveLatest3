import {store} from '../../../store';
import {EXAMPLE} from "../../DATA_TYPE";

export function set_basket(bag) {
    store.dispatch({
        type: EXAMPLE,
        payload: {
            bag
        }
    });
}
