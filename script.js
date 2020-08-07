let num = 266219;
let newNum = Array.from(String(num), Number);


let multiplyNum = 1;
for (let i = 0; i < newNum.length; i++) {
  multiplyNum *= newNum[i];
}

multiplyNum = multiplyNum ** 3;

console.log(String(multiplyNum).slice(0, 2));