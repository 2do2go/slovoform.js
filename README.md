#Slovoform
Library for plural and gender word forms for russian language

#Examples
Very easy to use:
```js
var slovoform = require('slovoform'),
    nplural = new slovoform.Nplural(),
    genderify = new slovoform.Genderify();
    
nplural.add('час', 'часа', 'часов');
console.log(nplural.get('час', 1));
//час
console.log(nplural.get('час', 2));
//часа
console.log(nplural.get('час', 5));
//часов

genderify.add('сказал', 'сказала');
console.log(genderify.get('сказал', 'male'));
//сказал
console.log(genderify.get('сказал', 'female'));
//сказала
```
