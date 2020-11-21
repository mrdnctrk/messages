/**
 * Given a string and an index returns a unicode string that represents a single code unit starting at the index.
 * For unicode characters that are in BMP, this results is the same as str.charAt(i).
 * For non-BMP characters, which consists of surrogate pairs in UTF-16, returns both code units that make up the unicode char.
 *
 * This function is taken from:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
 *
 * @param {string} str
 * @param {number} i
 * @returns {string|boolean}  - the string representing a single unicode code point that is found at index i of str
 *                            - false if the unicode character at index i is a low surrogate, which indicates
 *                              that this function needs to be called one more time with either i+1 or i-1
 *                              as the index depending on the direction of the iteration
 * @throws {Error}            - if it is detected that the code unit at index i cannot belond to a valid
 *                              unicode character, which indicates that the string is a not valid UTF-16 string
 */
function getWholeChar(str, i) {
  let code = str.charCodeAt(i);

  if (Number.isNaN(code)) {
    return ''; // Position not found
  }
  if (code < 0xD800 || code > 0xDFFF) {
    return str.charAt(i);
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 <= code && code <= 0xDBFF) {
    if (str.length <= (i + 1)) {
      throw new Error('High surrogate without following low surrogate');
    }
    let next = str.charCodeAt(i + 1);
    if (0xDC00 > next || next > 0xDFFF) {
      throw new Error('High surrogate without following low surrogate');
    }
    return str.charAt(i) + str.charAt(i + 1);
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw new Error('Low surrogate without preceding high surrogate');
  }
  let prev = str.charCodeAt(i - 1);

  // (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 > prev || prev > 0xDBFF) {
    throw new Error('Low surrogate without preceding high surrogate');
  }
  // We can pass over low surrogates now as the second component
  // in a pair which we have already processed
  return false;
}

/**
 * @typedef {Object} WholeChar
 * @property {string} char - a UTF-16 encoded string representing the code point found at index i of the string being iterated
 * @property {number} index - the index in the string where char is located
 */


/**
 * Creates an iterator to go over the unicode chars in a string in the forward direction (increasing indices)
 *
 * @param {object} args
 * @param {string} args.str - string to iterate
 * @param {number} [ags.startIndex] - position to start iterating to string, defaults to 0
 * @returns {Iterator<WholeChar>}
 */
function * getWholeCharsForward({str, startIndex = 0}) {
  let i = startIndex
  while (i< str.length){
    let char = getWholeChar(str, i)
    yield {char, index:i}
    i += char.length
  }
}

/**
 * Creates an iterator to go over the unicode chars in a string in the backward direction (decreasing indices)
 *
 * @param {object} args
 * @param {string} args.str - string to iterate
 * @param {number} [ags.startIndex] - position to start iterating to string, defaults to str.lenght - 1
 * @returns {Iterator<WholeChar>}
 */
function * getWholeCharsBackward({str, startIndex=str.length -1}) {
  let j = startIndex
  while ( j >= 0){
    let char = getWholeChar(str, j)

    if (char === false) {
      j--
      continue
    }

    yield {char, index:j}
    j -= char.length
  }

}

/**
 * Checks if a given string is a Palindrome where the check is
 *   - can be made locale aware by specifying a locale
 *   - uses base sensitivity which means, only strings that differ in base letters compare as unequal.
 *     i.e Ignores case and accents.
 *     Examples: a ≠ b, a = á, a = A.
 *   - Compares code points (whole characters) instead of code units. Thus it handles unicode characters utside BMP correctly.
 *     For example, in UTF-16, unicode code point for '😀' is encoded using two code units '\uD83D\uDE00'.
 *     Since code point is used instead of individual units, '😀' is correctly identified as a palindrome.
 *   - Invalid unicode strings are considered not palindromes
 *
 *   The algorithm is to iterate the string from the beginning and from the end characater by character
 *   and compare the current left character to the current right character. If left char is found to be
 *   not equivalent to right char, the string is not a palindrome. If the two iterators meet at the same index
 *   it means all left and correspond right characters are be equivalent, and hence the string is a palindrome.
 *
 *   Since each character in the string is iterated over once, and there is constant amount of work done in each iteration
 *   the running time of the algorithm is O(n) where n is the number of characters in the string.
 *
 * @param {string} str - string to check
 * @param {string} [locale]  - BCP 47 language tag, defaults to 'en'
 * @returns {boolean} - whether the string is a valid palindrome
 */
function isPalindrome({str, locale='en'}) {
  if (str == null) {
    return false
  }

  if (str.length === 0) {
    return true
  }

  if (!locale) {
    throw new Error('isPalindrome: no locale is specified')
  }

  try {
    let forwardIterator = getWholeCharsForward({str})
    let backwardIterator = getWholeCharsBackward({str})

    let {char: leftChar, index : i} = forwardIterator.next().value
    let {char: rightChar, index : j} = backwardIterator.next().value
    while (i < j) {
      //{ sensitivity: base } ignores char case and accents
      if (leftChar.localeCompare(rightChar, locale, {sensitivity: 'base'}) !== 0) {
        return false
      }

      ({char: leftChar, index : i} = forwardIterator.next().value);
      ({char: rightChar, index : j} = backwardIterator.next().value);

    }

    return true
  } catch (e) {
    //not a proper unicode string
    return false
  }
}

module.exports = isPalindrome
