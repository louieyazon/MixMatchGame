var gTime;
var gScore;
var gScoreUIText;

//list of items already in use
var gOpts = new Array('x','x','x','x','x','x');

//For checking which options are selected and the number of selections made
var gFirstClick;
var gSecondClick;
var gClickNum;

//For storing the basic solution
var gSol1;
var gSol2;
var gSolScore;

//Game state information
var gAnimating;

//CONSTANTS
var SET_A = 1;
var SET_B = 2;
var SET_C = 3;
//For counter checking which items are already in the options
var OPT_A1 = 1, OPT_A2 = 2, OPT_A3 = 3, OPT_A4 = 4;
var OPT_B1 = 5, OPT_B2 = 6, OPT_B3 = 7, OPT_B4 = 8, OPT_B5 = 9, OPT_B6 = 10;
var OPT_C1 = 11, OPT_C2 = 12, OPT_C3 = 13, OPT_C4 = 14, OPT_D1 = 15;

$(document).ready(function(){
  initGame();
  $('.tile').click(function(){
	if(gAnimating == 0) {
		selectTile($(this));
		checkSolution();
	}
  });
});

function initGame(){
	$('.tile').addClass('option');
	$('#timer').append('This Far Preclear');
	//clearVars();
	$('#timer').append('This Far Postclear');
	setSolution();
	fillTiles();
}

//ROUND SETUP
function setSolution() { //makes sure that there is at least one valid solution
	var diceRoll = Math.floor(Math.random() * 3) + 1;
	$('#timer').append('This Far Start');
	if (diceRoll == SET_A) {  
	$('#timer').append('This Far A');
	generateSolution(SET_A, 2, 2);
	}
	else if (diceRoll == SET_B) {
	$('#timer').append('This Far B');	
	generateSolution(SET_B, 4, 3);
	}
	else { 
	$('#timer').append('This Far C');	
	generateSolution(SET_C, 2, 3);
	}
	$('#timer').append('This Far 2');
}

function generateSolution(solSet, foodOps, drinkOps) {
	var foodSol = Math.floor(Math.random() * foodOps) + 1;
	var drinkSol = Math.floor(Math.random() * drinkOps) + 1;
	
	gSol1 = Math.floor(Math.random() * 6) + 1;
	gSol2 = Math.floor(Math.random() * 6) + 1;
	while(gSol1 == gSol2) {
		gSol2 = Math.floor(Math.random() * 6) + 1;
	}
	$('#timer').append('Set:'+solSet+' F:'+foodSol+' D:'+drinkSol+' S1:'+gSol1+' S2:'+gSol2);
	
	//Set the image for the solution and note which options are already in use
	if(solSet == SET_A){ 
		if(foodSol == 1) gOpts[0] = 'A1';
		else if (foodSol == 2) gOpts[0] = 'A2';
		if(drinkSol == 1) gOpts[1] = 'A3';
		else if(drinkSol == 2) gOpts[1] = 'A4';
	} else if (solSet == SET_B) {
		if(foodSol == 1) gOpts[0] = 'B1';
		else if (foodSol == 2) gOpts[0] = 'B2';
		else if (foodSol == 3) gOpts[0] = 'B3';
		else if (foodSol == 4) gOpts[0] = 'B4';
		if(drinkSol == 1) gOpts[1] = 'B5';
		else if(drinkSol == 2) gOpts[1] = 'B6';
		else if(drinkSol == 3) gOpts[1] = 'D1';
	} else if (solSet == SET_C) {
		if(foodSol == 1) gOpts[0] = 'C1';
		else if (foodSol == 2) gOpts[0] = 'C2';
		if(drinkSol == 1) gOpts[1] = 'C3';
		else if(drinkSol == 2) gOpts[1] = 'C4';
		else if(drinkSol == 3) gOpts[1] = 'D1';
	}
}

function fillTiles() {
	var diceRoll;
	var tileNum = 1;
	while(tileNum < 7){
		if(tileNum != gSol1 || tileNum != gSol2){
			diceRoll = Math.floor(Math.random() * 15) + 1;
			while(diceRoll == gOpt1 || diceRoll == gOpt2 ||
			diceRoll == gOpt3 || diceRoll == gOpt4 ||
			diceRoll == gOpt5 || diceRoll == gOpt6) {
				diceRoll = Math.floor(Math.random() * 15) + 1;
			}
			if(diceRoll == 1) {
				$('#tile'+tileNum).attr('src','images/A1.jpg');
				findEmptyOpt()
		}
	}
}

function findEmptyOpt() {
	
}

function clearVars(){
	gFirstClick = 12; //above 6 is abonormal
	gSecondClick = 13;
	gScore = 0;
	gClickNum = 0;
	gAnimating = 0; //0 false, 1 true
}

function selectTile(selectedTile) {
	if(gClickNum == 0) {
		$(selectedTile).removeClass('option');
		$(selectedTile).addClass('selected1');
		gClickNum++;
		gFirstClick = parseInt(document.getElementsByClassName('selected1')[0].getAttribute('data-num'));
	}
	else if(gClickNum == 1 && !$(selectedTile).hasClass('selected1')) {
		$(selectedTile).removeClass('option');
		$(selectedTile).addClass('selected2');
		gClickNum++;
		gSecondClick = parseInt(document.getElementsByClassName('selected2')[0].getAttribute('data-num'));
	}
}

function checkSolution() {
	if(gClickNum == 2) {
		gAnimating = 1;
		$('.selected1').effect('bounce','fast');
		$('.selected2').effect('bounce','fast');
		$('.option').hide();
		if(gFirstClick == gSol1 && gSecondClick == gSol2) {
			$('.selected1').effect('explode');
			$('.selected2').effect('explode');
		}
		else if(gFirstClick == gSol2 && gSecondClick == gSol1) {
			$('.selected1').effect('explode');
			$('.selected2').effect('explode');
		}
		gAnimating = 0;
	}
	
}