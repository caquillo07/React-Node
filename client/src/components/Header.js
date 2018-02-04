import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Payments from './Payments';

class Header extends Component {

    /**
     * Helper method to show the login button whether or not the user is logged
     */
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return [
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                ];
            default:
                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li key="3" style={{margin: '0 10px'}}>
                        Credits: {this.props.auth.credits || 0}
                    </li>,
                    <li key="2">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to={ this.props.auth ? '/surveys' : '/'}
                          className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}

/** The below code is equivalent to the code able. **/
// function mapStateToProps(state) {
//     return {
//         auth: state.auth
//     }
// }

export default connect(mapStateToProps)(Header);