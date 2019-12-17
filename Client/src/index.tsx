import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { combinedReducers } from "./services/Common/combineReducers";
import { NotFound, App, $AddSerie, $SeriesOverview, $Login, $VideoOverview, $AddVideo, $ViewVideo } from "./components";

const store = createStore(combinedReducers, composeWithDevTools());
const routing = (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Login" component={$Login} />
                <Route path="/SeriesOverview" component={$SeriesOverview} />
                <Route path="/AddSerie" component={$AddSerie} />
                <Route path="/VideoOverview/:seriesId" component={$VideoOverview} />
                <Route path="/AddVideo/:seriesId" component={$AddVideo} />
                <Route path="/ViewVideo/:videoId" component={$ViewVideo} />
                <Route component={NotFound} />
            </Switch>
        </HashRouter>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
