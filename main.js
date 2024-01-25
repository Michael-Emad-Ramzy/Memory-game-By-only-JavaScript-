
//functions of the splash screen and name writing
document.querySelector(".control-buttons span").onclick = function(){
    let yourName= prompt("what is your name ?!") ;

    if(yourName==null || yourName==""){

        document.querySelector(".name span").innerHTML = 'Unknown' ;

    } else{

        document.querySelector(".name span").innerHTML = yourName ;

    }
    document.querySelector(".control-buttons").remove();

};

//duration for the cards flip
let duration = 1000;


let blockcontainers = document.querySelector(".memory-game-blocks") ;


//put the blocks in array 
let blocks = Array.from(blockcontainers.children);


// Create Range Of Keys (... for extration of the length in array) & (.keys return new array iterator)
let orderRange= [...Array(blocks.length).keys()];
// or    let orderRange = Array.from(Array(blocks.length).keys());


shuffle(orderRange);

// add order css property to game-blocks
blocks.forEach((block, index) => {
    //add css order property to each game-block
    block.style.order = orderRange[index];

    //add click event
    block.addEventListener('click', function () {
        //make the flipBlock function work (trigger the function)
        flipBlock(block);

    });

});




//flip block function
function flipBlock(selectedBlock) {

    //add calss is-flipped to the game-block
    selectedBlock.classList.add('is-flipped');

    //collect all filipped cards 
    let allFlippedBlocks= blocks.filter(flippedBlock =>flippedBlock.classList.contains('is-flipped'));
    //if there is two selected blocks 
    if(allFlippedBlocks.length === 2 ){

        //stop clicking 
        stopClicking()

        //check matched block
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// stop Clicking function
function stopClicking(){
    //add class no clicking on main container 
    blockcontainers.classList.add('no-clicking');

    setTimeout(() =>{
        //remove class no clicking 
        blockcontainers.classList.remove('no-clicking');
    }, duration);
}


//check mached blocks function
function checkMatchedBlocks(firstBlock, secondBlock){
    let triesElement= document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1 ;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        
        document.getElementById('fail').play();

    }
}


//shuffle function
function shuffle(array) {

    //settings(intialize) of variabls
    let current = array.length,
        temp,
        random;


    while(current > 0){
        //get random number
        random= Math.floor(Math.random()* current);

        current -- ;

        //save current number in stash (temp)
        temp = array[current];
        //current element = random element
        array[current]= array[random];
        //random element = get element from stash (tamp)
        array[random]= temp;

    }

    return array ;

}
