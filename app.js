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
};

// Selecting the DOM Elements (El for Element)--these are all IDs on the webpage:
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);



// This function (very long with lots inside--end curly bracket line 117) accepts true or false values as well as a number for the length parameter/argument. NOTE: The checkbox inputs and number (AKA length) input will determine the value/arguments entered into this function. We will use this function inside another function that is an addEventListener function. 
function generatePassword(lower, upper, number, symbol, length) {
    console.log(lower, upper, number, symbol, length);

    // 1. CREATES THE PASSWORD VARIABLE
    let generatedPassword = ``;

    // 2. FILTER OUT UNCHECKED OPTIONS
    // True and false values can be added together (True is 1 and false is 0)
    // NOTE: The value set to typesCount will be used when building the password.
    const typesCount = lower + upper + number + symbol;
    // error handling--if the user has not selected any of the 4 options, then the alert will display and return an empty string so the password displayed will just be an empty string (blank):
    if (typesCount === 0)  {
        alert(`Please select at least one option`);
        return ``; //return works like a break in a loop. It stops/ends the execution of a function (AKA does not run any of the code on the lines that follow the return in the function)
    }
    // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. The second item in each nested array is one of the values passing into this generatePassword function.
    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol]
    ];
    // The filter method creates a new typesArr array with all the items that pass the text implemented by the provided function (AKA All the items that cause the function to return a boolean value of true when the function is run...using the item as an argument for the item parameter in this example)
    // We're checking if the value for index of 1 in each item in the array is true or false. We're also removing the item from the array if the value is false.
    typesArr = typesArr.filter(item => {
        console.log(item[1]); //so we can see the item index of 1 first
        return item[1]; //to return each true item to the new array
    });
    console.log(`typesArr`, typesArr);

    // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION--Building password with a for loop
    // NOTE: The value for "length" is the value selected for the length number input:
    for (i = 0; i < length; i += typesCount){  //for loop
        // one of the items in the updated/filtered version of the typesArr will be the value/argument passed into for the type parameter each time the anonymous arrow function is run/executed
        typesArr.forEach(type => { //anonymous arrow function (type parameter)
            const funcName = type[0];  //index of 0 (`lower`, `upper`, etc. strings)
            console.log(funcName);
            //every time this loop runs, it will add on a randomFunctions[funcName]  --commented out is one way but below that is the shorthand
            // generatedPassword = generatedPassword + randomFunctions[funcName]();
            // Accessing and running/executing a function in the randomFunctions object. Also, adding/concatenating the value returned from the accessed function to the generatedPassword string variable:
            //() on end so it will run the function for generatedPassword (declared up above on line 72 to an empty string):       
            generatedPassword += randomFunctions[funcName](); 
            console.log(generatedPassword); //so we can see it in the console
        });
    }
    // 4. ADD THE GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT FROM THE FUNCTION
    // Using slice to remove the extra characters if necessary (starts at index 0 and goes up to but not including the length if the length is not a multiple if not a multiple of the number of checkboxes/options selected)
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);
    return finalPassword;
}

generatePassword(true, true, true, true, 10); //Example of the generatePassword function using the defaults

// EVENT LISTENER for when the "Generate Password" button is clicked 
generateEl.addEventListener(`click`, () => {
    // Checking if the following options/checkboxes are selected/checked and setting the true or false values to the respective variables
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    // Accessing the value for the length input and changing the value from a string to a number (NOTE: the value returned from a number input is a string value and that is why we must use parseInt)
    const length = parseInt(lengthEl.value);
    console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);
    // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number length input (4-20) and returns a string (AKA The Password) which is set as the innerText value for the "result" (AKA Span) element that we set to the resultEl variable up above on line 56.
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


