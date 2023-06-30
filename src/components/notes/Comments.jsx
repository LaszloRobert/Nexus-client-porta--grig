import React, { useState } from "react";
import moment from "moment";
import DocumentService from "../../services/DocumentService";

const Comments = props => {
    const [attachment, setAttachment] = useState("");
    const [showId, setShowId] = useState(false);
    const [replyValue] = useState("");

    function clickAttach(id) {
        DocumentService.getAttachment(id).then(result => setAttachment(result));
    }

    return (
        <ul
            className="container-fluid list-unstyled"
            style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
            {props.step === 310 || props.step === 300 || props.preview === "allow" ? (props.comments.map((comment, i) => (
                <li key={i} className="row mb-2">
                    <div
                        style={{ color: "white" }}
                        className="col-md-7 font-weight-bold text-uppercase"
                    >
                        {comment.isApprove && (
                            <i style={{ color: "green" }} className="fas fa-check mr-2"></i>
                        )}
                        {comment.isUpload && (
                            <i
                                style={{ color: "yellow" }}
                                className="fas fa-paperclip mr-2"
                            ></i>
                        )}
                        {comment.isRework && (
                            <i
                                style={{ color: "yellow" }}
                                className="fas fa-redo-alt mr-2"
                            ></i>
                        )}

                        {comment.user}
                    </div>
                    <div className="col-md-5 text-right font-weight-bold text-uppercase">
                        {`${moment(comment.date).format("MM/DD/YY hh:mm A")}`}
                    </div>
                    <div className="col-12 font-weight-light">
                        <span style={{ color: "white", whiteSpace: "pre-wrap" }}>
                            {comment.fileName && !comment.id && (
                                <>
                                    File{" "}
                                    <a
                                        style={{ color: "yellow", cursor: "pointer" }}
                                        href={comment.filePayload}
                                        download={comment.fileName}
                                    >
                                        {comment.fileName}
                                    </a>{" "}
                                    has been attached! <br />
                                </>
                            )}
                            {comment.fileName && !!comment.id && (
                                <>
                                    File{" "}
                                    <a
                                        onClick={() => {
                                            clickAttach(comment.id);
                                        }}
                                        style={{ color: "yellow", cursor: "pointer" }}
                                        href={attachment || null}
                                        download={comment.fileName}
                                    >
                                        {comment.fileName}
                                    </a>{" "}
                                    has been attached! <br />
                                </>
                            )}
                            {comment.message}
                        </span>
                    </div>
                    {!comment.isAction && !props.onlyRead && (
                        <div className="col-12">
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowId(comment.id)}
                            >
                                Reply
                            </span>
                            {showId === comment.id && (
                                <div>
                                    <input
                                        type="text"
                                        style={{

                                            borderRadius: "10px"
                                        }}
                                        className="form-control d-inline-block w-75"
                                        value={props.replyValue}
                                        onChange={props.handleReplyOnChange}
                                    />
                                    <button
                                        className="btn btn-warning ml-2"
                                        onClick={() => { setShowId(0); props.sendReply(comment.id) }}
                                        disabled={!props.replyValue}
                                    >
                                        Send
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {comment.replies && (
                        <ul className="container-fluid list-unstyled">
                            {comment.replies.map(reply => (
                                <li key={reply.id} className="row">
                                    <div className="col-1"></div>
                                    <div
                                        style={{ color: "white" }}
                                        className="col-md-6 font-weight-bold text-uppercase"
                                    >
                                        {reply.user}
                                    </div>
                                    <div className="col-md-5 text-right font-weight-bold text-uppercase">
                                        {`${moment(reply.date).format("MM/DD/YY hh:mm A")}`}
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-11 font-weight-light">
                                        <span style={{ color: "white", whiteSpace: "pre-wrap" }}>
                                            {reply.message}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))) : (<div>Actions from this section cannot be performed in this state.</div>)}
        </ul>
    );
};

export default Comments;
