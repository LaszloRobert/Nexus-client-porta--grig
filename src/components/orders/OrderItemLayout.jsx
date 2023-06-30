import React from "react";
import LayoutItemImage from "./LayoutItemImage";

export default class OrderItemLayout extends React.Component {
  state = {
    hover: false
  };

  selectAsset = asset => {
    this.props.selectAsset(asset);
  };

  hoverOn = e => {
    e.stopPropagation();
    this.setState({ hover: true });
  };

  hoverOff = e => {
    e.stopPropagation();
    this.setState({ hover: false });
  };

  reviewWork = () => {
    this.props.review(this.state.selectedFile);
  };

  render() {
    return (
      <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
        <h4 style={{ marginLeft: "10px" }}>
          <i className="fas fa-pencil-alt"></i> LAYOUT
        </h4>
        {console.log("Asset" + this.props.asset)}
        {this.props.asset && (
          <div
            style={{
              border: "10px solid #1c1c1c",
              borderRadius: "10px",
              marginBottom: "15px"
            }}
          >
            <div
              style={{ position: "absolute", right: "25px" }}
              className={`btn-toolbar btn-group-sm mt-2 mr-2 ${this.state.hover ? "visible" : "invisible"
                }`}
            >
              <>
                <a
                  href={this.props.asset.image}
                  download={
                    this.props.asset.versions
                      ? this.props.asset.versions[0].fileName
                      : ""
                  }
                  className="btn btn-secondary mr-2"
                >
                  Download
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={this.props.preview}
                >
                  Preview
                </button>
              </>
            </div>
            <div className="w-100">
              <strong>TYPE</strong> - {this.props.asset.description} <strong>DIM</strong> - {this.props.asset.dimensions} <strong>QTY</strong> - {this.props.asset.qty}
            </div>
            {/* <img
              onMouseEnter={this.hoverOn}
              onMouseLeave={this.hoverOff}
              className="img-fluid w-100"
              alt=""
              src={this.props.asset.image}
            /> */}
            {this.props.asset.image.indexOf("image/") > -1 && (
              <img
                className="img-fluid"
                style={{
                  maxHeight: "600px",
                  display: "block",
                  margin: "0 auto"
                }}
                src={this.props.asset.image}
                alt=""
              />
            )}
            {this.props.asset.image.indexOf("application/") > -1 && (
              <object
                className="img-fluid w-100"
                data={this.props.asset.image}
                style={{ height: "600px" }}
              >
                Document missing
              </object>
            )}
          </div>
        )}
        <div
          style={{
            backgroundColor: "#1c1c1c",
            color: "white",
            border: "10px solid #1c1c1c",
            borderRadius: "10px"
          }}
        >
          <div className="row no-gutters">
            {this.props.item.assets.map((asset, i) => {
              const title = `${this.props.item.order}-${i + 1}`;
              return (
                <LayoutItemImage
                  key={asset.id}
                  //src={asset.versions[0].image}
                  asset={asset}
                  title={title}
                  onClick={this.selectAsset}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
