import Button from "@restart/ui/esm/Button";
import React from "react";
import { BASE_URL } from "../config";

class CrudDb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      user: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
    console.log("fetch");
  }

  getAllUsers() {
    const url = `${BASE_URL}/api/users`;
    // var searchQuery = this.state.searchQuery;
    const requestOptions = {
      method: "GET",
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result");
          console.log(result);
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
  deleteAllUsers() {
    const url = `${BASE_URL}/api/deleteAllUsers`;
    // var searchQuery = this.state.searchQuery;
    const requestOptions = {
      method: "DELETE",
    };
    fetch(url, requestOptions).then(
      (result) => {
        console.log("result");
        console.log(result);
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
  AddUser() {
    const url = `${BASE_URL}/api/addUser`;
    var user = JSON.stringify({
      email: this.state.user.email,
      name: this.state.user.name,
    });

    console.log("user_json");
    console.log(user);

    const requestOptions = {
      method: "POST",
      body: user,
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
    this.getAllUsers();
  }
  handleNameChange(event) {
    console.log("handleNameChange");

    this.state.user.name = event.target.value;
    console.log(this.state.user);
  }
  handleEmailChange(event) {
    console.log("handleEmailChange");

    this.state.user.email = event.target.value;
    console.log(this.state.user);
  }
  handlePhoneChange(event) {
    console.log("handlePhoneChange");

    this.state.user.phone = event.target.value;
    console.log(this.state.user);
  }

  render() {
    const { error, isLoaded, result } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="page">
          <h1>Count : {result ? result.length : "0"} </h1>
          <div style={{ marginTop: "20px" }}>
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="name"
                type="text"
                value={this.state.value}
                onChange={this.handleNameChange}
              />
              <input
                placeholder="email"
                type="text"
                value={this.state.value}
                onChange={this.handleEmailChange}
              />
            </form>
          </div>
          {this.state.user}
          <Button onClick={this.AddUser.bind(this)}>Add User</Button>
          <Button onClick={this.deleteAllUsers.bind(this)}>Delete All</Button>

          {result ? (
            <table style={{ marginTop: "40px" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      );
    }
  }
}

export default CrudDb;
