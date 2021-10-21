import React from "react";
import { BASE_URL } from "../config";

class TayaraUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
    };
  }

  componentDidMount() {
    this.getAllTayaraUsers();
    console.log("fetch");
  }

  handleInputChanged(event) {
    this.setState({
      searchQuery: event.target.value,
    });
    this.getAllTayaraUsers();
  }

  getAllTayaraUsers() {
    const url = `${BASE_URL}/api/getAllTayaraUsers`;
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
  render() {
    const { error, isLoaded, result } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var emails = this.extractEmails(result);
      var uniq = [...new Set(emails)];

      return (
        <div className="page">
          <h1>Count : {uniq.length} </h1>
          <ol className="rectangle-list">
            {uniq.map((item) => (
              <li>
                <a>{item}</a>
              </li>
            ))}
          </ol>
        </div>
      );
    }
  }
}

export default TayaraUsers;
