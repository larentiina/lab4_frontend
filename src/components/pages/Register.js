import {useNavigate} from "react-router-dom";

import {useReducer, useState} from "react";
import {request, setAuthHeader} from "../../asyncRequest/AxiosRequestHandler";
import {useDispatch} from "react-redux";
import {deleteUserAction, setUserAction} from "../store/authReducer";


export const Register=()=>{
    const navigate = useNavigate();
    const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
    const [ errorMessage, setErrorMessage ] = useState(null)
    const dispatch = useDispatch();
    const doRegister = () => {
        if (formData.userName.trim() === '' || formData.password.trim() === '') {
            setErrorMessage('Логин и пароль обязательны');
            return;
        }
        request(
            "POST",
            "/register",
            {
                login: formData.userName,
                password: formData.password
            }).then( response => {
                setAuthHeader(response.data.token);
                dispatch(setUserAction(response.data.token))
                navigate("/mainpage")
            }
            ).catch(
            (error) => {
                if (error.response) {
                    console.log('Код состояния:', error.response.status);
                    console.log('Сообщение об ошибке:', error.response.data.message);
                    setErrorMessage(error.response.data.message)
                }
                dispatch(deleteUserAction())
                setAuthHeader(null);
                navigate("/register")
            }
        );

    }

    return (
        <div className="page">
            <div className="form">
                <p>Register page</p>
                <div className="input">
                    <input value={formData.userName} required onChange={(e) => setFormData({userName: e.target.value}) } type="text"/>
                </div>
                <div className="input">
                    <input value={formData.password} required onChange={(e) => setFormData({password: e.target.value}) } type="password"/>
                </div>
                <div className="button">
                    <button onClick={doRegister}>Register</button>
                </div>
                {errorMessage ?
                    <div className="error">{errorMessage}</div>
                    : null }
            </div>
        </div>
    )

}
