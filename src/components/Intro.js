import React from "react";
import logo from "../assets/logo.svg";
import rmk from "../assets/react-mongo-kub.png";

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    console.log("fetch");

    fetch("http://127.0.0.1:8080/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result");
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error");

          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="page">
          <section>
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div>
              <img src={rmk} className="App-logo" alt="logo" />
            </div>
            <h1>Un Pti Démo</h1>
            <p>Conception,Développement ,Déploiement </p>
            <p>ReactJs,Golang ,Docker,Minikube</p>
          </section>
          {/* <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} {item.email}
              </li>
            ))}
          </ul> */}
        </div>
      );
    }
  }
}

export default Intro;
