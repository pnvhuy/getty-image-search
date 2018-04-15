import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Search from "../src/Search";
import Thumb from "../src/Thumb";

import $ from "jquery";
// import milligram from "milligram";

var apiKey = "chmqrpx4dyzwv4dc9kcuszah";

// getLargeImage("83454811", data => console.log(JSON.stringify(data)));


function getSearchResults(phrase, callback) {
  $.ajax({
    type: "GET",
    url: "https://api.gettyimages.com/v3/search/images?fields=display_set",
    beforeSend: xhr => {
      xhr.setRequestHeader("Api-Key", apiKey);
    },
    data: { phrase: phrase },
    success: function(data) {
      console.log(data);
      callback(data);
    },
    fail: function(data, err) {
      console.log(data);
    }
  });
}

function getLargeImage(id, callback) {
  $.ajax({
    type: "GET",
    url: "https://api.gettyimages.com/v3/images/" + id + "?fields=display_set",
    beforeSend: xhr => {
      xhr.setRequestHeader("Api-Key", apiKey);
    },
    // data: { detail_set: true },
    success: function(data) {
      callback(data);
    },
    fail: function(data, err) {
      console.log(data);
    }
  });
}

var dictionary = [];
getDictionary();

function getDictionary(callback) {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/backup.txt",
    success: function(data) {
      let lines = data.split("\n");
      let words = [];

      for (let i = 0; i < lines.length; i++) {
        if (!words[lines[i].length - 1]) words[lines[i].length - 1] = [];

        words[lines[i].length - 1].push(lines[i]);
      }

      dictionary = words;
    },
    fail: function(data, err) {
      console.log(data);
    }
  });
}

function spellCheck(_word) {
  let word = _word.toLowerCase().replace(/[^a-z]/g, '');
  let sendBack = word;
  let found = false;

  let consonants = [];
  let locations = [];

  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i).match(/[bcdfghjklmnpqrstvwxyz]/)) {
      consonants.push({
        letter: word.charAt(i),
        location: i
      });

      locations.push(i);
    }
  }

  console.log(consonants);

  let length = word.length;
  let flag = false;

  for (let i = 0; i < dictionary[length - 1].length; i++) {
    let temp = dictionary[length - 1][i];

    if(word == temp) {
      sendBack = word;
      console.log("exact match!");
      break;
    }

    for (let j = 0; j < consonants.length; j++) {
      if (consonants[j].letter != temp.charAt(consonants[j].location).toLowerCase()) {
        flag = false;
        break;
      }

      flag = true;
    }

    if (flag) {
      for (let j = 0; j < temp.length; j++) {
        if (!locations.includes(j) && !temp.charAt(j).toLowerCase().match(/[aeiou]/)) {
          flag = false;
          break;
        }

        flag = true;
      }
    }

    if (flag) {
      if(!found) {
        found = temp;
      }
    }

    if (i === (dictionary[length - 1].length - 1)) {
      if(found) {
        sendBack = found;
        console.log("first found close: " + found);
      } else {
        sendBack = null;
        console.log("no matches");
      }
    }
  }

  return sendBack;
}

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
      modal: false,
    });
    console.log("handled");
  }

  handleSearch(_phrase) {
    let phrase = spellCheck(_phrase);
    this.setState({
      phrase: phrase,
      attempted: true
    });

    if(phrase != null) {
      getSearchResults(phrase, data => this.setState({ data: data }));
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
    const images = this.state.data && this.state.data.images ? this.state.data.images : [];
    const html = images.map((image, index) => {
      if (
        image.display_sizes &&
        image.display_sizes.length &&
        image.display_sizes[0].uri
      ) {
        return (
          <Thumb key={index} sizes={image.display_sizes} clickHandler={this.handleThumb} />
        );
      }
    });

    let resultText = "";

    if (this.state.attempted) {
      if (this.state.phrase) {
        resultText = <p>Search results for <u>{this.state.phrase}</u></p> ;
      } else {
        resultText = <p>Could not find any matches</p>;
      }
    }

    return (
      <div class="container">
        <div class="row">
            <h1>Getty Image Search</h1>
        </div>

        <div class="row">
            <Search clickHandler={this.handleSearch} />
            {resultText}
        </div>

        <div class="images">
            {this.state.phrase ? html : ""}
        </div>

        <div class="modal" onClick={() => this.handleModal()} style={this.state.modal ? {display: "block"} : {display: "none"} }>
           <img src={this.state.modalURL} /> 
        </div>
        
      </div>
    );
  }
}

export default App;
