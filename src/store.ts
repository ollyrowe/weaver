import { get, writable } from "svelte/store";
import { Action } from "./model/enums/Action";
import { Word } from "./model/Word";
import { TARGET_WORD_LENGTH } from "./misc/constants";
import { Letter } from "./model/Letter";
import type { KeyBinding } from "./model/enums/KeyBinding";

export const startWord = writable<Word>();

export const endWord = writable<Word>();

export const optimalScore = writable<number>();

export const attempts = writable<Word[]>([]);

const currentAttemptIndex = writable(0);

export const over = writable(false);

export const displayOutcome = writable(false);

export const initialiseGame = () => {
  // Get a random possible answer
  const pair = Word.getRandomPair();

  startWord.set(pair.firstWord);
  endWord.set(pair.secondWord);
  optimalScore.set(pair.optimalScore);

  reset();
};

export const reset = () => {
  // Reset over and display outcome state
  over.set(false);
  displayOutcome.set(false);

  const firstWord = get(startWord);
  const secondWord = get(endWord);

  // Update the states of the end word letters
  for (let i = 0; i < TARGET_WORD_LENGTH; i++) {
    const firstWordLetter = firstWord.letterAt(i)!;
    const secondWordLetter = secondWord.letterAt(i)!;

    const doLettersMatch = firstWordLetter.is(secondWordLetter);

    secondWordLetter.setCorrect(doLettersMatch);
  }

  endWord.set(secondWord);

  // Reset attempts state
  attempts.set([new Word()]);
  currentAttemptIndex.set(0);
};

/**
 * Keyboard key press callback which handles core game logic.
 */
export const onKeyPress = (event: CustomEvent<KeyBinding>) => {
  // If the game isn't already over
  if (!get(over)) {
    const key = event.detail;

    // Create a temporary new attempts object
    const updatedAttempts = [...get(attempts)];

    // The previous word attempt
    const previousWord =
      updatedAttempts[get(currentAttemptIndex) - 1] || get(startWord);
    // The current word attempt
    const currentWord = updatedAttempts[get(currentAttemptIndex)];
    // The target word
    const targetWord = get(endWord);

    // Invoke various behaviour based on the key pressed
    switch (key) {
      case Action.ENTER:
        if (currentWord.length === TARGET_WORD_LENGTH) {
          // Check that the word is a valid word and only one character has changed
          if (
            currentWord.isValid() &&
            getCharacterDiffCount(previousWord, currentWord) === 1
          ) {
            // Calculate the status of the letters in the current and target words
            calculateStatuses(currentWord, targetWord);

            // Calculate the diff statuses of the letters in the current word
            calculateDiffs(previousWord, currentWord);

            // Check if word is correct
            if (currentWord.is(targetWord)) {
              // Handle the game end
              over.set(true);
              displayOutcome.set(true);
            } else {
              // Move onto the next word attempt
              updatedAttempts.push(new Word());
              currentAttemptIndex.update((index) => index + 1);
            }
          } else {
            // Otherwise, shake the word!
            currentWord.shake();
          }
        } else {
          // Shake word to indicate not enough letters
          currentWord.shake();
        }

        break;
      case Action.BACKSPACE:
        // If the current word has at least one letter
        if (currentWord.length > 0) {
          // Remove the last letter from the end
          currentWord.removeLastLetter();
          // Update the active letter
          currentWord.letterAt(currentWord.length)?.setActive(true);
          // Ensure the game is no longer over
          over.set(false);

          // Reset the statuses of the current word
          currentWord.getLetters().forEach((letter) => {
            letter.setCorrect(false);
            letter.setActive(false);
          });

          // Calculate target word letter statuses based on previous word
          calculateStatuses(previousWord, targetWord);
        } else if (get(currentAttemptIndex) > 0) {
          // The word before the current previous
          const wordBeforePrevious =
            updatedAttempts[get(currentAttemptIndex) - 2] || get(startWord);

          // Move back to the previous word
          updatedAttempts.splice(-1, 1);
          currentAttemptIndex.update((index) => index - 1);

          // Reset the statuses of the previous word
          previousWord.getLetters().forEach((letter) => {
            letter.setCorrect(false);
            letter.setActive(false);
          });

          // Calculate target word letter statuses based on word before the previous
          calculateStatuses(wordBeforePrevious, targetWord);
        }
        break;
      default:
        if (currentWord.length < TARGET_WORD_LENGTH) {
          currentWord.addLetter(new Letter(key));
        }
        break;
    }

    attempts.set(updatedAttempts);
    endWord.set(targetWord);
  }
};

export const closeOutcome = () => {
  displayOutcome.set(false);
};

const calculateStatuses = (firstWord: Word, secondWord: Word) => {
  // The letters in each word
  const firstWordLetters = firstWord.getLetters();
  const secondWordLetters = secondWord.getLetters();

  // Calculate letter statuses
  for (let i = 0; i < TARGET_WORD_LENGTH; i++) {
    const firstWordLetter = firstWordLetters[i];
    const secondWordLetter = secondWordLetters[i];

    const doLettersMatch = firstWordLetter.is(secondWordLetter);

    firstWordLetter.setCorrect(doLettersMatch);
    secondWordLetter.setCorrect(doLettersMatch);
  }
};

const calculateDiffs = (previousWord: Word, currentWord: Word) => {
  // Loop through all of the letters in the previous word
  previousWord.getLetters().forEach((letter, index) => {
    // Get the letter at the same position in the current word
    const currentWordLetter = currentWord.letterAt(index)!;

    // If the two letters are different
    if (!letter.is(currentWordLetter)) {
      // Set the current word letter to be active
      currentWordLetter?.setActive(true);
    }
  });
};

const getCharacterDiffCount = (firstWord: Word, secondWord: Word) => {
  let diffCount = 0;

  // Loop through all of the letters in the first word
  firstWord.getLetters().forEach((letter, index) => {
    // Get the letter at the same position in the second word
    const secondWordLetter = secondWord.letterAt(index)!;

    // If the two letters are different
    if (!letter.is(secondWordLetter)) {
      // Increment the diff count
      diffCount++;
    }
  });

  return diffCount;
};

// Initialise a new game
initialiseGame();
