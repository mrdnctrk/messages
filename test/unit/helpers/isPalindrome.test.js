const assert = require('assert')
const isPalindrome = require('../../../src/helpers/isPalindrome')

describe('isPalindrome tests', () => {

  const testCases =
  [
    {str: undefined, result: false},
    {str: null, result: false},
    {str: '', result: true},
    {str: 'a', result: true},
    {str: 'aa', result: true},
    {str: 'ab', result: false},
    {str: 'aba', result: true},
    {str: 'abA', result: true},
    //string with accent
    {str: 'réifier', result: true},
    //test string containing surrogate pairs
    {str: '😀', result: true},
    {str: '😎aA😎', result: true},
    {str: '😎😀', result: false},
  ]

  for (let testCase of testCases) {
    it(`'${testCase.str}' is ${testCase.result ? '' : 'not '}a palindrome`, () => {
      assert.equal(isPalindrome(testCase.str), testCase.result)
    })
  }





})
