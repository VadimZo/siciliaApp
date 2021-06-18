//@ts-nocheck
import React from 'react';
import {Main} from "./components";
import {Switch,Route} from "react-router-dom";
import SineIn from "./pages/SineIn";
import SineUp from "./pages/SineUp";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "./store/ducks/user/actionCreators";
import {CircularProgress} from "@material-ui/core";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

function App() {
    const loadingStatus = useSelector(({userReducer})=>userReducer.status);
    const dispatch=useDispatch();
    React.useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    if(loadingStatus=='LOADING'){
        return(
            <div className="circular">
                <CircularProgress size="20" />
            </div>
        )
    }
    return (
      <>
          <Switch>
              <Route path="/" component={Main} exact/>
              <Route path="/sinein" component={SineIn} exact />
              <Route path="/sineup" component={SineUp} exact />
              <Route path="/profile" component={Profile} exact />
              <Route path="/cart" component={Cart} exact />
          </Switch>

      </>
  );
}

export default App;
