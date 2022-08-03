import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  getCartThunk,
  //   checkoutThunk,
  //   updateCartThunk,
  deleteCartItemThunk,
} from '../store/cart';

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCart(this.props.user.id);
  }
  render() {
    let cart = this.props.cart || {};
    console.log(this.props);
    return (
      <div>
        {cart.items && cart.items.length > 0 ? (
          <div>
            <h1>ORDER</h1>
            <button id='checkout-button' type='button'>
              Checkout
            </button>
            {cart.items.map((item) => (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <div>
                    <img
                      className='single-product'
                      src={item.imageURL}
                      alt='comic book cover'
                    />
                  </div>
                  <h3>{item.name}</h3>
                </Link>
                <h3>Qty: {item.cart.quantity}</h3>
                {item.cart.quantity > 1 && (
                  <button
                    id='decrement-item-quantity-button'
                    type='button'
                    // onClick={() =>
                    //   updateCart(this.props.user, item, -1)
                    // }
                  >
                    -
                  </button>
                )}{' '}
                <button
                  id='increment-item-quantity-button'
                  type='button'
                  //   onClick={() =>
                  //     this.props.updateCart(this.props.user, item, 1)
                  //   }
                >
                  +
                </button>{' '}
                <button
                  id='delete-item-button'
                  type='button'
                  onClick={() =>
                    this.props.deleteCartItem(this.props.user, item)
                  }
                >
                  Delete Item
                </button>
                <h1>
                  {/*  Subtotal: ${displayPrice(item.price * item.cart.quantity)*/}
                </h1>
              </div>
            ))}
            <div>
              <h1 id='total-cost'>
                Total: $
                {/* displayPrice(
                //   totalCost(
                //     this.props.cart.products.map(
                //       (item) => item.price * item.cart.quantity
                //     )
                //   )
                // )*/}
              </h1>
            </div>
          </div>
        ) : (
          <h1>Nothing in your cart!</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  isLoggedIn: !!state.auth.id,
  user: state.auth,
  cart: state.cartReducer,
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(getCartThunk(userId)),
  //   checkoutThunk: (userId) => dispatch(checkoutThunk(userId)),
  //   updateCart: (user, product, quantityChange) =>
  //     dispatch(updateCartThunk(user, product, quantityChange)),
  deleteCartItem: (user, item) => dispatch(deleteCartItemThunk(user, item)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
