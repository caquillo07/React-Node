import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Components
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

    /**
     * Life cycle hook called when the component is mounted/rendered on the screen.
     */
    componentDidMount() {
        console.log(this.props);
        this.props.fetchUser();
    }

    /**
     * Life cycle hook called when the component is ready to be mounted/rendered on the screen.
     * Note: This might be called multiple times before componentDidMount.
     */
    componentWillMount() { }

    /**
     * Life cycle hook called to render the component on the screen.
     * returns: the component to be rendered.
     */
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>

                        {/* We could also add this to the route "/", but since this is a regular Component we just add it
                        to the DOM like normal. */}
                        <Header />
                        <div className="container">
                            <Route exact={true} path="/" component={Landing} />
                            {/* just doing exact by itself is equivalent to exact={true}*/}
                            <Route exact path="/surveys" component={Dashboard}/>

                            {/* In this case we don't need the exact because /surveys is exact already, so it wont match it.
                            We will do it anyways just to be explicit */}
                            <Route exact path="/surveys/new" component={SurveyNew}/>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// TODO: Research this!
export default connect(null, actions)(App);