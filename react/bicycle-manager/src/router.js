import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Login from "./pages/Login";
import Buttons from "./pages/Ui/buttons";
import NoMatch from './pages/NoMatch'
import Modals from "./pages/Ui/modals";
import Loading from "./pages/Ui/loading";
import Notice from "./pages/Ui/notice";
import Message from "./pages/Ui/message";
import Tab from "./pages/Ui/tabs";
import Gallery from "./pages/Ui/gallery";
import Carousel from "./pages/Ui/carousel";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";

export default class IRouter extends React.Component {

  render() {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login}/>
          <Route path='/admin' render={() => {
            return <Admin>
              <Switch>
                <Route path='/admin/ui/buttons' component={Buttons}/>
                <Route path='/admin/ui/modals' component={Modals}/>
                <Route path='/admin/ui/loadings' component={Loading}/>
                <Route path='/admin/ui/notification' component={Notice}/>
                <Route path='/admin/ui/messages' component={Message}/>
                <Route path='/admin/ui/tabs' component={Tab}/>
                <Route path='/admin/ui/gallery' component={Gallery}/>
                <Route path='/admin/ui/carousel' component={Carousel}/>
                <Route path='/admin/form/login' component={FormLogin}/>
                <Route path='/admin/form/reg' component={FormRegister}/>
                <Route component={NoMatch}/>
              </Switch>
            </Admin>
          }}/>
          <Route path='/order/detail' component={Login}/>
        </App>
      </HashRouter>
    )
  }

}
