import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { combinedReducers } from "./services/Common/combineReducers";
import { NotFound, App, $ProductOverview, $ProductView, $ShoppingCart, $Ordered } from "./components";

const store = createStore(combinedReducers, composeWithDevTools());
const routing = (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Products" component={$ProductOverview} />
                <Route path="/Product/:productId" component={$ProductView} />
                <Route path="/ShoppingCart" component={$ShoppingCart} />
                <Route path="/Ordered" component={$Ordered} />
                <Route component={NotFound} />
            </Switch>
        </HashRouter>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
