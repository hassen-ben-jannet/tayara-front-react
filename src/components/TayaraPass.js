import React from "react";
import { BASE_URL } from "../config";

class TayaraPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      searchQuery: "+21695421449",
      user: [],
    };
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  componentDidMount() {
    this.getUserByPhone(this.state.searchQuery);
    console.log("fetch");
  }

  handlePhoneChanged(event) {
    this.setState({
      searchQuery: event.target.value,
    });
    console.log(this.state.searchQuery);
    this.getUserByPhone(event.target.value);
  }

  getUserByPhone(phone = this.state.searchQuery) {
    const url = `${BASE_URL}/api/getTayaraUser`;
    // var searchQuery = this.state.searchQuery;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ number: phone }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result");
          console.log(result);
          if (result["profile_id"]) {
            var profile_id = result["profile_id"];
            var info = result["info"];
            var name = this.extractName(info);
            var email = this.extractEmails(info)[0];
            this.setState({
              user: {
                profile_id: profile_id,
                email: email,
                name: name,
              },
            });
          }
          this.setState({
            isLoaded: true,
            result: result,
          });
        },
        (error) => {
          console.log("error");

          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  ChangePass() {
    const url = `${BASE_URL}/api/changeUserPass`;
    const user = this.state.user;
    console.log("user :::::");
    console.log(user);

    // var searchQuery = this.state.searchQuery;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(user),
    };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result");
          console.log(result);
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          console.log("error");

          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  extractEmails(text) {
    if (text == null) {
      return "";
    }
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  }
  extractName(text) {
    if (text == null) {
      return "";
    }
    var mySubString = text.substring(
      text.indexOf("*") + 2,
      text.indexOf("+216") - 2
    );
    return mySubString;
  }
  handlePassChange(event) {
    console.log("handlePassChange");

    this.state.user.password = event.target.value;
    console.log(this.state.user);
  }
  render() {
    const result_empty = this.state.result["profile_id"] ? false : true;
    console.log(result_empty);

    return (
      <div className="page">
        <section>
          <h1>Type a Phone Number</h1>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handlePhoneChanged.bind(this)}
          />
        </section>
        {result_empty ? (
          <p>Type a valid number starting +216</p>
        ) : (
          <div>
            <p>
              <strong>Profile ID : </strong>
              {this.state.result["profile_id"]}
            </p>
            <p>
              <strong>Email : </strong>
              {this.extractEmails(this.state.result["info"])[0]}
            </p>
            <p>
              <strong>Name : </strong>
              {this.extractName(this.state.result["info"])}
            </p>
            <input
              placeholder="password"
              minLength="6"
              type="text"
              value={this.state.value}
              onChange={this.handlePassChange}
            />
            <button onClick={this.ChangePass.bind(this)}>ChangePass</button>
            <p>{JSON.stringify(this.state.user)}</p>

            {/* <p>{this.state.result["info"]}</p> */}
          </div>
        )}
      </div>
    );
  }
}

export default TayaraPass;
