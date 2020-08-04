import * as React from "react";
import {HashRouter, Route} from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Login from "./pages/login";
import {Button} from "antd";
import NoMatch from "./pages/noMatch";

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login}/>
          <Route path='/admin' render={() => (
            <Admin>
              <Route path='/admin/ui/buttons' component={Button}/>
              <Route component={NoMatch}/>
            </Admin>
          )}/>

        </App>
      </HashRouter>
    )
  }
}
