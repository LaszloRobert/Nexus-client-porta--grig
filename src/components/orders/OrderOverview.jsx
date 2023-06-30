import React from "react";
import OrderItem from "./OrderItem";

const OrderOverview = props => (
  <div>
    <h4 style={{ marginLeft: "10px" }}>
      <i className="fas fa-keyboard"></i> ORDER OVERVIEW
    </h4>
    <div
      style={{
        border: "10px solid #1c1c1c",
        borderRadius: "10px",
        overflow: "auto"
      }}
    >
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th
              style={{
                cursor: "pointer",
                fontSize: "14px",
                userSelect: "none"
              }}
              width="100px"
              onClick={props.sortByOrder}
            >
              ORDER{" "}
              {props.sort.orderUp === props.sort.orderDown && (
                <i className="fas fa-sort"></i>
              )}
              {props.sort.orderUp && <i className="fas fa-sort-up"></i>}
              {props.sort.orderDown && <i className="fas fa-sort-down"></i>}
            </th>
            <th
              style={{
                cursor: "pointer",
                fontSize: "14px",
                userSelect: "none"
              }}
              width="75px"
              onClick={props.sortByQty}
            >
              QTY{" "}
              {props.sort.qtyUp === props.sort.qtyDown && (
                <i className="fas fa-sort"></i>
              )}
              {props.sort.qtyUp && <i className="fas fa-sort-up"></i>}
              {props.sort.qtyDown && <i className="fas fa-sort-down"></i>}
            </th>
            <th
              style={{
                cursor: "pointer",
                fontSize: "14px",
                userSelect: "none"
              }}
              width="150px"
              onClick={props.sortByDescription}
            >
              DESCRIPTION{" "}
              {props.sort.descriptionUp === props.sort.descriptionDown && (
                <i className="fas fa-sort"></i>
              )}
              {props.sort.descriptionUp && <i className="fas fa-sort-up"></i>}
              {props.sort.descriptionDown && (
                <i className="fas fa-sort-down"></i>
              )}
            </th>
            <th
              style={{
                cursor: "pointer",
                fontSize: "14px",
                userSelect: "none"
              }}
              width="150px"
              onClick={props.sortByDimensions}
            >
              DIMENSIONS{" "}
              {props.sort.dimensionsUp === props.sort.dimensionsDown && (
                <i className="fas fa-sort"></i>
              )}
              {props.sort.dimensionsUp && <i className="fas fa-sort-up"></i>}
              {props.sort.dimensionsDown && (
                <i className="fas fa-sort-down"></i>
              )}
            </th>
            <th
              style={{
                cursor: "pointer",
                fontSize: "14px",
                userSelect: "none"
              }}
              width="130px"
              onClick={props.sortByStatus}
            >
              STATUS{" "}
              {props.sort.statusUp === props.sort.statusDown && (
                <i className="fas fa-sort"></i>
              )}
              {props.sort.statusUp && <i className="fas fa-sort-up"></i>}
              {props.sort.statusDown && <i className="fas fa-sort-down"></i>}
            </th>
            {/* <th>VERS</th> */}
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
  </div>
);

export default OrderOverview;
