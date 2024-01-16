import {useDispatch} from "react-redux";
import { addPointAction, removeAllPointsAction} from "../store/pointReducer";
import {request} from "../../asyncRequest/AxiosRequestHandler";
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Input from "@mui/material/Input";
import * as React from 'react';
import FormHelperText from "@mui/material/FormHelperText"

import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import {addPointOnGraphAction, changeRAction, deleteAllPointsFromGraph} from "../store/graphReducer";


export const PointsForm =()=>{
    const dispatch = useDispatch()

    const [coordinateX,setCoordinateX] = React.useState('-5');
    const handleCoordinateX = (event,newX) =>{
        setCoordinateX(newX)
    }
    const [scaleR,setScaleR] = React.useState('-5');
    const handleScaleR = (event,newR) =>{
        setScaleR(newR)
        dispatch(changeRAction(Math.abs(newR)))
    }
    const [coordinateY,setCoordinateY] = React.useState("");
    const [selectBool, setSelectBool] = useState(false);
    const [helperText, setHelperText] = useState("")
    const submitForm =()=>{
        if(!selectBool) {
            addPoint();
        }else { setHelperText("Это обязательное поле")}
    }
    const onHandleChange = (e) => {
       const y =e.target.value
        setCoordinateY(e.target.value);
        if(y.length === 0){
            setSelectBool(true)
            setHelperText(
                "Это обязательное поле")
        }
        else if (y <= -5 || y >= 3) {

            setSelectBool(true)
            setHelperText("Координата должна быть в диапазоне (-5..3)")
        }
        else {

            setSelectBool(false)
            setHelperText(
                "")
        }
    };
    const addPoint=() => {
        console.log(coordinateY,coordinateX,Math.abs(scaleR))
        request(
            "POST",
            "/points",
            {
                coordinateX:coordinateX,
                coordinateY:coordinateY,
                scaleR:Math.abs(scaleR),
            }).then((point)=>{dispatch(addPointAction(point.data))
            const x=(point.data.coordinateX)*28+150;
                const y =-1*(point.data.coordinateY)*28+150;
            dispatch(addPointOnGraphAction({x,y}))
            console.log(x,y)
            }
        )
    }

    const removeAllPoints=()=>{

        request(
            "DELETE",
            "/points",
            {}
        ).then(()=>{
            dispatch(removeAllPointsAction());
            dispatch(deleteAllPointsFromGraph())
        })


    }
    return (
        <div className="page">

            <div className="form" id="points-form">
                <p>Введите координаты</p>
                <div>
                   <span className="label">Координата X:</span>
                <ToggleButtonGroup
                    value={coordinateX}
                    exclusive
                    onChange={handleCoordinateX}
                    sx={{backgroundColor:'rgb(112,84,232)', color:'white' }}
                    >
                        <ToggleButton  sx={{color:'white'}} value="-5">-5</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-4">-4</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-3">-3</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-2">-2</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-1">-1</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="0">0</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="1">1</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="2">2</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="3">3</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div>
                    <span  className="label">Координата Y:</span>
                    <FormControl>
                        <Input
                           placeholder="(-5...3)"
                           type="number"
                           id="input-y"
                           value={coordinateY}
                           onChange={onHandleChange}
                    />
                    <FormHelperText id="y-helper" error={selectBool}>
                        {helperText}
                    </FormHelperText>
                    </FormControl>
                </div>
                <div>
                   <span className="label">Радиус R:</span>
                    <ToggleButtonGroup
                        value={scaleR}
                        exclusive
                        onChange={handleScaleR}
                        sx={{backgroundColor:'rgb(112,84,232)', marginLeft:6}}
                    >
                        <ToggleButton sx={{color:'white'}} value="-5">-5</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-4">-4</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-3">-3</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-2">-2</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="-1">-1</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="0">0</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="1">1</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="2">2</ToggleButton>
                        <ToggleButton  sx={{color:'white'}} value="3">3</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="button">
                    <button onClick={submitForm}>Send</button>
                </div>
                <div className="button">
                    <button onClick={removeAllPoints}>Delete</button>
                </div>
            </div>

        </div>

    )



}
