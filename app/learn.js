'use strict';

function LetterChanges(str) { 
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    str = str.split('');    
    let pos = 0;
    let character = '';
    let new_character = '';
    
    while (pos < str.length) {
        character = str[pos];
        let posInAlphabet = alphabet.indexOf(character);
        
        if (posInAlphabet === -1) {
            new_character = character;
        } else {
            posInAlphabet++;
            
            if (isVowel(alphabet[posInAlphabet])) {
                new_character = capitals[posInAlphabet];
            } else {
                new_character = alphabet[posInAlphabet];   
            }
        }
        str[pos] = new_character;
        // console.log(new_character + ' <> ' + str[pos]);
        pos++;
    }
    console.log(str.join(''));
    return str.join('');          
}

function isVowel(letter) {
    const vowels = 'aeiou';
    
    if (vowels.indexOf(letter) === -1) {
        return false;
    } else {
        return true;
    }
}

LetterChanges('hello*3');