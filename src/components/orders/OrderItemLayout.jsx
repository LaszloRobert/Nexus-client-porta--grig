import React from "react";
import LayoutItemImage from "./LayoutItemImage";

export default class OrderItemLayout extends React.Component {
  state = {
    hover: false,
    selectedAssetId: null,
    checkedShowApproved: false,
    isSorted: false,
    sortConditions: {},
    pdfData: "",
    shouldTransform: true
  };

  selectAsset = asset => {
    this.props.selectAsset(asset);
    this.state.shouldTransform = true;
    this.state.selectedAssetId = asset.id;
  };

  hoverOn = e => {
    e.stopPropagation();
    this.setState({
      hover: true
    })
  };

  hoverOff = e => {
    e.stopPropagation();
    this.setState({
      hover: false
    })
  };

  reviewWork = () => {
    this.props.review(this.state.selectedFile);
  };

  handleShowApprovedChange = () => {
    this.setState({ checkedShowApproved: !this.state.checkedShowApproved })
  }

  sortByStatusLineItem = () => {
    if (
      this.state.sortConditions.statusUp ===
      this.state.sortConditions.statusDown
    ) {
      this.props.item.assets.sort((a, b) => {
        const statusOrder = {
          REVIEW: 0,
          REWORK: 1,
          APPROVED: 2,
        };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        } else {
          return a.description.localeCompare(b.description);
        }
      });
      this.setState({
        isSorted: true,
        sortConditions: { statusUp: true }
      })

    } else if (this.state.sortConditions.statusUp) {
      this.props.item.assets.sort((a, b) => {
        const statusOrder = {
          REVIEW: 2,
          REWORK: 1,
          APPROVED: 0,
        };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        } else {
          return a.description.localeCompare(b.description);
        }
      });
      this.setState({
        isSorted: true,
        sortConditions: { statusDown: true },
      });
    }
    else if (this.state.sortConditions.statusDown) {
      this.setState({
        sortConditions: {},
        isSorted: false
      })
    }
  }

  sortByTypeLineItem = () => {
    if (
      this.state.sortConditions.typeUp ===
      this.state.sortConditions.typeDown
    ) {
      this.props.item.assets.sort((a, b) => {
        if (a.description === b.description) return 0;
        if (!a.description) return -1; // Handle null description as per your preference
        if (!b.description) return 1; // Handle null description as per your preference

        // Perform a case-insensitive and numeric-aware comparison
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();
        return descriptionA.localeCompare(descriptionB, undefined, {
          sensitivity: 'base',
          numeric: true,
        });
      });

      this.setState({
        isSorted: true,
        sortConditions: { typeUp: true },
      });
    } else if (this.state.sortConditions.typeUp) {
      this.props.item.assets.sort((a, b) => {
        if (a.description === b.description) return 0;
        if (!a.description) return 1; // Handle null description as per your preference
        if (!b.description) return -1; // Handle null description as per your preference

        // Perform a case-insensitive and numeric-aware comparison
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();
        return descriptionB.localeCompare(descriptionA, undefined, {
          sensitivity: 'base',
          numeric: true,
        });
      });

      this.setState({
        isSorted: true,
        sortConditions: { typeDown: true },
      });
    } else if (this.state.sortConditions.typeDown) {
      this.setState({
        sortConditions: {},
        isSorted: false,
      });
    }
  };

  sortByDescriptionLineItem = () => {
    if (
      this.state.sortConditions.descriptionUp ===
      this.state.sortConditions.descriptionDown
    ) {
      this.props.item.assets.sort((a, b) => {
        if (a.orderLineDescription === b.orderLineDescription) return 0;
        if (!a.orderLineDescription) return -1; // Handle null description as per your preference
        if (!b.orderLineDescription) return 1; // Handle null description as per your preference

        // Perform a case-insensitive and numeric-aware comparison
        const descriptionA = a.orderLineDescription.toLowerCase();
        const descriptionB = b.orderLineDescription.toLowerCase();
        return descriptionA.localeCompare(descriptionB, undefined, {
          sensitivity: 'base',
          numeric: true,
        });
      });

      this.setState({
        isSorted: true,
        sortConditions: { descriptionUp: true },
      });
    } else if (this.state.sortConditions.descriptionUp) {
      this.props.item.assets.sort((a, b) => {
        if (a.orderLineDescription === b.orderLineDescription) return 0;
        if (!a.orderLineDescription) return 1; // Handle null description as per your preference
        if (!b.orderLineDescription) return -1; // Handle null description as per your preference

        // Perform a case-insensitive and numeric-aware comparison
        const descriptionA = a.orderLineDescription.toLowerCase();
        const descriptionB = b.orderLineDescription.toLowerCase();
        return descriptionB.localeCompare(descriptionA, undefined, {
          sensitivity: 'base',
          numeric: true,
        });
      });

      this.setState({
        isSorted: true,
        sortConditions: { descriptionDown: true },
      });
    } else if (this.state.sortConditions.descriptionDown) {
      this.setState({
        sortConditions: {},
        isSorted: false,
      });
    }
  };

  sortByQtyLineItem = () => {
    if (
      this.state.sortConditions.qtyUp ===
      this.state.sortConditions.qtyDown
    ) {
      this.props.item.assets.sort((a, b) => (a.qty > b.qty ? 1 : -1))
      this.setState({
        isSorted: true,
        sortConditions: { qtyUp: true }
      })
    } else if (this.state.sortConditions.qtyUp) {
      this.props.item.assets.sort((a, b) => (a.qty < b.qty ? 1 : -1))
      this.setState({
        isSorted: true,
        sortConditions: { qtyDown: true }
      })
    } else if (this.state.sortConditions.qtyDown) {
      this.setState({
        sortConditions: {},
        isSorted: false
      })
    }
  }

  sortByDimensionLineItem = () => {
    const nullValuePlacement = 'end'; // 'start' or 'end' depending on where you want null values

    if (
      this.state.sortConditions.dimensionUp ===
      this.state.sortConditions.dimensionDown
    ) {
      this.props.item.assets.sort((a, b) => {
        if (a.dimensions === b.dimensions) return 0;
        if (a.dimensions === null) return nullValuePlacement === 'start' ? -1 : 1;
        if (b.dimensions === null) return nullValuePlacement === 'start' ? 1 : -1;
        return a.dimensions.localeCompare(b.dimensions);
      });

      this.setState({
        isSorted: true,
        sortConditions: { dimensionUp: true },
      });
    } else if (this.state.sortConditions.dimensionUp) {
      this.props.item.assets.sort((a, b) => {
        if (a.dimensions === b.dimensions) return 0;
        if (a.dimensions === null) return nullValuePlacement === 'start' ? 1 : -1;
        if (b.dimensions === null) return nullValuePlacement === 'start' ? -1 : 1;
        return b.dimensions.localeCompare(a.dimensions);
      });

      this.setState({
        isSorted: true,
        sortConditions: { dimensionDown: true },
      });
    } else if (this.state.sortConditions.dimensionDown) {
      this.setState({
        sortConditions: {},
        isSorted: false,
      });
    }
  };

  showLargePdfs() {
    if (this.state.shouldTransform) {
      const pdfUint8Array = this.base64ToUint8Array(this.props.asset.image);
      var pdfBlob = new Blob([pdfUint8Array], { type: "application/pdf" });
      var pdfBlobUrl = URL.createObjectURL(pdfBlob);
      this.state.pdfData = pdfBlobUrl
      this.state.shouldTransform = false;
    }

    return this.state.pdfData;
  }

  // Utility function to convert base64 to Uint8Array
  base64ToUint8Array(base64) {
    const data = base64.replace(/^data:application\/pdf;base64,/, '');
    const binaryString = atob(data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  render() {
    if (!this.state.isSorted) {
      this.props.item.assets.sort((a, b) => {
        const statusOrder = {
          REVIEW: 0,
          REWORK: 1,
          APPROVED: 2,
        };

        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        } else {
          return a.description.localeCompare(b.description);
        }
      });
    }

    let filteredItems = this.props.item.assets;

    if (this.state.checkedShowApproved) {
      filteredItems = filteredItems.filter(
        asset => asset.status === "APPROVED" || asset.status === "REWORK" || asset.status === "REVIEW"
      );
    }
    else {
      filteredItems = filteredItems.filter(
        asset => asset.status === "REWORK" || asset.status === "REVIEW"
      );
    }

    return (
      <div
        style={{
          marginTop: "36px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <h4 style={{ marginLeft: "10px" }} className="h4-style">
            <i className="fas fa-pencil-alt"></i> LINE ITEMS
          </h4>
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "16px",
              marginRight: "30px"
            }}
          >
            Show Approved
            <input
              type="checkbox"
              style={{ marginTop: '3px', width: '20px', height: '20px' }}
              checked={this.state.checkedShowApproved}
              onChange={this.handleShowApprovedChange}
            />

          </h4>
        </div>

        <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
          {this.props.asset && (
            <div
              className="row"
              style={{
                border: "10px solid #1c1c1c",
                borderRadius: "10px",
                marginBottom: "15px",
                maxHeight: "610px",
              }}
            >
              <div
                style={{ position: "absolute", right: "25px" }}
                className={`btn-toolbar btn-group-sm mt-2 mr-2 ${this.state.hover ? "visible" : "invisible"
                  }`}
              >
                {/* <>
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
                </> */}
              </div>
              <div className="w-100 d-flex align-items-center justify-content-between">
                <div>
                  <strong>TYPE</strong> - {this.props.asset.description} <strong>DIM</strong> - {this.props.asset.dimensions} <strong>QTY</strong> - {this.props.asset.qty}
                </div>
                <div>
                  {this.props.asset.image.indexOf("image/") > -1 && (
                    <a
                      href={this.props.asset.image}
                      style={{ flexShrink: 0, padding: "2px" }}
                      download={
                        this.props.asset.versions
                          ? this.props.asset.versions[0].fileName
                          : ""
                      }
                      className="btn btn-secondary mr-1"
                    >
                      Download
                    </a>
                  )}

                  <button
                    className="btn btn-secondary"
                    style={{ flexShrink: 0, padding: "2px" }}
                    onClick={this.props.preview}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {this.props.asset.image.indexOf("image/") > -1 && (

                <img
                  className="img-fluid"
                  style={{
                    maxHeight: "600px",
                    display: "block",
                    margin: "200 auto"
                  }}
                  src={this.props.asset.image}
                  alt=""
                />
              )}
              {this.props.asset.image.indexOf("application/") > -1 && (

                <object
                  className="img-fluid w-100"
                  data={this.showLargePdfs()}
                  style={{ height: "552px" }}
                >
                  Document missing
                </object>
              )}
            </div>
          )}
          <div>
            <div
              style={{
                border: "10px solid #1c1c1c",
                borderRadius: "10px",
                maxHeight: "600px",
                overflow: "auto"
              }}
            >
              <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark table-header-text-style">
                  <tr>
                    <th onClick={this.sortByTypeLineItem}>
                      <div className="display-flex-th">
                        TYPE
                        {this.state.sortConditions.typeUp === this.state.sortConditions.typeDown && (
                          <i className="fas fa-sort"></i>
                        )}
                        {this.state.sortConditions.typeUp && <i className="fas fa-sort-up"></i>}
                        {this.state.sortConditions.typeDown && <i className="fas fa-sort-down"></i>}
                      </div>
                    </th>

                    <th onClick={this.sortByDescriptionLineItem}>
                      <div className="display-flex-th">
                        DESCRIPTION
                        {this.state.sortConditions.descriptionUp === this.state.sortConditions.descriptionDown && (
                          <i className="fas fa-sort"></i>
                        )}
                        {this.state.sortConditions.descriptionUp && <i className="fas fa-sort-up"></i>}
                        {this.state.sortConditions.descriptionDown && <i className="fas fa-sort-down"></i>}
                      </div>
                    </th>

                    <th onClick={this.sortByDimensionLineItem}>
                      <div className="display-flex-th">
                        DIMENSIONS
                        {this.state.sortConditions.dimensionUp === this.state.sortConditions.dimensionDown && (
                          <i className="fas fa-sort"></i>
                        )}
                        {this.state.sortConditions.dimensionUp && <i className="fas fa-sort-up"></i>}
                        {this.state.sortConditions.dimensionDown && <i className="fas fa-sort-down"></i>}
                      </div>
                    </th>

                    <th onClick={this.sortByQtyLineItem}>
                      <div className="display-flex-th">
                        QTY
                        {this.state.sortConditions.qtyUp === this.state.sortConditions.qtyDown && (
                          <i className="fas fa-sort"></i>
                        )}
                        {this.state.sortConditions.qtyUp && <i className="fas fa-sort-up"></i>}
                        {this.state.sortConditions.qtyDown && <i className="fas fa-sort-down"></i>}
                      </div>
                    </th>

                    <th
                      className="width-75"
                      onClick={this.sortByStatusLineItem}
                    >
                      <div className="display-flex-th">
                        STATUS
                        {this.state.sortConditions.statusUp === this.state.sortConditions.statusDown && (
                          <i className="fas fa-sort"></i>
                        )}
                        {this.state.sortConditions.statusUp && <i className="fas fa-sort-up"></i>}
                        {this.state.sortConditions.statusDown && <i className="fas fa-sort-down"></i>}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredItems.map((asset, i) => {
                      return (
                        <LayoutItemImage
                          key={asset.id}
                          asset={asset}
                          onClick={this.selectAsset}
                          selectedAssetId={this.state.selectedAssetId}
                        />
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div >
      </div >
    );
  }
}
