import React from "react";
import OrderItem from "./OrderItem";

const OrderOverview = props => (
  <div>
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyItems: "center",
        alignItems: "center",
        marginBottom: "10px",
        marginLeft: "10px",
      }}
    >
      <i style={{ color: "red" }} className='fas fa-circle' ></i><span style={{ fontSize: "18px" }}>Review</span>
      <i style={{ color: "yellow" }} className='fas fa-circle' ></i><span style={{ fontSize: "18px" }}>Rework</span>
      <i style={{ color: "green" }} className='fas fa-circle' ></i><span style={{ fontSize: "18px" }}>Approved</span>
    </div>
    <h4 style={{ marginLeft: "10px" }} className="h4-style">
      <i className="fas fa-keyboard"></i> ORDER OVERVIEW
    </h4>
    <div
      style={{
        border: "10px solid #1c1c1c",
        maxHeight: "600px",
        borderRadius: "10px",
        overflow: "auto"
      }}
    >
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th
              className="table-header-text-style width-100"
              onClick={props.sortByOrder}
            >
              <div className="display-flex-th">
                ORDER{" "}
                {props.sort.orderUp === props.sort.orderDown && (
                  <i className="fas fa-sort"></i>
                )}
                {props.sort.orderUp && <i className="fas fa-sort-up"></i>}
                {props.sort.orderDown && <i className="fas fa-sort-down"></i>}
              </div>
            </th>
            <th
              className="table-header-text-style width-75"
              onClick={props.sortByQty}
            >
              <div className="display-flex-th">
                QTY{" "}
                {props.sort.qtyUp === props.sort.qtyDown && (
                  <i className="fas fa-sort"></i>
                )}
                {props.sort.qtyUp && <i className="fas fa-sort-up"></i>}
                {props.sort.qtyDown && <i className="fas fa-sort-down"></i>}
              </div>
            </th>
            <th
              className="table-header-text-style"
              onClick={props.sortByDescription}
            >
              <div className="display-flex-th">
                DESCRIPTION{" "}
                {props.sort.descriptionUp === props.sort.descriptionDown && (
                  <i className="fas fa-sort"></i>
                )}
                {props.sort.descriptionUp && <i className="fas fa-sort-up"></i>}
                {props.sort.descriptionDown && (
                  <i className="fas fa-sort-down"></i>
                )}
              </div>
            </th>
            <th
              className="table-header-text-style width-75"
              onClick={props.sortByDimensions}
            >
              <div className="display-flex-th">
                STATUS{" "}
                {props.sort.statusUp === props.sort.statusDown && (
                  <i className="fas fa-sort"></i>
                )}
                {props.sort.statusUp && <i className="fas fa-sort-up"></i>}
                {props.sort.statusDown && <i className="fas fa-sort-down"></i>}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            props.items === 'undefined' ? "" :
              props.items.map(item => (
                <OrderItem
                  key={item.order}
                  onClick={props.onClick}
                  order={item}
                  active={
                    props.selectedItem && props.selectedItem.order === item.order
                  }
                />
              ))
          }
        </tbody>
      </table>
    </div>
  </div >
);

export default OrderOverview;
