import React, { Component } from "react";
import { STATUS_MAP, STATUS_COLORS } from "../../constants";
import DocumentService from "../../services/DocumentService";
import './OrderStyle.css';

export default class LayoutItemImage extends Component {
  state = {
    image: ""
  };

  clickImage = () => {
    this.props.onClick(this.props.asset);
  };

  componentDidMount() {
    // DocumentService.getDocument(this.props.asset.documentId).then(data =>
    //   this.setState({ image: data })
    // );
    DocumentService.getThumbnail(this.props.asset.documentId).then(data =>
      this.setState({ image: data })
    );
  }

  render() {
    return (
      <div
        style={{ padding: "5px" }}
        className="col-md-6"
        onClick={this.clickImage}
      >
        {this.state.image.indexOf("image/") > -1 && (
          <img
            className="img-fluid"
            style={{ maxHeight: "200px", display: 'block', margin: '0 auto' }}
            src={this.state.image}
            alt=""
          />
        )}
        {this.state.image.indexOf("application/") > -1 && (
          <object
            className="img-fluid w-100"
            style={{ height: "200px" }}
            data={this.state.image}
            alt=""
          >
            Document missing
          </object>
        )}
        <span className="order-item-select-link">
          <i
            style={{ color: STATUS_COLORS[this.props.asset.status] }}
            className="fas fa-circle"
          ></i>{" "}
          {`${this.props.title} - ${this.props.asset.description} | ${STATUS_MAP[this.props.asset.status]
            }`}
        </span>
      </div>
    );
  }
}
