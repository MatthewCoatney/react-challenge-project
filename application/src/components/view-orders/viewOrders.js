import React, { Component } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import "./viewOrders.css";

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      ordered_by: "",
      editing: "",
      editing_id: "",
      editing_quantity: "0",
    };
  }

  componentDidMount() {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ orders: response.orders });
        } else {
          console.log("Error getting orders");
        }
      });
  }

  changeQuantity(event) {
    this.setState({ editing_quantity: event.target.value });
  }

  menuItemChosen(event) {
    this.setState({ editing: event.target.value });
  }

  cancelEdit() {
    this.setState({
      editing: "Select A Menu Item",
      editing_id: "",
      editing_quantity: "0",
      edited_by: "",
    });
  }

  edit(order) {
    this.setState({
      editing: order.order_item,
      editing_id: order._id,
      ordered_by: order.ordered_by,
    });
  }

  async getIndex(id) {
    return this.state.orders.findIndex((ord) => ord._id === id);
  }

  removeOrder(id) {
    this.setState({
      orders: this.state.orders.filter(function (order) {
        return order._id !== id;
      }),
    });
  }

  updateOrder(id) {
    if (id === "") return;
    fetch(EDIT_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        order_item: this.state.editing,
        quantity: this.state.editing_quantity,
        ordered_by: this.state.ordered_by,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success", JSON.stringify(response));
        window.location.reload();
      })
      .catch((error) => console.error(error));

    this.cancelEdit();
  }

  deleteOrder(id) {
    if (id === "") return;
    fetch(DELETE_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success", JSON.stringify(response));
        this.removeOrder(id);
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <Template>
        <div className="container-fluid">
          {this.state.orders.map((order) => {
            const createdDate = new Date(order.createdAt);
            return (
              <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                  {this.state.editing && this.state.editing_id === order._id ? (
                    <React.Fragment>
                      <label className="form-label">I'd like to order...</label>
                      <br />
                      <select
                        value={this.state.editing}
                        onChange={(event) => this.menuItemChosen(event)}
                        className="menu-select"
                      >
                        <option value="" defaultValue disabled hidden>
                          Lunch menu
                        </option>
                        <option value="Soup of the Day">Soup of the Day</option>
                        <option value="Linguini With White Wine Sauce">
                          Linguini With White Wine Sauce
                        </option>
                        <option value="Eggplant and Mushroom Panini">
                          Eggplant and Mushroom Panini
                        </option>
                        <option value="Chili Con Carne">Chili Con Carne</option>
                      </select>
                      <br />
                    </React.Fragment>
                  ) : (
                    <h2>{order.order_item}</h2>
                  )}

                  <p>Ordered by: {order.ordered_by || ""}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                  <p>Order placed at {createdDate.toLocaleTimeString()} </p>

                  {this.state.editing && this.state.editing_id === order._id ? (
                    <input
                      name="quantity"
                      type="text"
                      defaultValue={this.state.editing_quantity}
                      onChange={(event) => this.changeQuantity(event)}
                      ref="0"
                    />
                  ) : (
                    <p>Quantity: {order.quantity}</p>
                  )}
                </div>
                <div className="col-md-4 view-order-right-col">
                  {this.state.editing && this.state.editing_id === order._id ? (
                    <React.Fragment>
                      <button
                        type="button"
                        onClick={() => this.cancelEdit()}
                        className="btn btn-success"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => this.updateOrder(order._id)}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </React.Fragment>
                  ) : (
                    <button
                      type="button"
                      onClick={() => this.edit(order)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => this.deleteOrder(order._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Template>
    );
  }
}

export default ViewOrders;
