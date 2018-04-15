import Server from "../services/Server";

let dictionary = [];

Server.getDictionary(data => {
  dictionary = data;
});

export default function spellCheck(_word) {
  let word = _word.toLowerCase().replace(/[^a-z]/g, "");
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

  let length = word.length;
  let flag = false;

  for (let i = 0; i < dictionary[length - 1].length; i++) {
    let temp = dictionary[length - 1][i];

    if (word === temp) {
      sendBack = word;
      console.log("exact match!");
      break;
    }

    for (let j = 0; j < consonants.length; j++) {
      if (
        consonants[j].letter !==
        temp.charAt(consonants[j].location).toLowerCase()
      ) {
        flag = false;
        break;
      }

      flag = true;
    }

    if (flag) {
      for (let j = 0; j < temp.length; j++) {
        if (
          !locations.includes(j) &&
          !temp
            .charAt(j)
            .toLowerCase()
            .match(/[aeiou]/)
        ) {
          flag = false;
          break;
        }

        flag = true;
      }
    }

    if (flag) {
      if (!found) {
        found = temp;
      }
    }

    if (i === dictionary[length - 1].length - 1) {
      if (found) {
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
