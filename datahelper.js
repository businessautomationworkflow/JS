
/**
 * Utilities for generating random or mock data.
 * @module data_generation
 */

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random string of specified length using alphanumeric characters.
 * @param {number} length - Length of the string.
 * @returns {string} A random alphanumeric string.
 */
function getRandomString(length) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a valid 9-digit Dutch BSN using elfproef. No retries or brute force.
 * @returns {string}
 */
datahelper.generateBSN = function() {
  var d = Array.from({ length: 8 }, () => datahelper.getrandomint(1, 9));
  var sum = d.reduce((s, n, i) => s + n * (9 - i), 0);
  var c = sum % 11;

  if (c === 10) {
    d[7] = d[7] === 9 ? 8 : d[7] + 1;
    sum += (d[7] - 1) * 2; // update sum based on changed d[7]
    c = sum % 11;
    if (c === 10) c = 0;
  }

  return d.join('') + c;
};

/**
 * Generates a random date between two dates.
 * @param {Date|string|number} start - Start date.
 * @param {Date|string|number} end - End date.
 * @returns {Date} Random date between start and end.
 */
function getRandomDate(start, end) {
  var startTime = new Date(start).getTime();
  var endTime = new Date(end).getTime();
  return new Date(getRandomInt(startTime, endTime));
}

/**
 * Generates an array filled with random integers.
 * @param {number} length - Number of elements.
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number[]} Array of random integers.
 */
function getRandomIntArray(length, min, max) {
  return Array.from({ length }, () => getRandomInt(min, max));
}
	//Convert string number into a real number
	function string2Number(str) {
		if(!!str) {
			return Number(str);
		}
		return null;
	}
	
	//Convert number into a real string
	function number2String(num) {
		if(!!num) {
			return String(num);
		}
		return null;
	}


	//Make nvp object into a single value
	function nvp2Value(nvp) {
		if(!!nvp && nvp.value !== null && nvp.value !== "") {
			return nvp.value;
		}
	return null;
	}
	
	//Make nvp object into a single number
	function nvp2Number(nvp) {
		if(!!nvp && nvp.value !== null && nvp.value !== "") {
			return Number(nvp.value);
		}
		return null;
	}
	
	//Make two items into nvp
	function initNVP(numberVal,stringName) {
		var nvp = {};
		nvp.value = numberVal !==null ? String(numberVal) : "";
		nvp.name = stringName;
		return nvp;
}

	//Empty 0 to prevent DS error
	function zeroToNull(int) {
		if(int === 0) {
			return null;
		}
		return int;
	}
	
	//Nullable boolean to String
	function nulBoolean2String(boo) {
		if (boo === true){
			return String(tw.epv.OPTIONS_REF.Ja);	
		} else if (boo === false){
			return String(tw.epv.OPTIONS_REF.Nee);
		} else {return null}
	
}

	//String to Nullable boolean
	function string2NulBoolean(string) {
		if (string === String(tw.epv.OPTIONS_REF.Ja)){
			return true;				
		} else if (string === String(tw.epv.OPTIONS_REF.Nee)){
			return false;
		} else {return null}
	
}

/**
* Diacritic is a sign, such as an accent or cedilla, which when written above or below a letter indicates a difference in pronunciation from the same letter when unmarked or differently marked.
* These signs when serialized into a Database, depending of the encoding can occupy one or more characters.
* The practical impact is, if we have a DB field with 30 characters and we try to serialize 30charactes with one or more diacritics, we will not have enough space and the query will throw a error.
* To mitigate this issue, this function replaces every known diacritic with its normal letter, thus making sure one character only occupies one character in space.
* The downside is that diacritics are the proper way to write in a given language so we introduce typographic errors with this function.
* @param {string} s - The string to be cleaned from diacritics.
* @return {string} The same string with diacritics removed.
* @function removeDiacritics
* @global
*/
function removeDiacritics (s) {
    var diacritics = [
        [/[\300-\306]/g, 'A'],
        [/[\340-\346]/g, 'a'],
        [/[\310-\313]/g, 'E'],
        [/[\350-\353]/g, 'e'],
        [/[\314-\317]/g, 'I'],
        [/[\354-\357]/g, 'i'],
        [/[\322-\330]/g, 'O'],
        [/[\362-\370]/g, 'o'],
        [/[\331-\334]/g, 'U'],
        [/[\371-\374]/g, 'u'],
        [/[\321]/g, 'N'],
        [/[\361]/g, 'n'],
        [/[\307]/g, 'C'],
        [/[\347]/g, 'c'],
    ];
    for (var i = 0; i < diacritics.length; i++) {
        s = s.replace(diacritics[i][0], diacritics[i][1]);
    }
    return s;
}

/**
* Generates a guid. Uses Math.random() on hexadecimal values then converted to base 16 to get letters and numbers.
* @function guid
* @returns {string} Returns a string that represents a guid on the format s8-s4-s4-s4-s12 where each number represents the length of a string.
* @global
*/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/**
* Generates a random number between two numbers.
* @function getRndInt
* @param {integer} max - The upper boundary of interval of numbers to generate a number
* @param {integer} min - The lower boundary of interval of numbers to generate a number
* @returns {integer} A random number between max and min generated with Math.random()
* @global
*/
function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Creates a random string will have a random size between 5 and 10 characters. It uses {@link getRandomString} and {@link getRndInt} as auxiliary functions.
* @returns {string} A string that simulates a word with 5 to 10 characters.
* @function createWord
*/
function createWord() {
  return getRandomString(getRndInt(5,10));
}

/**
* Creates a sentence with a given amount of words. It uses {@link createWord} as auxiliary functions. Each word is separated with a blank space.
* @returns {string} A string that simulates a sentence with a given number of words.
* @param {number} numberOfWord - The number of requested words.
* @function createSentence
*/
function createSentence(numberOfWord) {
  var numberOfWord = numberOfWord;
  var wordList = [];
  for(var i = 0; i < numberOfWord; i++) {
    wordList.push(createWord());
  }
  return wordList.join(" ");
}

/**
* Creates a random number of sentences with a given amount of words. It uses {@link createSentence} as auxiliary functions. 
* Each word is separated with a blank space, while sentences are separated with a dot and blank space.
* @returns {string} A string that simulates a word with 5 to 10 characters.
* @param {number} numberOfWord - The number of requested words per sentence.
* @param {number} numberOfSentence - The number of requested sentences.
* @function createParagraph
*/
function createParagraph(numberOfSentence, numberOfWord) {
  var numberOfSentence = numberOfSentence;
  var sentenceList = [];
  for(var i = 0; i < numberOfSentence; i++) {
    sentenceList.push(createSentence(numberOfWord));
  }
  return sentenceList.join(". ");
} 

/**
* Creates a random document comprised of paragraphs. It uses {@link createParagraph} as auxiliary functions. Each paragraph is separated with a new line.
* @returns {string} A string that simulates a word with 5 to 10 characters.
* @param {number} numberOfSentence - The number of requested sentences.
* @param {number} numberOfWord - The number of requested words.
* @param {number} numberOfPararaph - The number of requested paragraphs.
* @function createDoc
*/
function createDoc(numberOfPararaph, numberOfSentence, numberOfWord) {
  var numberOfPara = numberOfPararaph;
  var paraList = [];
  for(var i = 0; i < numberOfPara;i++) {
    paraList.push(createParagraph(numberOfSentence, numberOfWord));
  }
  return  paraList.join("\n");
}
/**
 * String utility functions including UTF-8 encoding/decoding.
 * @module string_utils
 */

/**
 * Encodes a string into UTF-8.
 * @param {string} str - The input string.
 * @returns {Uint8Array} The UTF-8 encoded byte array.
 */
function encodeUtf8(str) {
  return new TextEncoder().encode(str);
}

/**
 * Decodes a UTF-8 encoded byte array back into a string.
 * @param {Uint8Array} bytes - The UTF-8 byte array.
 * @returns {string} The decoded string.
 */
function decodeUtf8(bytes) {
  return new TextDecoder().decode(bytes);
}

/**
 * Trims a string and returns an empty string if input is null or undefined.
 * @param {string|null|undefined} str - The input string.
 * @returns {string} A trimmed string or an empty string.
 */
function safeTrim(str) {
  return typeof str === 'string' ? str.trim() : '';
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The capitalized string.
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
