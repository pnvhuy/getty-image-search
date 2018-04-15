import Server from "../services/Server";

let dictionary = [];

Server.getDictionary(data => {
  dictionary = data;
});

export default function spellCheck(_word) {
  //strip everything but alphabet characters
  let searchWord = _word.toLowerCase().replace(/[^a-z]/g, "");
  let word = searchWord;
  let firstFound = false;

  let consonants = [];
  let locations = []; //parallel consonant for includes()

  //find and note position of all consonants in word
  for (let i = 0; i < searchWord.length; i++) {
    if (searchWord.charAt(i).match(/[bcdfghjklmnpqrstvwxyz]/)) {
      consonants.push(searchWord.charAt(i));

      locations.push(i);
    }
  }

  let wordLength = searchWord.length;
  let flag = false;

  //iterate through array of words with specified length
  for (let i = 0; i < dictionary[wordLength - 1].length; i++) {
    let dictionaryWord = dictionary[wordLength - 1][i];

    //firstFound exact match so exit
    if (searchWord === dictionaryWord) {
      word = searchWord;
      break;
    }

    //check if consonants are correct and in right position
    for (let j = 0; j < consonants.length; j++) {
      if (consonants[j] !== dictionaryWord.charAt(locations[j]).toLowerCase()) {
        flag = false;
        break;
      }

      flag = true;
    }

    //check if all other letters are vowels
    if (flag) {
      for (let j = 0; j < dictionaryWord.length; j++) {
        if (
          !locations.includes(j) &&
          !dictionaryWord
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

    //first eligible word
    if (flag) {
      if (!firstFound) {
        firstFound = dictionaryWord;
      }
    }

    //no exact match so send first eligible word
    if (i === dictionary[wordLength - 1].length - 1) {
      if (firstFound) {
        word = firstFound;
      } else {
        //return null if no spell correction available
        word = null;
      }
    }
  }

  return word;
}
