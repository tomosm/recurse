// Write code that takes some Lisp code and returns an abstract syntax tree.
// The AST should represent the structure of the code and the meaning of each token. For example,
// if your code is given "(first (list 1 (+ 2 3) 9))",
// it could return a nested array like ["first", ["list", 1, ["+", 2, 3], 9]].

var module = module || {};
module.exports || (module.exports = {});

// Define modules.
(function () {

  'use strict';

  /**
   * A lisp parser class.
   *
   * @constructor
   */
  let LispParser = function () {
  };

  /**
   * It convert to Number object if value is a type of number.
   *
   * @param val value
   * @returns {*} Number object if value is a type of number or otherwise value.
   */
  let toNumber = function (val) {
    if (isNaN(Number(val))) {
      return val;
    }
    return Number(val);
  };

  /**
   * It parses string as a value.
   *
   * @param string parse string
   * @param cursor position
   * @returns {*[]} [a value, position]
   */
  let parseValue = function (string, cursor) {
    var value = '';
    var i = cursor, l = string.length;

    for (; i < l; i++) {
      let c = string[i];
      switch (c) {
      case '(':
      case ')':
        return [toNumber(value), i - 1];
      case ' ':
        return [toNumber(value), i];
        break;
      default:
        value += c;
        break;
      }
    }
    return [value, i];
  };

  /**
   * It parses string as an array.
   *
   * @param string parse string
   * @param cursor position
   * @returns {*[]} [an array, position]
   */
  let parseArray = function (string, cursor) {
    var array = [];
    var i = cursor, l = string.length;

    for (; i < l; i++) {
      let c = string[i];
      switch (c) {
      case '(':
        let [newArray, curArray] = parseArray(string, i + 1);
        i = curArray;
        array.push(newArray);
        break;
      case ')':
        return [array, i + 1];
      case ' ':
        break;
      default:
        let [newVal, curVal] = parseValue(string, i);
        i = curVal;
        array.push(newVal);
        break;
      }
    }

    return [array, i + 1];
  };

  /**
   * It parses lisp formatted string as an array.
   * ex) "(first (list 1 (+ 2 3) 9))" => ["first", ["list", 1, ["+", 2, 3], 9]]
   *
   * @param string parse string
   * @returns {*[]} null if parse string is null or otherwise an array
   */
  LispParser.parse = function (string) {
    if (string === null) {
      return null;
    } else if (string === undefined || string.trim() === '') {
      throw new SyntaxError(string);
    }
    return parseArray(string.trim(), 1)[0];
  };

  exports.LispParser = LispParser;

})(module.exports);


// Run tests.
(function (exports) {

  // import modules.
  let LispParser = exports.LispParser;

  //
  // "(first (list 1 (+ 2 3) 9))"
  // => ["first", ["list", 1, ["+", 2, 3], 9]]
  //
  console.log(LispParser.parse('(first (list 1 (+ 2 3) 9))'));

  // null.
  console.log(LispParser.parse(null));

})(module.exports);
