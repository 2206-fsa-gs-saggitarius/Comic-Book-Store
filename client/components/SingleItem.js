import React from "react";
import { singleItem } from "../store/singleItem";
import { connect } from "react-redux";
// import { updateCartThunk } from "../store/cart";
import { sendItemThunk } from "../store/cart";
function dogs() {
  return;
}
class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }
  async componentDidMount() {
    await this.props.singleItem(this.props.match.params.id);
  }
  async addToCart(user, item, quantity) {
    await this.props.addToCart(user, item, quantity);
  }

  render() {
    let item = this.props.item || {};

    return (
      <div>
        <img src={item.imageUrl} />
        <div>{item.name}</div>
        <div>{item.price}</div>
        <button onClick={() => this.addToCart(this.props.user, item, 1)}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return { item: reduxState.singleItem, user: reduxState.auth };
};
const mapDispatch = (dispatch) => {
  return {
    singleItem: (id) => dispatch(singleItem(id)),
    addToCart: (user, item, quantity) =>
      dispatch(sendItemThunk(user, item, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
