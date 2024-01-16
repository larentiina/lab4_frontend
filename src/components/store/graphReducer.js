const defaultState={
    R:5,
    pointsGraph:[]
}
const CHANGE_R = "CHANGE_R"
const ADD_POINT_GRAPH = "ADD_POINT_GRAPH"
const ADD_MANY_POINT_GRAPH = "ADD_MANY_POINT_GRAPH"
const DELETE_POINTS_GRAPH = "DELETE_POINT_GRAPH"

export const graphReducer =(state=defaultState,action)=> {
    switch (action.type) {
        case CHANGE_R:
            return {...state, R: action.payload}
        case ADD_POINT_GRAPH:
            return {...state, pointsGraph: [...state.pointsGraph, action.payload]}
        case ADD_MANY_POINT_GRAPH:
            return {...state, pointsGraph: action.payload}
        case DELETE_POINTS_GRAPH:
            return {...state, pointsGraph: []}
        default:
            return state
    }
}
    export const changeRAction = (payload)=>({type: CHANGE_R,payload})
    export const addPointOnGraphAction = (payload)=>({type: ADD_POINT_GRAPH,payload})
    export const addManyPointOnGraphAction = (payload)=>({type: ADD_MANY_POINT_GRAPH,payload})
    export const deleteAllPointsFromGraph = ()=>({type: DELETE_POINTS_GRAPH})

