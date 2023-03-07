import { Character } from "./enums/Character";

export class Letter {
  /** The character associated with the letter */
  private value: Character;
  /** Whether the letter is correct */
  private correct: boolean;
  /** Whether the letter should appear as active */
  private active: boolean;

  constructor(value: Character) {
    this.value = value;
    this.correct = false;
    this.active = false;
  }

  public isCorrect = () => {
    return this.correct;
  };

  public setCorrect = (correct: boolean) => {
    this.correct = correct;
  };

  public isActive = () => {
    return this.active;
  };

  public setActive = (active: boolean) => {
    this.active = active;
  };

  public getValue = () => {
    return this.value;
  };

  public is = (letter: Letter) => {
    return this.value.toLowerCase() === letter.value.toLowerCase();
  };
}
