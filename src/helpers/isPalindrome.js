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
      throw 'High surrogate without following low surrogate';
    }
    let next = str.charCodeAt(i + 1);
    if (0xDC00 > next || next > 0xDFFF) {
      throw 'High surrogate without following low surrogate';
    }
    return str.charAt(i) + str.charAt(i + 1);
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw 'Low surrogate without preceding high surrogate';
  }
  let prev = str.charCodeAt(i - 1);

  // (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 > prev || prev > 0xDBFF) {
    throw 'Low surrogate without preceding high surrogate';
  }
  // We can pass over low surrogates now as the second component
  // in a pair which we have already processed
  return false;
}

//TODO: ignore punctuations and spaces
//Check valid english locale name
function isPalindrome(str, locale='en') {
  if (str == null) {
    return false
  }

  if (!locale) {
    throw new Error('isPalindrome: no locale is specified')
  }

  try {
    let leftChar, rightChar
    for (let i = 0, j=str.length-1; i < j;) {
      if ((leftChar = getWholeChar(str, i++)) === false) {
        continue;
      }

      if ((rightChar = getWholeChar(str, j--)) === false) {
        continue;
      }
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
