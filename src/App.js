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
      gallery: {
        images: [],
        loading: false
      },
      search: {
        phrase: null,
        attempted: false //for hiding no results initially
      },
      modal: {
        show: false,
        image: null
      }
    };

    //binds so have access to this in functions
    this.handleSearch = this.handleSearch.bind(this);
    this.handleThumb = this.handleThumb.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleSearch(_phrase) {
    //spell checker
    let phrase = spellCheck(_phrase);

    this.setState({
      search: {
        phrase: phrase,
        attempted: true
      }
    });

    if (phrase != null) {
      this.setState({
        gallery: {
          images: [],
          loading: true
        }
      });

      Server.getGettyImages(phrase, data =>
        this.setState({
          gallery: {
            images: data.images,
            loading: false
          }
        })
      );
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
    let images = null;
    if (!this.state.gallery.loading) {
      if (this.state.gallery.images.length) {
        images = this.state.gallery.images.map((image, index) => {
          return (
            <Thumb key={index} image={image} clickHandler={this.handleThumb} />
          );
        });
      } else {
        images = (
          <p>
            <b>No results for search term, please try another word.</b>
          </p>
        );
      }
    } else {
      images = (
        <p>
          <b>Loading...</b>
        </p>
      );
    }

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
