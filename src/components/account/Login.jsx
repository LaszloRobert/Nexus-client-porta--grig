import React, { Component } from "react";
import AuthService, { AUTH } from "../../services/AuthService";
import { BG_IMAGE, LOGIN_BRANDING_IMAGE, EULA } from "../../AppSettings";
import "./Login.css";

export default class Login extends Component {
    displayName = Login.name;
    state = {
        email: "",
        forgotEmail: "",
        password: "",
        loginErrorMessage: "",
        eula: true
    };

    componentDidMount() {
        if (AUTH && AUTH.expires_in < Date.now()) {
            AuthService.logout();
        }
    }

    handleMailChange = e => {
        let mail = e.target.value.trim();
        this.setState({ email: mail, loginErrorMessage: "" });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value, loginErrorMessage: "" });
    };

    handleEulaChange = e => {
        this.setState(prevState => ({ eula: !prevState.eula }));
    };

    handleForgotPassword = e => {
        this.setState({ forgotEmail: e.target.value });
    }

    canBeSubmitted() {
        const { email, password } = this.state;
        return email.length > 0 && password.length > 0;
    }

    forgotPasswordSubmitted() {
        const { forgotEmail } = this.state;
        return forgotEmail.length > 0;
    }

    showTerms = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ previewTerms: true });
    };

    hidePreview = () => {
        this.setState({ previewTerms: false });
    };

    showChangePassword = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ showInput: true });
    };

    hideChangePassword = () => {
        this.setState({ showInput: false });
    };

    handleChangePasswordSubmit = e => {
        e.preventDefault();
        AuthService.changePassword(this.state.forgotEmail);
    }

    handleSubmit = e => {
        e.preventDefault();
        AuthService.login(
            this.state.email,
            this.state.password,
            this.handleLoginResponse
        ).then(response => {
            if (response && response["access_token"]) {
                this.props.login();
            } else {
                this.setState({ loginErrorMessage: "Invalid email or password!" });
            }
        });
    };

    handleLoginResponse = response => {
        this.validateForm();
        if (response.status === "succes") {
        } else {
            let validationToModify = { ...this.state.validation };
            validationToModify.response =
                "This combination of Email and password doesn't exist!";
            validationToModify.email = "";
            validationToModify.password = "";
            this.setState({
                validation: validationToModify
            });
        }
    };

    render() {
        const isEnabled = this.canBeSubmitted();
        const isChangePasswordEnabled = this.forgotPasswordSubmitted();
        return (
            <div
                style={{
                    height: "100vh"
                }}
            >
                <img
                    style={{ position: "absolute", height: "100vh", zIndex: "1" }}
                    src={LOGIN_BRANDING_IMAGE}
                    alt=""
                />
                <img
                    style={{ position: "absolute", width: "100vw", height: "100vh" }}
                    src={BG_IMAGE}
                    alt=""
                />

                {this.state.previewTerms && (
                    <div className="nexus-modal" onClick={this.hidePreview}>
                        <i
                            className="fas fa-times"
                            style={{
                                color: "white",
                                position: "absolute",
                                right: "20px",
                                top: "10px",
                                cursor: "pointer"
                            }}
                        ></i>
                        <object className="nexus-modal-content" data={EULA}>
                            Document missing
                        </object>
                    </div>
                )}

                {this.state.showInput && (
                    <div className="nexus-modal">
                        <i
                            className="fas fa-times"
                            style={{
                                color: "white",
                                position: "absolute",
                                right: "20px",
                                top: "10px",
                                cursor: "pointer"
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
                                        textAlign: "center"
                                    }}
                                >
                                    <h3 style={{ color: "white" }}>
                                        Change Password to <em className="text-uppercase">Nexus</em>{" "} Client Portal
                                    </h3>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={this.handleForgotPassword}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            onClick={this.handleChangePasswordSubmit}
                                            disabled={!isChangePasswordEnabled}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6" style={{ height: "100vh" }}>
                            <form
                                className="form align-middle w-75"
                                style={{
                                    position: "absolute",
                                    margin: "50%",
                                    textAlign: "center"
                                }}
                            >
                                <h3 style={{ color: "white" }}>
                                    Sign in to <em className="text-uppercase">Nexus</em> Client
                                    Portal
                                </h3>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleMailChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={this.handlePasswordChange}
                                    />
                                </div>
                                <div
                                    className="form-group form-check"
                                    style={{ textAlign: "right" }}
                                >
                                    <input
                                        id="checkEula"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="eula"
                                        defaultChecked={this.state.eula}
                                        onChange={this.handleEulaChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        style={{ color: "white" }}
                                        htmlFor="checkEula"
                                    >
                                        You agree with our{" "}
                                        <span className="terms-link" onClick={this.showTerms}>
                                            Terms
                                        </span>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={
                                            !this.state.eula ||
                                            !isEnabled ||
                                            this.state.loginErrorMessage
                                        }
                                        onClick={this.handleSubmit}
                                    >
                                        {this.state.loginErrorMessage
                                            ? this.state.loginErrorMessage
                                            : this.state.eula
                                                ? "Log In"
                                                : "Please accept terms to continue"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
