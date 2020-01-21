//proves the monty hall paradox
const TESTS = 10000;

console.time('perf');
let {stayWins, changeWins} = testMontyHall(TESTS);
console.timeEnd('perf');

console.log(`Stay Wins:   ${stayWins}/${TESTS/2} (${Math.round(stayWins/(TESTS/2)*100)}%)`)
console.log(`Change Wins: ${changeWins}/${TESTS/2} (${Math.round(changeWins/(TESTS/2)*100)}%)`)

/**
 * tests the given number of monty hall problems
 * half switching, half staying
 * @param {number} tests 
 */
function testMontyHall(tests){
   let stayWins=0, changeWins=0;

   for(let i=0; i<tests/2; i++){
      if(stay()) stayWins++;
      if(change()) changeWins++;
   }
   
   return({stayWins, changeWins});
}

/**
 * plays one round of the door-guessing game, staying with original guess
 * @returns {boolean} true for a win
 */
function stay(){
   let prize = getRandomInt(3); //load the winning door
   let guess = getRandomInt(3); //player's first guess
   let reveal = getReveal(prize, guess); //reveal one door (useless, could be deleted)

   return prize===guess; //return whether we guessed correctly
}

/**
 * plays one round of the door-guessing game, switching after reveal
 * @returns {boolean} true for a win
 */
function change(){
   let prize = getRandomInt(3); //load the winning door
   let guess = getRandomInt(3); //player's first guess
   let reveal = getReveal(prize, guess); //reveal one door
   let newGuess = [0,1,2].filter(d=>d!==reveal && d!==guess)[0]; //change guess to unrevealed unguessed door

   return prize===newGuess; //return whether we guessed correctly
}

/**
 * gets a random empty, unchosen door to reveal as empty
 * @param {prize} prize
 * @param {number} guess
 * @returns {number} door (0-2) to reveal
 */
function getReveal(prize, guess){

   let revealable = [0,1,2].filter(d=>d!==prize && d!==guess);
   return revealable[getRandomInt(revealable.length)]; //randomly choose which to reveal (if there's a choice)
}

/**
 * get random integer between 0 (inclusive) and max (exclusive)
 * @param {number} max 
 */
function getRandomInt(max){
   return Math.floor(Math.random()*max);
}
