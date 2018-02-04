import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                amount={500} // amount is in cents so 500 cents for 5 dollars
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                name="Emaily"
                description="$5 for 5 survey credits"
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);
