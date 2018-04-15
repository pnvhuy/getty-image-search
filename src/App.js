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
      search: {
        phrase: null,
        attempted: false
      },
      modal: {
        show: false,
        image: null
      }
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleThumb = this.handleThumb.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleSearch(_phrase) {
    let phrase = spellCheck(_phrase);
    this.setState({
      search: {
        phrase: phrase,
        attempted: true
      }
    });

    if (phrase != null) {
      Server.getGettyImages(phrase, data => this.setState({ data: data }));
    }
  }

  handleThumb(image) {
    this.setState({
      modal: {
        show: true,
        image: image
      }
    });
  }

  handleModal() {
    this.setState({
      modal: {
        show: false,
        image: null
      }
    });
  }

  render() {
    const arrImg =
      this.state.data && this.state.data.images ? this.state.data.images : [];
    const images = arrImg.map((image, index) => {
      return (
        <Thumb key={index} image={image} clickHandler={this.handleThumb} />
      );
    });

    return (
      <div>
        <h1>Getty Image Search</h1>

        <Search search={this.state.search} clickHandler={this.handleSearch} />

        <div className="images">{this.state.search.phrase ? images : null}</div>

        <Modal
          clickHandler={this.handleModal}
          show={this.state.modal.show}
          image={this.state.modal.image}
        />
      </div>
    );
  }
}

export default App;
