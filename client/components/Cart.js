import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getCartThunk,
  //   checkoutThunk,
  //   updateCartThunk,
  //   removeProductThunk,
} from "../store/cart";

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCart(this.props.user.id);
  }
  render() {
    let cart = this.props.cart || {};
    console.log(this.props);

    function cartTotal(array) {
      let total = 0;
      for (let item of array) {
        total += item;
      }
      return total;
    }
    function priceDisplay(price) {
      const cents = String(price).slice(String(price).length - 2);
      const dollars = String(price).slice(0, String(price).length - 2);
      return `${dollars}.${cents}`;
    }

    return (
      <div>
        {cart.items && cart.items.length > 0 ? (
          <div>
            <h1>ORDER</h1>
            <button id="checkout-button" type="button">
              Checkout
            </button>
            {cart.items.map((item) => (
              <div key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <div>
                    <img
                      className="single-product"
                      src={item.imageURL}
                      alt="picture of soda"
                    />
                  </div>
                  <h3>{item.name}</h3>
                </Link>
                <h3>Qty: {item.cart.quantity}</h3>
                {item.cart.quantity > 1 && (
                  <button
                    id="less-quantity-button"
                    type="button"
                    // onClick={() =>
                    //   updateCart(this.props.user, item, -1)
                    // }
                  >
                    -
                  </button>
                )}{" "}
                <button
                  id="more-quantity-button"
                  type="button"
                  //   onClick={() =>
                  //     this.props.updateCart(this.props.user, item, 1)
                  //   }
                >
                  +
                </button>{" "}
                <button
                  id="remove-product-button"
                  type="button"
                  //   onClick={() =>
                  //     this.props.removeProduct(this.props.user, item)
                  //   }
                >
                  Remove
                </button>
                <h1>
                  Subtotal: ${priceDisplay(item.price * item.cart.quantity)}
                </h1>
              </div>
            ))}
            <div>
              <h1 id="total-cost">
                Total: $
                {priceDisplay(
                  cartTotal(
                    this.props.cart.products.map(
                      (item) => item.price * item.cart.quantity
                    )
                  )
                )}
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
  //   removeProduct: (user, product) => dispatch(removeProductThunk(user, product)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
