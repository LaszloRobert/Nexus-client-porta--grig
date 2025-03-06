import React from "react";
import "./App.css";
import $, { type } from "jquery";
import { BG_IMAGE, LOGIN_BRANDING_IMAGE } from "../src/AppSettings.js";
import OrderOverview from "./components/orders/OrderOverview";
import OrderItemLayout from "./components/orders/OrderItemLayout";
import Notes from "./components/notes/Notes";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/account/Login";
import OrderService from "./services/OrderService";
import EventService from "./services/EventService";
import VersionService from "./services/VersionService";
import CommentService from "./services/CommentService";
import DocumentService from "./services/DocumentService";
import AuthService, { AUTH } from "./services/AuthService";
import NotificationService from "./services/NotificationService";
import moment from "moment";

export default class App extends React.Component {
  initialState = {
    selectedEvent: {},
    events: [],
    items: [],
    selectedAsset: null,
    selectedItem: null,
    user: {},
    sortConditions: {},
    searchText: "",
    inviteEmail: "",
  };
  state = {
    selectedEvent: {},
    events: [],
    items: [],
    currentPassword: '',
    newPassowrd: '',
    confirmNewPassword: '',
    showInput: false,
    showAuthorizeMessage: false,
    showUnauthorizeMessage: false,
    errorMessage: "",
    showSamePasswords: false,
    passwordMatch: false,
    hiddenCurrentPassword: true,
    hiddenNewPassword: true,
    hiddenConfirmPassword: true,
    openDropdown: false,
    openNotifications: false,
    showAbout: false,
    errors: false,
    noEventsMessage: "",
    notifications: [],
    notificationCount: 0
  };

  componentDidMount() {
    var auth = AUTH.expires_in > Date.now();
    this.setState({ isAuth: auth });
    if (auth) {
      this.init();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mouseclick", this.handleClickOutside);
  }

  onClose = () => {
    this.setState({
      selectedAsset: null,
    });
  };

  addComment = (comment) => {
    console.log("Add comment", comment);
    CommentService.addComment(comment).then((serverComment) => {
      if (serverComment.message === "Authorize") {
        comment.id = serverComment.data;
        let newAsset = Object.assign({}, this.state.selectedAsset);
        newAsset.versions[0].draft = "";
        newAsset.versions[0].comments = [
          comment,
          ...this.state.selectedAsset.versions[0].comments,
        ];
        this.setState({
          selectedAsset: newAsset,
        });
      }
    });
  };

  addReply = (reply) => {
    CommentService.addComment(reply).then((serverReply) => {
      if (serverReply.message === "Authorize") {
        let newAsset = Object.assign({}, this.state.selectedAsset);
        var comment = newAsset.versions[0].comments.filter(
          (c) => c.id === reply.commentParentId
        )[0];
        comment.replies = [reply, ...comment.replies];

        this.setState({
          selectedAsset: newAsset,
        });
      } else {
        alert(serverReply.message);
      }
    });
  };

  loadOrders = (event) => {
    OrderService.getOrders(event.id).then((data) => {
      this.setState(
        {
          items: data,
          selectedEvent: event,
          selectedAsset: null,
          selectedItem: null,
          sortConditions: {},
        },
        this.sortOrders
      );
    });

  };

  loadNotificationForSelectedEvent = (id) => {
    NotificationService.getNotifications(id).then(
      (notifications) => {
        this.setState({ notifications: notifications });
        this.setState({ notificationCount: this.state.notifications.length })
      }
    );
  }


  saveDraft = (message) => {
    let newAsset = Object.assign({}, this.state.selectedAsset);
    newAsset.versions[0].draft = message;
    this.setState({
      selectedAsset: newAsset,
    });
  };

  approveAsset = () => {
    if (!window.confirm("Are you sure?\nThis cannot be undone!")) {
      return;
    }

    const date = new Date().toISOString();
    let comment = {
      isAction: true,
      isApprove: true,
      user: `${this.state.user.firstName} ${this.state.user.lastName}`,
      date: `${moment(date).format("MM/DD/YY hh:mm:ss A")}`,
      message: `APPROVED Layout ${this.state.selectedItem.order}-${this.state.selectedAsset.id + 1
        }`,
      versionId: this.state.selectedAsset.versions[0].id,
      layoutId: this.state.selectedAsset.id,
      eventId: this.state.selectedEvent.id
    };

    let newAsset = Object.assign({}, this.state.selectedAsset);
    newAsset.versions = Object.assign([], this.state.selectedAsset.versions);
    newAsset.status = "APPROVED";
    newAsset.versions[0].status = "APPROVED";
    newAsset.versions[0].comments = [
      comment,
      ...this.state.selectedAsset.versions[0].comments,
    ];
    console.log("approve", comment);
    CommentService.addComment(comment)
    newAsset.approved = true;

    let updatedItem = Object.assign({}, this.state.selectedItem);
    updatedItem.assets = updatedItem.assets.map((el) =>
      el.id === newAsset.id ? newAsset : el
    );
    this.setState(
      (prevState) => ({
        items: prevState.items.map((el) =>
          el.order === updatedItem.order ? updatedItem : el
        ),
        selectedAsset: newAsset,
        selectedItem: updatedItem,
      }),
      this.computeOrderStatus
    );
  };

  reworkAsset = () => {
    const date = new Date().toISOString();
    let comment = {
      isAction: true,
      isRework: true,
      user: `${this.state.user.firstName} ${this.state.user.lastName}`,
      date: `${moment(date).format("MM/DD/YY hh:mm:ss A")}`,
      message: `REWORK Layout ${this.state.selectedItem.order}-${this.state.selectedAsset.id}`,
      versionId: this.state.selectedAsset.versions[0].id,
      layoutId: this.state.selectedAsset.id,
      eventId: this.state.selectedEvent.id
    };
    let newAsset = Object.assign({}, this.state.selectedAsset);
    newAsset.versions = Object.assign([], this.state.selectedAsset.versions);

    newAsset.status = "REWORK";
    newAsset.versions[0].status = "REWORK";
    newAsset.versions[0].comments = [
      comment,
      ...this.state.selectedAsset.versions[0].comments,
    ];

    CommentService.addComment(comment);
    newAsset.approved = true;

    let updatedItem = Object.assign({}, this.state.selectedItem);
    updatedItem.assets = updatedItem.assets.map((el) =>
      el.id === newAsset.id ? newAsset : el
    );
    this.setState(
      (prevState) => ({
        items: prevState.items.map((el) =>
          el.order === updatedItem.order ? updatedItem : el
        ),
        selectedAsset: newAsset,
        selectedItem: updatedItem,
      }),
      this.computeOrderStatus
    );
  };

  onItemClick = (item) => {
    this.setState({
      selectedItem: item,
      selectedAsset: null,
    });
  };

  selectAsset = (asset) => {
    VersionService.getVersions(asset.id).then((data) => {
      if (data) {
        data[0].selected = true;
      }
      asset.versions = data;

      DocumentService.getDocument(asset.documentId).then((payload) => {
        asset.image = payload;
        this.setState({
          selectedAsset: asset,
        });
      });
    });
  };

  sortOrders = () => {
    let newOrders = this.state.items
      .filter((a) => a.status === "REVIEW")
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .sort((a, b) => (a.description > b.description ? 1 : -1));
    newOrders = [
      ...newOrders,
      ...this.state.items
        .filter((a) => a.status === "REWORK")
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .sort((a, b) => (a.description > b.description ? 1 : -1)),
    ];
    newOrders = [
      ...newOrders,
      ...this.state.items
        .filter((a) => a.status === "APPROVED")
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .sort((a, b) => (a.description > b.description ? 1 : -1)),
    ];
    this.setState({ items: newOrders });
  };
  computeOrderStatus = () => {
    let updatedItem = Object.assign({}, this.state.selectedItem);
    let review = updatedItem.assets.filter((a) => a.status === "REVIEW");
    if (review.length) {
      updatedItem.status = "REVIEW";
      this.setState(
        (prevState) => ({
          items: prevState.items.map((el) =>
            el.order === updatedItem.order ? updatedItem : el
          ),
        }),
        this.sortOrders
      );
      return;
    }

    let rework = updatedItem.assets.filter((a) => a.status === "REWORK");
    if (rework.length) {
      updatedItem.status = "REWORK";
      this.setState(
        (prevState) => ({
          items: prevState.items.map((el) =>
            el.order === updatedItem.order ? updatedItem : el
          ),
        }),
        this.sortOrders
      );
      return;
    }

    updatedItem.status = "APPROVED";
    this.setState(
      (prevState) => ({
        items: prevState.items.map((el) =>
          el.order === updatedItem.order ? updatedItem : el
        ),
      }),
      this.sortOrders
    );
  };

  showPreview = () => {
    this.setState({ preview: true });
  };

  closePreview = () => {
    this.setState({ preview: false });
  };

  init = () => {
    this.setState(this.initialState, () => {
      EventService.getEvents().then((events) => {

        this.setState({ events: events }, () => {
          if (
            this.state.events &&
            (this.state.events[0].name !== " NO EVENT" && this.state.events[0].name !== "NO EVENT") &&
            this.state.events.length > 0
          ) {
            NotificationService.getNotifications(this.state.events[0].id).then(
              (nots) => {
                this.setState({ notifications: nots });
              }
            );
            OrderService.getOrders(this.state.events[0].id).then((data) => {
              this.setState(
                (prevState) => ({
                  items: data,
                  selectedEvent: prevState.events[0],
                }),
                this.sortOrders
              );
              this.setState({ noEventsMessage: "" });
            });
          } else {
            this.setState({
              noEventsMessage: "This user is not participating in any event!",
            });
          }

          AuthService.getCurrentUser().then((userData) => {
            if (userData) {
              localStorage.setItem("User", JSON.stringify(userData));
              this.setState({ isAuth: true, user: userData });
            } else {
              localStorage.clear();
              this.setState({ isAuth: false });
            }
          });



        });
      });
    });
  };

  logout = () => {
    AuthService.logout();
    this.setState({ isAuth: false });
  };

  sortByOrder = () => {
    if (
      this.state.sortConditions.orderUp === this.state.sortConditions.orderDown
    ) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
        sortConditions: { orderUp: true },
      }));
    } else if (this.state.sortConditions.orderUp) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.order < b.order ? 1 : -1)),
        sortConditions: { orderDown: true },
      }));
    } else if (this.state.sortConditions.orderDown) {
      this.setState({ sortConditions: {} }, this.sortOrders);
    }
  };

  sortByQty = () => {
    if (this.state.sortConditions.qtyUp === this.state.sortConditions.qtyDown) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.qty > b.qty ? 1 : -1)),
        sortConditions: { qtyUp: true },
      }));
    } else if (this.state.sortConditions.qtyUp) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.qty < b.qty ? 1 : -1)),
        sortConditions: { qtyDown: true },
      }));
    } else if (this.state.sortConditions.qtyDown) {
      this.setState({ sortConditions: {} }, this.sortOrders);
    }
  };

  sortByDescription = () => {
    if (
      this.state.sortConditions.descriptionUp ===
      this.state.sortConditions.descriptionDown
    ) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.description > b.description ? 1 : -1)),
        sortConditions: { descriptionUp: true },
      }));
    } else if (this.state.sortConditions.descriptionUp) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.description < b.description ? 1 : -1)),
        sortConditions: { descriptionDown: true },
      }));
    } else if (this.state.sortConditions.descriptionDown) {
      this.setState({ sortConditions: {} }, this.sortOrders);
    }
  };

  sortByDimensions = () => {
    if (
      this.state.sortConditions.dimensionsUp ===
      this.state.sortConditions.dimensionsDown
    ) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.dimensions > b.dimensions ? 1 : -1)),
        sortConditions: { dimensionsUp: true },
      }));
    } else if (this.state.sortConditions.dimensionsUp) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.dimensions < b.dimensions ? 1 : -1)),
        sortConditions: { dimensionsDown: true },
      }));
    } else if (this.state.sortConditions.dimensionsDown) {
      this.setState({ sortConditions: {} }, this.sortOrders);
    }
  };

  sortByStatus = () => {
    if (
      this.state.sortConditions.statusUp ===
      this.state.sortConditions.statusDown
    ) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.status > b.status ? 1 : -1)),
        sortConditions: { statusUp: true },
      }));
    } else if (this.state.sortConditions.statusUp) {
      this.setState((prevState) => ({
        items: []
          .concat(prevState.items)
          .sort((a, b) => (a.status < b.status ? 1 : -1)),
        sortConditions: { statusDown: true },
      }));
    } else if (this.state.sortConditions.statusDown) {
      this.setState({ sortConditions: {} }, this.sortOrders);
    }
  };

  inviteParticipant = () => {
    if (
      window.confirm(
        `Confirm your invitation for ${this.state.inviteEmail} to join the discussion for "${this.state.selectedEvent.name}" event`
      )
    ) {
      EventService.invite({
        eventId: this.state.selectedEvent.id,
        email: this.state.inviteEmail,
      });
      this.setState({ inviteEmail: "" });
    }
  };

  onEmailChange = (e) => {
    this.setState({ inviteEmail: e.currentTarget.value });
  };

  getLayoutNotification = (data, id) => {
    NotificationService.getLayoutForNotifications(data).then((result) => {
      if (result.message === "Succes") {
        this.onItemClick(result.data);
        var selectedAsset = result.data.assets.filter(el => el.id === id);
        this.selectAsset(selectedAsset[0]);
        this.setState({ openNotifications: false });
        this.readNotification(data);
      }
    })

  }

  readNotification(notification) {
    if (typeof notification.read === 'undefined') {
      NotificationService.readNotification(notification).then(
        (result) => {
          if (result.message === "Succes") {
            this.state.notifications && this.state.notifications.filter(el => el.notificationID === notification.notificationID).map((item) => {
              Object.assign(item, { read: true });
            });
            this.setState({ notificationCount: this.state.notificationCount - 1 })
          }
        }
      )
    }
  }

  readNotifications = (notifications) => {
    console.log(this.state);
    debugger;
    let success = false;
    NotificationService.readNotifications(notifications).then(
      (result) => {
        debugger;
        if (result.message === "Succes") {
          success = true;
          this.setState({ notifications: [] });
          this.setState({ notificationCount: 0 })
        }
      }
    )
  }

  onSearchChange = (e) => {
    var query = e.currentTarget.value;
    if (!!query) {
      query = query.toLowerCase();
      this.setState((prevState) => ({
        searchText: query,
        filteredItems: []
          .concat(prevState.items)
          .filter((item) => this.searchMatch(item, query)),
      }));
    } else {
      this.setState({ searchText: "", filteredItems: null });
    }
  };

  searchMatch = (item, query) => {
    return (
      item.order.toString().indexOf(query) >= 0 ||
      item.qty.toString().indexOf(query) >= 0 ||
      item.description.toLowerCase().indexOf(query) >= 0 ||
      item.dimensions.toLowerCase().indexOf(query) >= 0 ||
      item.status.toLowerCase().indexOf(query) >= 0
    );
  };

  removeParticipant = (email) => {
    if (
      window.confirm(
        `Confirm your action to remove ${email} from the discussion for "${this.state.selectedEvent.name}" event`
      )
    ) {
      EventService.removeParticipant({
        eventId: this.state.selectedEvent.id,
        email: email,
      });
      let updatedEvent = Object.assign({}, this.state.selectedEvent);
      updatedEvent.participants = [].concat(
        this.state.selectedEvent.participants.filter((p) => p.email !== email)
      );
      this.setState({ selectedEvent: updatedEvent });
    }
  };

  showChangePassword = (e) => {
    this.setState({ showInput: true });
  };

  hideChangePassword = (e) => {
    this.setState({ showInput: false });
  };

  forgotPasswordSubmitted = () => {
    const { newPassowrd } = this.state;
    const { confirmNewPassword } = this.state;
    const { currentPassword } = this.state;
    return (
      newPassowrd.length > 0 &&
      confirmNewPassword.length > 0 &&
      currentPassword.length > 0
    );
  };

  handleCurrentPassword = (e) => {
    this.setState({ currentPassword: e.target.value });
  };

  handleForgotPassword = (e) => {
    this.setState({ newPassowrd: e.target.value });
  };

  handleConfirmNewPassword = (e) => {
    this.setState({ confirmNewPassword: e.target.value });
  };

  handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassowrd !== this.state.confirmNewPassword) {
      this.setState({ passwordMatch: true }, () => {
        setInterval(() => {
          this.setState({ passwordMatch: false });
        }, 2000);
      });
      this.setState({ errors: true });
    } else {
      AuthService.changePassword(this.state.newPassowrd, this.state.currentPassword).then(
        (serverComment) => {
          if (serverComment.message === "Authorize") {
            this.setState({ showAuthorizeMessage: true }, () => {
              setInterval(() => {
                this.setState({ showAuthorizeMessage: false });
              }, 2000);
            });
          } else if (serverComment.message !== "Authorize") {
            this.setState({ errorMessage: serverComment.message })
            this.setState({ showUnauthorizeMessage: true }, () => {
              setInterval(() => {
                this.setState({ showUnauthorizeMessage: false });
              }, 2000);
            });
          }
        });
    }


  };

  toggleShow = () => {
    const { hiddenPassword } = this.state;
    this.setState({ hiddenPassword: !hiddenPassword });
  }

  showCurrentPassword = () => {
    const { hiddenCurrentPassword } = this.state;
    this.setState({ hiddenCurrentPassword: !hiddenCurrentPassword });
  }

  showNewPassword = () => {
    const { hiddenNewPassword } = this.state;
    this.setState({ hiddenNewPassword: !hiddenNewPassword });
  }

  showConfirmPassword = () => {
    const { hiddenConfirmPassword } = this.state;
    this.setState({ hiddenConfirmPassword: !hiddenConfirmPassword });
  }

  handleDropDownClick = () => {
    const { openDropdown } = this.state;
    this.setState({
      openDropdown: !openDropdown,
    });
  };

  showNotificationOnClick = () => {
    const { openNotifications } = this.state;
    this.setState({
      openNotifications: !openNotifications,
    });
  };

  showAboutPage = () => {
    this.setState({ showAbout: true });
  };

  hideAboutPage = () => {
    this.setState({ showAbout: false });
  };

  setLength = (event) => {
    event.Notifications.length = 0;
  }

  //Convert the pdf base64 into a blob that can be showed into the object for large pdfs
  showLargePdfs() {
    const pdfUint8Array = this.base64ToUint8Array(this.state.selectedAsset.image);
    var pdfBlob = new Blob([pdfUint8Array], { type: "application/pdf" });
    var pdfBlobUrl = URL.createObjectURL(pdfBlob);

    return pdfBlobUrl;

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
    const isChangePasswordEnabled = this.forgotPasswordSubmitted();
    let items = this.state.items;
    let selectedItem = this.state.selectedItem;
    let selectedAsset = this.state.selectedAsset;
    let user = this.state.user;
    let isApprover = false;
    if (
      this.state.selectedEvent &&
      this.state.selectedEvent.id &&
      this.state.user &&
      this.state.user.roles &&
      this.state.user.roles.length > 0
    ) {
      isApprover =
        this.state.user.roles.filter(
          (r) => r.eventID === this.state.selectedEvent.id
        )[0].role === "APPROVER";
    }
    return (
      <>
        {!this.state.isAuth ? (
          <Login login={this.init} />

        ) : (
          <>
            <Navigation
              logout={this.logout}
              user={user}
              query={this.state.searchText}
              queryChange={this.onSearchChange}
              showChangePassword={this.showChangePassword}
              openDropdown={this.state.openDropdown}
              handleDropDownClick={this.handleDropDownClick}
              closeDropDown={this.closeDropDown}
              showAboutPage={this.showAboutPage}
              openNotifications={this.state.openNotifications}
              showNotificationOnClick={this.showNotificationOnClick}
              userId={this.state.user.userId}
              notifications={this.state.notifications}
              getLayoutNotification={this.getLayoutNotification}
              readNotification={this.readNotification}
              notificationCount={this.state.notificationCount}
              readNotifications={this.readNotifications}
            />

            {this.state.showInput && (
              <div className="nexus-modal" style={{ width: "100%" }}>
                <i
                  className="fas fa-times"
                  style={{
                    color: "white",
                    position: "absolute",
                    right: "20px",
                    top: "10px",
                    cursor: "pointer",
                  }}
                  onClick={this.hideChangePassword}
                ></i>
                <div className="container">
                  <div className="row"></div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6" style={{ height: "100vh" }}>
                    <form
                      className="form align-middle w-75"
                      style={{
                        position: "absolute",
                        margin: "50%",
                        textAlign: "center",
                      }}
                    >
                      <h3 style={{ color: "white" }}>
                        Change your password{" "}
                        <em className="text-uppercase"></em>{" "}
                      </h3>
                      <div >
                        <label style={{ float: "left" }}>
                          Current Password:{" "}
                        </label>
                        <div className="input-group" >
                          <input
                            id="passwordID"
                            className={`form-control round-lg ${this.state.errors ? "error" : ""
                              }`}
                            type={this.state.hiddenCurrentPassword ? "password" : "text"}
                            name="currentPassword"
                            placeholder="Current password"
                            onChange={this.handleCurrentPassword}
                            required
                          />
                          <span className="input-group-text"><i className="fas fa-eye" onClick={this.showCurrentPassword} style={{ marginLeft: "2%", cursor: "pointer", fontSize: "20px" }}></i></span>
                        </div>
                      </div>
                      <div>
                        <label style={{ float: "left" }}>New password: {" "}</label>
                        <div className="input-group">
                          <input
                            id="newPasswordId"
                            className={`form-control round-lg ${this.state.errors ? "error" : ""
                              }`}
                            type={this.state.hiddenNewPassword ? "password" : "text"}
                            name="newPassword"
                            placeholder="New password"
                            onChange={this.handleForgotPassword}
                            required
                          />
                          <span className="input-group-text"><i className="fas fa-eye" onClick={this.showNewPassword} style={{ marginLeft: "2%", cursor: "pointer", fontSize: "20px" }}></i></span>
                        </div>

                      </div>
                      <div>
                        <label style={{ float: "left" }}>Confirm new password: {" "}</label>
                        <div className="input-group">
                          <input
                            id="newPasswordId"
                            className={`form-control round-lg ${this.state.errors ? "error" : ""
                              }`}
                            type={this.state.hiddenConfirmPassword ? "password" : "text"}
                            name="newPassword"
                            placeholder="Confirm new password"
                            onChange={this.handleConfirmNewPassword}
                            required
                          />
                          <span className="input-group-text"><i className="fas fa-eye" onClick={this.showConfirmPassword} style={{ marginLeft: "2%", cursor: "pointer", fontSize: "20px" }}></i></span>
                        </div>

                      </div>
                      <div className="form-group" style={{ marginTop: "30px" }}>
                        <div style={{ display: "inline-block" }}>
                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.handleChangePasswordSubmit}
                            disabled={!isChangePasswordEnabled}
                          >
                            Send
                          </button>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.hideChangePassword}
                            style={{ marginLeft: "10px" }}
                          >
                            Close
                          </button>
                        </div>
                        {this.state.passwordMatch && (
                          <p style={{ color: "white", margin: "5%" }}>
                            New password and confirm password are not the same.
                          </p>
                        )}
                        {this.state.showAuthorizeMessage && (
                          <p style={{ color: "white", margin: "5%", fontSize: "20px" }}>
                            Your password has been reset.
                          </p>
                        )}

                        {this.state.showUnauthorizeMessage && (
                          <p style={{ color: "white", margin: "5%", fontSize: "20px" }}>
                            {this.state.errorMessage}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {this.state.showAbout && (
              <div className="nexus-modal" style={{ width: "100%" }}>
                <img
                  style={{
                    position: "absolute",
                    height: "100vh",
                    zIndex: "1",
                  }}
                  src={LOGIN_BRANDING_IMAGE}
                  alt=""
                />
                <img
                  style={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                  }}
                  src={BG_IMAGE}
                ></img>
                <i
                  className="fas fa-times"
                  style={{
                    color: "white",
                    position: "absolute",
                    right: "20px",
                    top: "10px",
                    cursor: "pointer",
                  }}
                  onClick={this.hideAboutPage}
                ></i>

                <div className="container">
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-7" style={{ height: "100vh" }}>
                      <form
                        className="form align-middle w-75"
                        style={{
                          position: "absolute",
                          margin: "30%",
                          textAlign: "center",
                        }}
                      >
                        <h3 style={{ color: "white" }}>
                          <em className="text-uppercase">Updates</em>
                        </h3>
                        <ul style={{ textAlign: "left" }}>
                          <li>
                            Introducing notifications for new items that are in the “Review” state. Users associated with the event will receive emails as well as a list of items to be reviewed in the app.
                          </li>
                          <li style={{ marginTop: "10px" }}>
                            Default sort will now show items by status and in alphabetical order.
                          </li>
                          <li style={{ marginTop: "10px" }}>
                            Attachments and text can be sent separately.
                          </li>
                          <li style={{ marginTop: "10px" }}>
                            The “Rework” button will be unavailable until user input is received.
                          </li>
                          <li style={{ marginTop: "10px" }}>
                            Time stamp for user input and reworked items is now synced.
                          </li>
                        </ul>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.preview && (
              <div className="nexus-modal" onClick={this.closePreview}>
                <i
                  className="fas fa-times"
                  style={{
                    color: "white",
                    position: "absolute",
                    right: "20px",
                    top: "10px",
                    cursor: "pointer",
                  }}
                ></i>
                {this.state.selectedAsset.image &&
                  this.state.selectedAsset.image.indexOf("image/") > -1 && (
                    <img
                      className="img-fluid nexus-modal-content"
                      src={this.state.selectedAsset.image}
                      alt=""
                    />
                  )}
                {this.state.selectedAsset.image &&
                  this.state.selectedAsset.image.indexOf("application/") >
                  -1 && (
                    <object
                      className="img-fluid"
                      data={this.showLargePdfs()}
                      style={{
                        height: "100vh",
                        width: "95%",
                        display: "block",
                        margin: "0 auto",
                      }}
                    >
                      Document missing
                    </object>
                  )}
              </div>
            )}

            <div className="container-fluid">
              {this.state.noEventsMessage !== "" ? (
                <div></div>
              ) : (
                <div className="row">
                  {this.state.events &&
                    this.state.events.map((event, index) => (
                      <span key={index}>
                        {
                          event && event.Notifications && event.Notifications.length > 0 ? (
                            <img
                              style={{
                                height: "10vh", cursor: "pointer", border: "2px solid orange"
                              }}
                              className={`img-fluid m-2 ${event.id === this.state.selectedEvent.id && "selected"
                                }`}
                              src={event.logo}
                              alt={event.name}
                              key={event.id}
                              onClick={() => {
                                this.loadOrders(event);
                                this.loadNotificationForSelectedEvent(event.id);
                                this.setLength(event)
                              }}
                            />) : (
                            <img
                              style={{
                                height: "10vh", cursor: "pointer"
                              }}
                              className={`img-fluid m-2 ${event.id === this.state.selectedEvent.id && "selected"
                                }`}
                              src={event.logo}
                              alt={event.name}
                              key={event.id}
                              onClick={() => {
                                this.loadOrders(event);
                                this.loadNotificationForSelectedEvent(event.id)
                              }}
                            />
                          )
                        }
                        {
                          event && event.Notifications && event.Notifications.length > 0 &&
                          <span class="badge badge-notify">{event.Notifications.length}</span>
                        }
                      </span>


                    ))}
                </div>
              )}

              {this.state.selectedEvent.id && (
                <div className="row mb-2">
                  {isApprover && (
                    <div className="input-group col-md-2">
                      <input
                        type={"email"}
                        value={this.state.inviteEmail}
                        onChange={this.onEmailChange}
                        className="form-control"
                        placeholder={"Participant email invite"}
                      />
                      <div class="input-group-append">
                        <button
                          onClick={this.inviteParticipant}
                          className="btn btn-primary"
                          title="Add/Invite participant"
                        >
                          <i className="fas fa-user-plus"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="col-10">
                    {this.state.selectedEvent.participants.map((p, i) => (
                      <span key={i} className="ml-2" title={p.email}>
                        {p.isActive
                          ? `${p.firstName} ${p.lastName} `
                          : `${p.email} `}
                        {p.isApprover && (
                          <i
                            style={{ color: "green" }}
                            className="fas fa-check"
                          ></i>
                        )}
                        {!p.isApprover &&
                          (isApprover ? (
                            <i
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => {
                                this.removeParticipant(p.email);
                              }}
                              title="Remove participant from event discussion"
                              className="fas fa-user-times"
                            ></i>
                          ) : (
                            <i className="fas fa-user"></i>
                          ))}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                {
                  <h3
                    style={{
                      marginTop: "55px",
                      marginLeft: "10px",
                      textAlign: "center",
                    }}
                  >
                    {this.state.noEventsMessage}
                  </h3>
                }
              </div>
              <div className="row">
                {this.state.noEventsMessage !== "" ? (
                  <div></div>
                ) : (
                  <div className="col-md-4">
                    <OrderOverview
                      items={this.state.filteredItems || items}
                      selectedItem={selectedItem}
                      onClick={this.onItemClick}
                      sort={this.state.sortConditions}
                      sortByOrder={this.sortByOrder}
                      sortByQty={this.sortByQty}
                      sortByDescription={this.sortByDescription}
                      sortByDimensions={this.sortByDimensions}
                      sortByStatus={this.sortByStatus}
                    />
                  </div>
                )}

                <div className="col-md-4">
                  {selectedItem && (
                    <OrderItemLayout
                      item={selectedItem}
                      selectAsset={this.selectAsset}
                      asset={selectedAsset}
                      preview={this.showPreview}
                      review={this.reviewAsset}
                    />
                  )}
                </div>
                <div className="col-md-4">
                  {selectedAsset &&
                    selectedAsset.versions &&
                    selectedAsset.versions.length > 0 && (
                      <Notes
                        comments={this.state.comments}
                        add={this.addComment}
                        addReply={this.addReply}
                        close={this.onClose}
                        approve={this.approveAsset}
                        rework={this.reworkAsset}
                        asset={selectedAsset}
                        user={user}
                        saveDraft={this.saveDraft}
                        participant={
                          this.state.user.roles.filter(
                            (r) => r.eventID === this.state.selectedEvent.id
                          )[0].role === "PARTICIPANT"
                        }
                        userId={this.state.user.userId}
                        eventId={this.state.selectedEvent.id}
                      />
                    )}
                </div>
              </div>
              {/* } */}
            </div>
          </>
        )}
      </>
    );
  }
}
