import { BrowserRouter } from 'react-router-dom';
import './App.css';

import {RenderHeader} from "./components/structure/Header";
import {RenderMenu, RenderRoutes} from "./components/structure/RenderNavigation";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <>
              <RenderHeader />
              <RenderMenu />
              <RenderRoutes />
          </>
      </BrowserRouter>
    </div>
  );
}

export default App;
