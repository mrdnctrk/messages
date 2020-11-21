//TODO: could be separated to its own module
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
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

function * getWholeCharsForward(str, startingIndex = 0) {
  let i = startingIndex
  while (i< str.length){
    let char = getWholeChar(str, i)
    yield {char, index:i}
    i += char.length
  }
}

function * getWholeCharsBackward(str, startingIndex=str.length -1) {
  let j = startingIndex
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

function isPalindrome(str, locale='en') {
  if (str == null) {
    return false
  }

  if (!locale) {
    throw new Error('isPalindrome: no locale is specified')
  }

  try {
    let leftChar, rightChar
    let i=0, j= str.length - 1
    let forwardIterator = getWholeCharsForward(str, i)
    let backwardIterator = getWholeCharsBackward(str, j)
    while (i < j) {
      ({char: leftChar, index : i} = forwardIterator.next().value);
      ({char: rightChar, index : j} = backwardIterator.next().value);

      //{ sensitivity: base } ignores char case and accents
      if (leftChar.localeCompare(rightChar, locale, {sensitivity: 'base'}) !== 0) {
        return false
      }

    }

    return true
  } catch (e) {
    //not a proper unicode string
    return false
  }
}

module.exports = isPalindrome
