#Slovoform
Library for plural and gender word forms for russian language

#Examples
Very easy to use:
```js
var slovoform = require('slovoform'),
    pluralize = new slovoform.Pluralize(),
    genderify = new slovoform.Genderify();

pluralize.add('час', 'часа', 'часов');
console.log(pluralize.get('час', 1));
//час
console.log(pluralize.get('час', 2));
//часа
console.log(pluralize.get('час', 5));
//часов

genderify.add('сказал', 'сказала');
console.log(genderify.get('сказал', 'male'));
//сказал
console.log(genderify.get('сказал', 'female'));
//сказала
```
