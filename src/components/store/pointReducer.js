

const defaultState={
    points: []

}
const ADD_POINT = "ADD_POINT"
const REMOVE_POINT = "REMOVE_POINT"
const ADD_MANY_POINTS ="ADD_MANY_POINTS"
const REMOVE_ALL_POINTS = "REMOVE_ALL_POINTS"

export const pointReducer =(state = defaultState,action) =>{

    switch (action.type){
        case ADD_MANY_POINTS:
            return {...state,points: action.payload}
        case ADD_POINT:
            return {...state,points: [...state.points,action.payload]}
        case REMOVE_POINT:
            return  {...state,points: state.points.filter(point=>point.id!==action.payload)}
        case REMOVE_ALL_POINTS:
            return  {...state,points: []}
        default:
            return state

    }
}
export const addPointAction = (payload)=>({type: ADD_POINT,payload})
export const removePointAction = (payload)=>({type: REMOVE_POINT,payload})
export const addManyPointsAction = (payload)=>({type: ADD_MANY_POINTS,payload})
export const removeAllPointsAction = ()=>({type: REMOVE_ALL_POINTS})
