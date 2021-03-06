import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder) => {
    console.log('On Token Called!');
    console.log(res.id);
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id
      }
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id }
    });
  };
  render() {
    return (
      <User>
        {data =>
          data &&
          data.data &&
          data.data.me && (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(data.data.me.cart)}
                  name='Sick Fits'
                  description={`Order of ${totalItems(
                    data.data.me.cart
                  )} items!`}
                  image={
                    data.data.me.cart.length &&
                    data.data.me.cart[0].item &&
                    data.data.me.cart[0].item.image
                  }
                  stripeKey='pk_test_51GzjDYLpiLJLAAf3hxwkxQMnC3liJsOOy1bZ4VLlxfaPuQtfsyjkLq46zmkmx6h4lhAqpFdTTUDj4AptbrNdukjs00XLgwpioO'
                  currency='USD'
                  email={data.data.me.email}
                  token={res => this.onToken(res, createOrder)}>
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          )
        }
      </User>
    );
  }
}

export default TakeMyMoney;
