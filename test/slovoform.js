'use strict';

var assert = require('assert'),
	Pluralize = require('../lib/slovoform').Pluralize,
	Genderify = require('../lib/slovoform').Genderify;

var pluralize = new Pluralize(),
	forms = [
		['событие', 'события', 'событий'],
		['была', 'были', 'были'],
		['принята', 'приняты', 'приняты']
	];

forms.forEach(function(words) {
	pluralize.add.apply(pluralize, words);
});

assert.equal(pluralize.get(forms[0][0], 1), forms[0][0]);
assert.equal(pluralize.get(forms[0][0], 2), forms[0][1]);
assert.equal(pluralize.get(forms[0][0], 3), forms[0][1]);
assert.equal(pluralize.get(forms[0][0], 5), forms[0][2]);
assert.equal(pluralize.get(forms[0][0], 20), forms[0][2]);
var str = [forms[0][0], forms[1][0], forms[2][0]].join(' ');
var resStr1 = [forms[0][1], forms[1][1], forms[2][1]].join(' '),
	resStr2 = [forms[0][2], forms[1][1], forms[2][1]].join(' ');
assert.equal(pluralize.get(str, 2), resStr1);
console.log(pluralize.get(str, 5));
assert.equal(pluralize.get(str, 5), resStr2);

var genderify = new Genderify(),
	form1 = 'сказал', form2 = 'сказала';

genderify.add(form1, form2);

assert.equal(genderify.get(form1, 'male'), form1);
assert.equal(genderify.get(form1, 'female'), form2);
