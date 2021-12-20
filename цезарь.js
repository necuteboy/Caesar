let fs = require('fs');
let input = fs.readFileSync("text.txt").toString();
let str="";
let a_fact=[];
let cannon=[];
let count=0;
let fq_fact=[];
let min=100005;
let ct =-1;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var caesar = function (str, amount) {
    if (amount < 0) {
        return caesar(str, amount + 26);
    }
    var output = "";
    for (var i = 0; i < str.length; i++) {
        var c = str[i];

        if (c.match(/[a-z]/i)) {
            var code = str.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }

            else if (code >= 97 && code <= 122) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
        }
        output += c;
    }
    return output;
}
let div=getRandomInt(10, 20);
let text_code=(caesar(input,div));
fs.writeFileSync('code.txt',text_code);
for (let s=0; s<text_code.length; s++){
    if(text_code[s].match(/^[a-z]+$/)) {
        str += text_code[s];
    }
}
str=str.toLowerCase();

let alph = fs.readFileSync('chastoty.txt', 'utf8').split('\r\n');
for (let i = 0; i < alph.length; i++) {
    let letter = alph[i].split(' ')[0];
    let freq = alph[i].split(' ')[1];
    cannon[letter.charCodeAt(0)] = parseFloat(freq);
}
for (let i=0; i<str.length; i++){
    a_fact[str.charCodeAt(i)]=0;
}
for (let i=0; i<str.length; i++){
    a_fact[str.charCodeAt(i)]++;
    count++;
}
a_fact.forEach((item, index) => {
    fq_fact[index] = Number(((a_fact[index] / count) * 100).toFixed(2));
});
for (let k=0; k<26; k++){
    let sum=0;
    let diff=0;
    a_fact.forEach((item, index) => {
        if (index+k>122){
            diff=fq_fact[index]-cannon[index+k-26];
        }
        else {
            diff = fq_fact[index] - cannon[index + k];
        }
        sum+=diff;
    });
    sum=Math.pow(sum, 2);
    if (sum<min){
        ct=k;
        min=sum;
    }
}
let array=[];
a_fact.forEach((item, index) => {
    if (index+ct<123) {
        array[index] = index + ct;
    }
    else{
        array[index] = index + ct-26;
    }
});
let res_text_code="";
for (let i=0; i<text_code.length; i++){
    if(text_code[i].match(/^([a-zA-Z]+)$/i)) {
        if (text_code[i]==text_code[i].toLowerCase()) {
            res_text_code += String.fromCharCode(array[text_code.charCodeAt(i)])
        }
        else{
            res_text_code += String.fromCharCode(array[text_code.charCodeAt(i)+32]-32)
        }
    }
    else{
        res_text_code+=text_code[i];
    }
}
fs.writeFileSync('decode.txt', res_text_code);
