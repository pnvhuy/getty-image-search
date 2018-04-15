import axios from "axios";
import credentials from "../config/credentials";

var Server = {
  //Getty Images API
  getGettyImages: function(phrase, callback) {
    axios
      .get("https://api.gettyimages.com/v3/search/images", {
        headers: {
          "Api-key": credentials.api_key
        },
        params: {
          phrase: phrase,
          fields: "display_set, title"
        }
      })
      .then(response => {
        callback(response.data);
      })
      .catch(response => {
        console.log("error: " + response);
      });
  },

  //Dictionary text file hosted on GitHub
  getDictionary: function(callback) {
    axios
      .get(
        "https://raw.githubusercontent.com/pnvhuy/getty-image-search/master/public/dictionary.txt"
      )
      .then(response => {
        let lines = response.data.split("\n");
        let words = [];

        //creating a multidimensional array where words are grouped by length of the word
        for (let i = 0; i < lines.length; i++) {
          if (!words[lines[i].length - 1]) words[lines[i].length - 1] = [];

          words[lines[i].length - 1].push(lines[i]);
        }

        callback(words);
      })
      .catch(response => {
        console.log("error: " + response);
      });
  }
};

export default Server;
