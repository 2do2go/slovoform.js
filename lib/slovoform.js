'use strict';

(function () {
	var exports = {};

	// fallback for node inherits
	var inherits;
	try {
		inherits = require('util').inherits;
	} catch (err) {

		var createObject = function(o) {
			function F() {}
			F.prototype = o;
			return new F();
		};

		inherits = function(ctor, superCtor) {
			ctor.super_ = superCtor;
			if (Object.create) {
				ctor.prototype = Object.create(superCtor.prototype, {
					constructor: {
						value: ctor,
						enumerable: false,
						writable: true,
						configurable: true
					}
				});
			} else {
				ctor.prototype = createObject(superCtor.prototype);
			}
		};
	}

	/**
	 * Dictionary of the word forms
	 * @param {function(dictionaryArticle, condition): string} strategy
	 * @param {boolean} options.preserveCaseOnGet
	 */
	function Dictionary(strategy, options) {
		this._dict = {};
		this._strategy = strategy;
		this._options = options || {};

		if (!('preserveCaseOnGet' in this._options)) {
			this._options.preserveCaseOnGet = true;
		}
	}

	/**
	 * Add forms of the word to the dictionary
	 */
	Dictionary.prototype.add = function(/*word forms*/) {
		var forms = [];

		var args = Array.prototype.slice.call(arguments, 0);
		for (var i = 0, len = args.length; i < len; i++) {
			forms.push(args[i].toLowerCase());
		}

		if (this._dict[forms[0]]) throw new Error(
			'duplicate entry: "' + forms[0] + '"');
		this._dict[forms[0]] = forms;
	};

	/**
	 * @param {string} word normal (first) form of the word
	 * @param {misc} condition
	 */
	Dictionary.prototype.get = function(word, condition) {
		var article = this._dict[word.toLowerCase()];

		if (!article) {
			throw new Error('No such word in the dictionary: "' + word + '"');
		}
		var result = this._strategy(article, condition);

		var isCapitalized = word.toUpperCase()[0] == word[0];
		return (this._options.preserveCaseOnGet && isCapitalized) ?
			(result.charAt(0).toUpperCase() + result.slice(1)) : result;
	};
	exports.Dictionary = Dictionary;


	function Genderify() {
		function strategy(forms, gender) {
			return (gender == 'female') ? forms[1] : forms[0];
		}
		Dictionary.call(this, strategy);
	}
	inherits(Genderify, Dictionary);
	exports.Genderify = Genderify;


	function Pluralize() {
		function strategy(forms, number) {
			return pluralStr.apply(null, [number].concat(forms));
		}
		Dictionary.call(this, strategy);
	}
	inherits(Pluralize, Dictionary);
	exports.Pluralize = Pluralize;

	/**
	 * Simple function for getting the correct plural form of noun
	 * pluralStr(12, ‘товар’,'товара’,'товаров’); // 12 товаров
	 * @see http://blog.rayz.ru/javascript-russian-plural.html
	 */
	function pluralStr(i, oneItem, threeItems, twelveItems) {
		function whichForm(a) {
			if (a % 10 == 1 && a % 100 != 11) {
				return 0;
			}
			else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
				return 1;
			} else {
				return 2;
			}
		}

		return ([oneItem, threeItems, twelveItems])[whichForm(i)];
	}


	if (typeof module === 'object' && module.exports) {
		module.exports = exports;
	} else if (typeof define === 'function' && define.amd) {
		define([], function() {
			return exports;
		});
	} else if (typeof(window) !== 'undefined') {
		window.slovoform = exports;
	} else {
		throw new Error('Unknown environment');
	}

})();
