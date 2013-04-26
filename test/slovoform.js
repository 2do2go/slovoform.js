'use strict';

var assert = require('assert'),
	Pluralize = require('../lib/slovoform').Pluralize,
	Genderify = require('../lib/slovoform').Genderify;

var pluralize = new Pluralize(),
	form1 = 'час', form2 = 'часа', form3 = 'часов';

pluralize.add(form1, form2, form3);

assert.equal(pluralize.get(form1, 1), form1);
assert.equal(pluralize.get(form1, 2), form2);
assert.equal(pluralize.get(form1, 3), form2);
assert.equal(pluralize.get(form1, 5), form3);
assert.equal(pluralize.get(form1, 20), form3);

var genderify = new Genderify(),
	form1 = 'сказал', form2 = 'сказала';

genderify.add(form1, form2);

assert.equal(genderify.get(form1, 'male'), form1);
assert.equal(genderify.get(form1, 'female'), form2);
