import axios from "axios";
import credentials from "../config/credentials";

var Server = {
  getGettyImages: function(phrase, callback) {
    axios
      .get("https://api.gettyimages.com/v3/search/images", {
        headers: {
          "Api-key": credentials.api_key
        },
        params: {
          phrase: phrase,
          fields: "display_set"
        }
      })
      .then(response => {
        callback(response.data);
      })
      .catch(response => {
        console.log("error: " + response);
      });
  },

  getDictionary: function(callback) {
    axios
      .get(
        "https://raw.githubusercontent.com/pnvhuy/getty-image-search/master/public/backup.txt",
        {
          params: {
            fields: "display_set"
          }
        }
      )
      .then(response => {
        let lines = response.data.split("\n");
        let words = [];

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
