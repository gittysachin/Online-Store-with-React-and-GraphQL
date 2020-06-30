import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'react-apollo';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem, 0);
}

class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log('On Token Called!');
    console.log(res);
  };
  render() {
    return (
      <User>
        {data => (
          <StripeCheckout
            amount={calcTotalPrice(data.data.me.cart)}
            name='Sick Fits'
            description={`Order of ${totalItems(data.data.me.cart)} items!`}
            image={data.data.me.cart[0].item && data.data.me.cart[0].item.image}
            stripeKey='pk_test_51GzjDYLpiLJLAAf3hxwkxQMnC3liJsOOy1bZ4VLlxfaPuQtfsyjkLq46zmkmx6h4lhAqpFdTTUDj4AptbrNdukjs00XLgwpioO'
            currency='USD'
            email={data.data.me.email}
            token={res => this.onToken(res)}>
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default TakeMyMoney;
