import React from "react";
import { STATUS_COLORS } from "../../constants";
import './OrderStyle.css';

const OrderItem = props => {
  function orderClick() {
    props.onClick(props.order);
  }

  return (
    <tr className="order-item-select-link" style={props.active ? { border: '2px solid yellow', backgroundColor: '#f0f79c' } : {}} onClick={orderClick}>
      <td>{props.order.order}</td>
      <td>{props.order.qty}</td>
      <td>{props.order.description}</td>
      {/* <td>{`${props.order.dimensions.width} x ${props.order.dimensions.height} (${props.order.dimensions.unit})`}</td> */}
      <td>{props.order.dimensions}</td>
      <td><i style={{ color: STATUS_COLORS[props.order.status] }} className='fas fa-circle' ></i> {props.order.status}</td>
      {/* <td>{props.order.version}</td> */}
    </tr>
  );
};

export default OrderItem;