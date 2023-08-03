import React from "react";
import moment from "moment";
import Comments from "./Comments";

export default class Notes extends React.Component {
  state = {
    message: "",
    replyMessage: "",
    parentCommentId: 0
  };

  handleOnChange = e => {
    let file = e.target.files[0];
    if (file !== undefined && file !== null) {
      var reader = new FileReader();

      reader.onload = event => {
        this.setState({
          selectedFile: event.target.result,
          selectedFileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }
    ;

  componentDidMount() {
    console.log(this.props.asset);
  }

  handleReplyOnChange = e => {
    this.setState({ replyMessage: e.target.value });
  }

  getCommentIdOnClick = e => {
    console.log(e.target.id);
  }

  sendReply = (id) => {
    const date = new Date();
    const reply = {
      user: `${this.props.user.firstName} ${this.props.user.lastName}`,
      date: `${moment(date).format("MM/DD/YY hh:mm A")}`,
      message: this.state.replyMessage.trim(),
      versionId: this.props.asset.versions[0].id,
      layoutId: this.props.asset.id,
      commentParentId: id
    }
    this.props.addReply(reply);

    this.setState({ replyMessage: "" });
  }

  handleClick = () => {
    this.fileInput.click();
  };

  enterPressed = event => {
    var code = event.keyCode || event.which;
    if (event.ctrlKey && code === 13) {
      //13 is the enter keycode
      this.addComment();
    }
  };

  addComment = () => {
    const date = new Date();
    const comment = {
      user: `${this.props.user.firstName} ${this.props.user.lastName}`,
      date: `${moment(date).format("MM/DD/YY hh:mm A")}`,
      message: this.state.message.trim(),
      isUpload: !!this.state.selectedFile,
      filePayload: this.state.selectedFile,
      fileName: this.state.selectedFileName,
      replies: [],
      versionId: this.props.asset.versions[0].id,
      layoutId: this.props.asset.id,
      userId: this.props.userId,
      eventId: this.props.eventId
    };

    this.props.add(comment);
    if (this.fileInput.value) {
      this.fileInput.value = "";
      this.setState({ message: "", selectedFile: "", selectedFileName: "" });
    } else {
      this.setState({ message: "" });
    }
  };

  onChange = e => {
    this.setState({ message: e.target.value });
  };

  saveDraft = () => {
    this.props.saveDraft(this.state.message);
  };

  render() {
    return (
      <div style={{ marginTop: "36px" }}>
        <h4 style={{ marginLeft: "10px" }}>
          <i className="far fa-comment-dots"></i> NOTES
        </h4>
        <div
          style={{
            background: "#1c1c1c",
            color: "yellow",
            border: "10px solid #1c1c1c",
            borderRadius: "10px"
          }}
        >
          <h6>IMAGE REVIEW </h6>
          {/* { { <span><i className="fas fa-arrow-left"></i>  <i className="fas fa-arrow-right"></i></span>}</h6>} */

          }

          <div className="btn-toolbar">
            <button
              disabled={this.props.asset.approved || this.props.participant || this.props.asset.step !== 310}
              className="btn btn-secondary mr-2"
              onClick={this.props.approve}
            >
              Approve
            </button>
            <button
              disabled={this.props.asset.approved || this.props.participant || this.props.asset.versions[0].comments.length < 1 || this.props.asset.step !== 310}
              className="btn btn-warning mr-2"
              onClick={this.props.rework}
            >
              Rework
            </button>

            <button className="btn btn-light" onClick={this.props.close}>
              Close
            </button>
          </div>
          <div className="container-fluid">
            VERSION{" "}
            {this.props.asset.versions && (
              <u key={this.props.asset.versions[0].id}>
                <b>
                  <span key={this.props.asset.versions[0].id}>
                    {this.props.asset.versions[0].number}
                  </span>
                </b>
              </u>
            )}
            {this.props.asset.versions.length > 1 && (
              <span
                style={{ cursor: "pointer", color: "#7a7707" }}
                onClick={this.props.displayVersionsPreview}
              >
                {" --previous"}
              </span>
            )}
          </div>
          <div
            style={{
              background: "#000",
              borderRadius: "10px",
              paddingBottom: "60px",
              paddingTop: "10px"
            }}
          >
            <Comments comments={this.props.asset.versions[0].comments} onlyRead={this.props.asset.approved} replyValue={this.state.replyMessage} handleReplyOnChange={this.handleReplyOnChange} sendReply={this.sendReply} getCommentIdOnClick={this.getCommentIdOnClick} step={this.props.asset.step} />
            {!this.props.asset.approved && this.props.asset.step === 310 && (
              <>
                <hr />
                <div className="row mb-2">
                  <div className="col-md-12">
                    <label
                      className="text-uppercase"
                      style={{ marginLeft: "50px" }}
                      htmlFor="basic-url"
                      disabled={this.props.asset.step !== 310}
                    >
                      Upload documentation file
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        accept={"file/*"}
                        onChange={this.handleOnChange}
                        ref={fileInput => (this.fileInput = fileInput)}
                      />
                      <i
                        style={{
                          verticalAlign: "middle",
                          fontSize: "25px",
                          marginLeft: "20px"
                        }}
                        className="fas fa-paperclip mr-2 mt-2"
                      ></i>
                      <input
                        type="text"
                        style={{
                          borderRadius: "10px",
                          zIndex: "2",
                          width: "83%"
                        }}
                        className="form-input"
                        onClick={this.handleClick}
                        readOnly
                        value={this.state.selectedFileName}
                      />
                      <div
                        style={{ zIndex: "1", marginLeft: "-10px" }}
                        className="input-group-append"
                      >
                        <button
                          style={{
                            paddingLeft: "20px",
                            borderRadius: "0 10px 10px 0"
                          }}
                          className="btn btn-warning"
                          onClick={this.handleClick}
                        >
                          <i className="fas fa-angle-down"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <textarea
                  autoFocus
                  style={{
                    margin: "0 auto",
                    width: "95%",
                    borderRadius: "10px"
                  }}
                  className="form-control"
                  rows="4"
                  onChange={this.onChange}
                  onKeyPress={this.enterPressed}
                  value={this.state.message}
                  placeholder="Type something here..."
                ></textarea>
                <button
                  style={{ marginTop: "10px", marginRight: "2.5%" }}
                  className="btn btn-warning float-right"
                  onClick={this.addComment}
                  disabled={!this.state.message && !this.state.selectedFile || this.props.asset.step !== 310}
                  title="Press Ctrl + Enter Key to send the message faster"
                >
                  Send
                </button>
                {/* <button
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  className="btn btn-secondary float-right"
                  disabled={!this.state.message}
                  onClick={this.saveDraft}
                >
                  Save draft
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
