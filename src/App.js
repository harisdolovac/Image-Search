import React, { Component } from "react";
import axios from "axios";

export class App extends Component {
  state = {
    term: "",
    images: []
  };

  handleSubmit = e => {
    e.preventDefault();
  };
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      term: e.target.value
    });
  };

  handleClick = e => {
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: this.state.term },
        headers: {
          Authorization:
            "Client-ID 20d71ea3a4900214e3c814f0fa410aa6810e181a16ab7199b3c17fe9d5f6d299"
        }
      })
      .then(res => {
        console.log(res.data.results);
        this.setState({
          images: res.data.results
        });
      });
  };

  render() {
    //  console.log(this.state);

    return (
      <div className="jumbotron">
        <form onSubmit={this.handleSubmit}>
          <label>Image Search</label>
          <input className=" form-control" onChange={this.handleChange} />
          <button className="btn btn-danger" onClick={this.handleClick}>
            Image search
          </button>
        </form>
        <ul>
          {this.state.images.map(image => {
            return (
              <div
                key={image.id}
                className="card"
                style={{
                  width: "30rem",
                  height: "50rem",

                  display: "block"
                }}
              >
                <img
                  src={image.urls.regular}
                  alt={image.description}
                  style={{ marginBottom: "20px" }}
                />
                <li style={{ listStyleType: "none" }}>{image.description}</li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
