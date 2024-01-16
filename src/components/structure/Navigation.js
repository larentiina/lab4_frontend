
import { Login } from "../pages/Login"
import { MainPage } from "../pages/MainPage"
import {Register} from "../pages/Register";

export const nav = [
     { path:     "/",         name: "Login",        element:  <Login />,       isMenu: false,     isPrivate: false  },
     { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
     { path:     "/register",    name: "Register",       element: <Register />,      isMenu: false,    isPrivate: false  },
     { path:     "/mainpage",  name: "Main Page",     element: <MainPage />,    isMenu: true,     isPrivate: true  },
]
