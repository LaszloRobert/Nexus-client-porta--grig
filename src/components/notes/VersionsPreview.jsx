import React from "react";
import Comments from "./Comments";
import DocumentService from "../../services/DocumentService";

export default class VersionsPreview extends React.Component {
    state = {
        selectedVersion: this.props.versions[0]
    };

    componentDidMount() {
        DocumentService.getDocument(this.props.versions[0].documentId).then(
            data => {
                this.setState({ selectedFile: data });
            }
        );
    }

    selectVersion = version => {
        DocumentService.getDocument(version.documentId).then(data => {
            this.setState({ selectedVersion: version, selectedFile: data });
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-5 mb-2" style={{ color: "white" }}>
                    <div className="col-md-1">
                        <span>Versions: </span>
                    </div>
                    <div className="col-md-10">
                        {this.props.versions.map(v => {
                            const buttonClass =
                                v.id === this.state.selectedVersion.id
                                    ? "btn-primary"
                                    : "btn-secondary";
                            return (
                                <button
                                    key={v.id}
                                    onClick={() => {
                                        this.selectVersion(v);
                                    }}
                                    className={`btn ${buttonClass} mr-2`}
                                >
                                    {v.number}
                                </button>
                            );
                        })}
                    </div>
                    <div className="col-md-1 text-center">
                        <i className="fas fa-times" onClick={this.props.close}></i>
                    </div>
                </div>
                {this.state.selectedVersion && (
                    <div className="row">
                        <div className="col-md-6">
                            {/* <img
                className="img-fluid w-100"
                src={this.state.selectedFile}
                alt=""
              /> */}
                            {this.state.selectedFile && this.state.selectedFile.indexOf("image/") > -1 && (
                                <img
                                    className="img-fluid"
                                    src={this.state.selectedFile}
                                    alt=""
                                    style={{ maxHeight: '600px', display: 'block', margin: '0 auto' }}
                                />
                            )}
                            {this.state.selectedFile && this.state.selectedFile.indexOf("application/") > -1 && (
                                <object
                                    className="img-fluid w-100"
                                    data={this.state.selectedFile}
                                    style={{ height: '600px' }}
                                >
                                    Document missing
                                </object>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div
                                style={{
                                    background: "#1c1c1c",
                                    color: "yellow",
                                    border: "10px solid #1c1c1c",
                                    borderRadius: "10px"
                                }}
                            >
                                <Comments comments={this.state.selectedVersion.comments} onlyRead={true} preview={"allow"} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
