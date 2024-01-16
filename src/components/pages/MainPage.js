import {Graph} from "../svg/Graph";
import {PointsForm} from "../structure/PointsForm";

import TablePoints from "../structure/TablePoints";
import {useEffect} from "react";
import {request} from "../../asyncRequest/AxiosRequestHandler";
import {addManyPointsAction} from "../store/pointReducer";
import {useDispatch} from "react-redux";
import {addManyPointOnGraphAction} from "../store/graphReducer";


export const MainPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllPoints=()=>{
            request(
                "GET",
                "/points",
                {}
            ).then(response => response.data)
                .then(json => {
                    dispatch(addManyPointsAction(json))
                    dispatch(addManyPointOnGraphAction(json.map(point=>({x:28*point.coordinateX+150,y:(28*point.coordinateY-150)*(-1)}))))
                    }

                )
        }
        getAllPoints();
    }, [dispatch]);

     return (
          <div className="page" id="main-page">

                  <span className="graph">
                 <Graph/>
                  </span>
                  <TablePoints/>
                  <PointsForm/>

          </div>
     )
}
