import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import example from './example';
import user from './user';


const createRootReducer = (history) => combineReducers({
    example,
    user,
    router: connectRouter(history)
});
export default createRootReducer
