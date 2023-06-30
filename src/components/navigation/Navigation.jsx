import React, { useState } from "react";
import { LOGO } from "../../AppSettings";
import "../../App.css";
import moment from "moment";
import NotificationService from "../../services/NotificationService";
import "./Navigation.css";

// let notificationCount = false;

const Navigation = (props) => (
    <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <img src={LOGO} alt="NEXUS" />
            {
                <ul className="navbar-nav text-uppercase font-weight-bold mr-auto ml-auto">
                    {/* <li className="nav-item active">
                <a className="nav-link" href="/">Admin</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Calendar</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Tickets</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Reports</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Contact</a>
            </li> */}
                </ul>
            }
            <form className="form-inline">
                <i
                    style={{
                        verticalAlign: "middle",
                        marginRight: "10px",
                        fontSize: "25px",
                        color: "orange",
                    }}
                    className="fas fa-search"
                ></i>
                <input
                    style={{ borderRadius: "10px" }}
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Enter search..."
                    value={props.query}
                    onChange={props.queryChange}
                />
            </form>
            <div style={{ color: "white", fontSize: "25px" }}>
                <span
                    onClick={(() => console.log(props), props.handleDropDownClick)}
                    style={{
                        cursor: "pointer",
                        position: "relative",
                        width: "100%  ",
                        marginTop: 0,
                    }}
                >
                    <i className="fas fa-cog ml-3"></i>
                    {props.openDropdown && (
                        <div
                            style={{
                                margin: "25%",
                            }}
                            onMouseLeave={props.closeDropDown}
                            class="dropdown-menu d-block"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(() => console.log(props), props.showChangePassword)}
                            >
                                Change password
                            </a>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(() => console.log(props), props.showAboutPage)}
                            >
                                About
                            </a>
                        </div>
                    )}
                </span>
                {props.openNotifications && (
                    <div
                        style={{
                            left: "auto",
                            right: 0,
                            width: "28%"
                        }}
                        className="dropdown-menu d-block"
                        aria-labelledby="dropdownMenuButton"
                    >
                        {props.notifications && props.notifications.length !== 0 &&
                            <div style={{ display: "inline-block", marginLeft: "30px", marginBottom: "10px", width: "60%" }}>

                                <button className="btn btn-primary"
                                    onClick={() => props.readNotifications(props.notifications)}
                                    disabled={props.notifications.length === 1}
                                >
                                    Read All</button>
                            </div>
                        }


                        {props.notifications && props.notifications.length === 0 ? (
                            <a
                                className="dropright-item"
                                style={{ marginLeft: "25%", marginRight: "20px" }}
                            >
                                {`You have read all your notifications  `}
                                <span><i className="fas fa-eye"></i></span>
                            </a>
                        ) : (

                            (props.notifications &&
                                props.notifications.map((notification) =>
                                    Object.assign(notification, { userId: props.userId })
                                ),

                                props.notifications
                                    .map((notification) => (
                                        <div style={{ display: "block" }}>
                                            <a
                                                className="dropright-item cp-alert-item"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    props.getLayoutNotification(
                                                        notification,
                                                        notification.orderDetailId
                                                    )

                                                }
                                            >

                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "60%",
                                                        paddingLeft: "30px",
                                                        textTransform: "uppercase",
                                                        fontWeight: "bold",
                                                    }}
                                                >

                                                    <i className="fas fa-user"></i>
                                                    {` ${notification.firstName} ${notification.lastName} `}
                                                    {
                                                        typeof notification.read === 'undefined' ? "" : (<span><i className="fas fa-eye"></i></span>)
                                                    }
                                                </span>
                                                <span style={{ display: "inline-block", width: "40%" }}>
                                                    <i className="fas fa-calendar"></i>
                                                    {` ${moment(notification.createDate).format(
                                                        "MM/DD/YY hh:mm A"
                                                    )}`}
                                                </span>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "100%",
                                                        paddingLeft: "30px",
                                                    }}
                                                >
                                                    <i className="fas fa-envelope"></i>
                                                    {` ${notification.notification} `}

                                                </span>
                                            </a>
                                        </div>
                                    ))
                                    .sort((a, b) => (a.createDate > b.createDate ? 1 : -1)))
                        )}
                    </div>
                )}
                <span>
                    <i
                        className="fas fa-bell ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={(() => console.log(), props.showNotificationOnClick)}
                    ></i>
                    <span
                        style={{
                            color: "orange",
                            verticalAlign: "super",
                            fontSize: "16px",
                        }}
                    >
                        {
                            props.notificationCount === 0 ? "" : props.notificationCount
                        }
                    </span>
                </span>
                <span onClick={props.logout} style={{ cursor: "pointer" }}>
                    <i
                        className="fas fa-user ml-3 mr-1"
                        title={`Welcome, ${props.user.firstName} ${props.user.lastName}`}
                    ></i>
                    <span style={{ fontSize: "16px" }} className="text-uppercase">
                        Logout
                    </span>
                </span>
            </div>
        </nav>
    </div>
);

export default Navigation;
