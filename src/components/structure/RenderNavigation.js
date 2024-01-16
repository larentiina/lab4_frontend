import { Link, Route, Routes } from "react-router-dom";
import { nav } from "./Navigation";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAction} from "../store/authReducer";
import {setAuthHeader} from "../../asyncRequest/AxiosRequestHandler";



export const RenderRoutes = () => {

    const userIsAuth=useSelector(state=>state.user.isAuthenticated)
        return (
             <Routes>
             { nav.map((r, i) => {
                  if (r.isPrivate && userIsAuth) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else if (!r.isPrivate) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else return false
             })}

             </Routes>
        )
   }

   export const RenderMenu = () => {
        const logout =()=>{
            setAuthHeader(null)
            dispatch(deleteUserAction())
        }
       const userIsAuth=useSelector(state=>state.user.isAuthenticated)
       const user=useSelector(state=>state.user)
       console.log(userIsAuth)
       console.log(user)
       const dispatch = useDispatch()
        const MenuItem = ({r}) => {
             return (
                  <div className="menuItem"><Link to={r.path}>{r.name}</Link></div>
             )
        }
        return (
             <div className="menu">
                  { nav.map((r, i) => {

                       if (!r.isPrivate && r.isMenu) {
                            return (
                                 <MenuItem key={i} r={r}/>
                            )
                       } else if (userIsAuth && r.isMenu) {
                            return (
                                 <MenuItem key={i} r={r}/>
                            )
                       } else return false
                  } )}

                  { userIsAuth ?
                  <div className="menuItem"><Link to={'#'} onClick={logout}>Log out</Link></div>
                  :<>
                  <div className="menuItem"><Link to={'login'}>Log in</Link></div>
                      <div className="menuItem"><Link to={'register'}>Register</Link></div>
                      </>}
             </div>
        )
   }
