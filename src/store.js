import { applyMiddleware, compose, createStore } from 'redux'
import {history} from "./history";

import reducersCombined from './data/reducers';
import {routerMiddleware} from "connected-react-router";
//  createRootReducer(history),
export const store = createStore(
    reducersCombined(history),
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...
        )
    )
);
