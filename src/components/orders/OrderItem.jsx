import React from "react";
import { STATUS_COLORS } from "../../constants";
import './OrderStyle.css';

const OrderItem = props => {
  function orderClick() {
    props.onClick(props.order);
  }

  return (
    <tr className="order-item-select-link table-body-text-style" style={props.active ? { border: '2px solid yellow', backgroundColor: '#f0f79c' } : {}} onClick={orderClick}>
      <td>{props.order.order}</td>
      <td>{props.order.qty}</td>
      <td>{props.order.description}</td>
      <td style={{ textAlign: 'center' }}><i style={{ color: STATUS_COLORS[props.order.status] }} className='fas fa-circle' ></i></td>
    </tr>
  );
};

export default OrderItem;