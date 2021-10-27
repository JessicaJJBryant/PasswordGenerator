// PASSWORD GENERATOR

// Character Generator Functions

// This first function is a function that will take in a string and return a random index number from the string argument. We're going to use this function inside of other functions to be written (like one for all the lowercase, all the uppercase, all the numbers they could use, all the symbols)
function randomIndex(str) {     //str for string--our parameter
    return Math.floor(Math.random() * str.length);
}
console.log(randomIndex(`chicken`)); //totally random example using `chicken` as our argument


// Function that returns a random lowercase letter
function getRandomLower() {
    const letters = `abcdefghijklmnopqrstuvwxyz`; //this variable is scoped only here
    return letters[randomIndex(letters)]; // using the randomIndex function above to return a random letter using a random index in the "letters" string
}
console.log(getRandomLower()); //calling the getRandomLower function to get a random lowercase letter


// Function that returns a random UPPERCASE letter
function getRandomUpper() {
    //running the "getRandomLower" function to create a random letter and setting that value to the letter variable (we don't have to specifically put the randomIndex function in because it's included in the getRandomLower function):
    const letter = getRandomLower();
    // changing the random letter to an uppercase letter and returning it from the function:
    return letter.toUpperCase();
}
console.log(getRandomUpper()); //example of the getRandomUpper function


// This function will return a random number:
function getRandomNumber() {
    const numbers = `0123456789`;
    return numbers[randomIndex(numbers)]; // using the randomIndex function above to return a random number using a random index in the "numbers" string
}
console.log(getRandomNumber()); //example of the getRandomNumber function--gives a random number from the "numbers" string


// This function will return a random symbol:
function getRandomSymbol(){
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    // returning the random symbol using a random index in the "symbols" string
    return symbols[randomIndex(symbols)];
}
console.log(getRandomSymbol());


// OBJECT TO STORE ALL THE CHARACTER GENERATOR FUNCTIONS--gets them to a central location (organization) and makes them easier to access:
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}
