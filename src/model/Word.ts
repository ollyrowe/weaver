import possibleAnswers from "../words/possible-answers.json";
import validWords from "../words/valid-words.json";
import { Character } from "./enums/Character";
import { Letter } from "./Letter";

export class Word {
  /** The length of the word */
  public length: number;
  /** The letters which make up the word */
  private letters: Letter[];
  /** Counter used to track shake events  */
  public shakeCount: number;

  constructor(...characters: Character[]) {
    this.length = characters.length;

    this.letters = [];

    this.shakeCount = 0;

    for (const character of characters) {
      this.letters.push(new Letter(character));
    }
  }

  public addLetter = (letter: Letter) => {
    this.letters.push(letter);
    this.length++;
  };

  public removeLastLetter = () => {
    if (this.letters.length > 0) {
      this.letters.pop();
      this.length--;
    }
  };

  public isValid = () => {
    return validWords.includes(this.toString());
  };

  public contains = (letter: Letter) => {
    return !!this.letters.find(letter.is);
  };

  public getLetters = () => {
    return this.letters;
  };

  public letterAt = (index: number): Letter | undefined => {
    return this.letters[index];
  };

  public is = (word: Word) => {
    return this.toString() === word.toString();
  };

  public shake() {
    this.shakeCount++;
  }

  public toString() {
    return this.letters
      .map((letter) => letter.getValue())
      .join("")
      .toLowerCase();
  }

  public static getRandomPair() {
    const { optimalScore, ...pair } =
      possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

    const firstWord = new Word(...(pair.firstWord.split("") as Character[]));
    const secondWord = new Word(...(pair.secondWord.split("") as Character[]));

    return { firstWord, secondWord, optimalScore };
  }
}
