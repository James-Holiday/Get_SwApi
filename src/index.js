import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class App extends React.Component {
  state = {
    characters: []
  };

  getCharacter = async i => {
    let { characters } = this.state;
    let res = await axios.get(`https://swapi.co/api/people/${i}/`);
    characters.push(res);
    this.setState({ characters });
    return res;
  };

  componentDidMount() {
    let ids = Array.from({ length: 6 }, (v, k) => k + 1);
    Promise.all(ids.map(id => this.getCharacter(id)));
  }

  render() {
    const { characters } = this.state;
    return (
      <div>
        {characters.map((c, index) => (
          <p key={index}>
            {index}. {c.data.name},{index}. {c.data.height},{index}.{" "}
            {c.data.mass},{index}. {c.data.birth_year},{index}. {c.data.gender}
          </p>
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
