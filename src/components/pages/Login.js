import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {request, setAuthHeader} from "../../asyncRequest/AxiosRequestHandler";
import {useDispatch} from "react-redux";
import {deleteUserAction, setUserAction} from "../store/authReducer";

export const Login = () => {

     const navigate = useNavigate();
     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)
    const dispatch = useDispatch();

     const doLogin = () => {
         if (formData.userName.trim() === '' || formData.password.trim() === '') {
             setErrorMessage('Логин и пароль обязательны');
             return;
         }
          request(
              "POST",
              "/login",
              {
                   login: formData.userName,
                   password: formData.password
              }).then(
              (response) => {
                   setAuthHeader(response.data.token);
                  dispatch(setUserAction(response.data.token))
                   navigate("/mainpage")
              }).catch(
              (error) => {
                  if (error.response) {
                      console.log('Код состояния:', error.response.status);
                      console.log('Сообщение об ошибке:', error.response.data.message);
                      setErrorMessage(error.response.data.message)
                  }
                   setAuthHeader(null);
                  dispatch(deleteUserAction())
                   navigate("/login")
              }
          )

     }

     return (
          <div className="page">
               <div className="form">
                   <p>Login</p>
                    <div className="input">
                         <input value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) } type="text" required />
                    </div>
                    <div className="input">
                         <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password" required />
                    </div>
                    <div className="button">
                         <button onClick={doLogin}>Log in</button>
                    </div>
                    {errorMessage ?
                    <div className="error">{errorMessage}</div>
                    : null }
               </div>
          </div>
     )
}
