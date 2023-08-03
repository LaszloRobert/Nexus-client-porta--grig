import React, { Component } from "react";
import { STATUS_MAP, STATUS_COLORS } from "../../constants";
import DocumentService from "../../services/DocumentService";
import './OrderStyle.css';

export default class LayoutItemImage extends Component {
  clickLayout = () => {
    this.props.onClick(this.props.asset);
  }

  render() {
    return (
      <tr className="order-item-select-link table-body-text-style" style={this.props.asset.id == this.props.selectedAssetId ? { border: '2px solid yellow', backgroundColor: '#f0f79c' } : {}} onClick={this.clickLayout}>
        <td>{this.props.asset.description}</td>
        <td>{this.props.asset.orderLineDescription}</td>
        <td>{this.props.asset.dimensions}</td>
        <td>{this.props.asset.qty}</td>
        <td style={{ textAlign: 'center' }}>
          <div>
            <i className="fas fa-circle" style={{
              color: STATUS_COLORS[this.props.asset.status]
            }}></i>
          </div>
        </td>
      </tr >
    );
  }
}
