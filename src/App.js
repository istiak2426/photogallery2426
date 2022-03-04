import './App.css';
import MainComponent from "./components/pages/main/MainComponent";
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import {myStore} from "../src/components/redux/store"

const App = () => {
  return (
        <div className='App'>

          <Provider store={myStore}>
            <BrowserRouter>
              <MainComponent />
            </BrowserRouter>
          </Provider>

        </div>
      );
};

export default App;