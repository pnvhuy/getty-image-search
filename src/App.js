import React, { Component } from "react";

import "./App.css";

import Search from "./components/Search";
import Thumb from "./components/Thumb";
import Modal from "./components/Modal";

import Server from "./services/Server";

import spellCheck from "./helpers/spellCheck";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      phrase: null,
      attempted: false,
      modal: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleThumb = this.handleThumb.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.setState({
      modal: false
    });
    console.log("handled");
  }

  handleSearch(_phrase) {
    let phrase = spellCheck(_phrase);
    this.setState({
      phrase: phrase,
      attempted: true
    });

    if (phrase != null) {
      Server.getGettyImages(phrase, data => this.setState({ data: data }));
    }
  }

  handleThumb(src) {
    // console.log(src);
    this.setState({
      modal: true,
      modalURL: src
    });
  }

  render() {
    const images =
      this.state.data && this.state.data.images ? this.state.data.images : [];
    const html = images.map((image, index) => {
      if (
        image.display_sizes &&
        image.display_sizes.length &&
        image.display_sizes[0].uri
      ) {
        return (
          <Thumb
            key={index}
            sizes={image.display_sizes}
            clickHandler={this.handleThumb}
          />
        );
      }
    });

    let resultText = "";

    if (this.state.attempted) {
      if (this.state.phrase) {
        resultText = (
          <p>
            Search results for <u>{this.state.phrase}</u>
          </p>
        );
      } else {
        resultText = <p>Could not find any matches</p>;
      }
    }

    return (
      <div>
        <div className="row">
          <h1>Getty Image Search</h1>
        </div>

        <div className="row">
          <Search clickHandler={this.handleSearch} />
          {resultText}
        </div>

        <div className="images">{this.state.phrase ? html : ""}</div>

        <div
          className="modal"
          onClick={() => this.handleModal()}
          style={this.state.modal ? { display: "block" } : { display: "none" }}
        >
          <img src={this.state.modalURL} />
        </div>
      </div>
    );
  }
}

export default App;
