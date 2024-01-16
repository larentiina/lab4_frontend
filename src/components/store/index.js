import {createStore, combineReducers, applyMiddleware} from "redux";

import {thunk} from "redux-thunk";
import {pointReducer} from "./pointReducer";
import {graphReducer} from "./graphReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    points: pointReducer,
    graph: graphReducer,
    user: authReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk))
