window.onload = function(){
	window.gary = garyMaker();
	garyStart();
	window.girlListGlobal = girlMaker();
	//window.guardList = guardMaker();
	//guardStart();
	window.score = 0;
	window.life = 3;
	window.time = 30;
	window.grindedArray=[];
	document.getElementById("life").innerHTML=life;
	setInterval(gameStart,1000);
}

function gameStart(){
	document.getElementById("time").innerHTML = time;
		time--;
	document.getElementById("life").innerHTML=life;
	if(time==0){
		gameLose();
	}

}

//Object constructor for Gary
function Gary(id, x, y, grinding){
	this.x =x;
	this.y =y;
	this.id = id;
}

// Object Constructor for creating girls
function Girl(id, x, y, collide, type){
	this.x = x;
	this.y = y;
	this.id = id;
	this.collide = collide;
	this.type =type;
	if(type==1){
		document.getElementById(id).firstChild.src="resources/KokakDance.gif";
		this.scoreEarn = 100;
		this.stamina = 10;
		this.pressure = 3;
		this.timeAdd=10;
	}
	else if(type==2){
		document.getElementById(id).firstChild.src="resources/MeowDance.gif";
		this.scoreEarn = 200;
		this.stamina = 7;
		this.pressure = 2;
		this.timeAdd=10;
	}
	else{
		document.getElementById(id).firstChild.src="resources/Dave.gif";
		this.scoreEarn = 300;
		this.stamina = 5;
		this.pressure = 2;
		this.timeAdd=10;
	}
}
//Object Constructor for Guard
function Guard(id, x, y){
	this.x =x;
	this.y =y;
	this.id = id;
}

function barrier(id, min, max, collide){
	this.id = id;
	this.collide = collide;
}

//Sets the position of Gary and initialize/reinitialize gary's controller
function garyStart(){
	console.log("Gary x: " + gary.x);
	console.log("Gary y: " + gary.y);
	positionMap(0,0,gary);
	window.addEventListener('keydown',moveGary);
}

// function guardStart(){
// 	setInterval(function(){
// 		guardMove(guardList[0]);
// 	}, 500);
// }

// function guardMove(guardObject){
// 	//while(guardList[guardIndex].y!=360){
// 	if(guardObject.x<900){
// 		positionMap(10,0,guardObject);
// 	}
// 	if(guardObject.x>=90&&guardObject.y==0){
// 		positionMap(0,10,guardObject);
// 	}
// 	if(guardObject.y>=240){
// 		positionMap(0,-10,guardObject);
// 	}
// 	//}
// }

function garyMaker(){
	var gary = new Gary('gary',440,280,false)	
	return gary;
}

//creates array of girls and generates position
function girlMaker(){
	var girlList = ['girl1','girl2','girl3','girl4','girl5'];
	for(var x = 0; x < girlList.length; x++){
		var randomizeType = Math.random();
		var type = Math.floor(((randomizeType*(4-1)) + 1));
		girlList[x] = new Girl(girlList[x], 0, 0, false, type);
	}

	for (var x=0; x<girlList.length; x++){
		girlPositionGenerator(girlList[x]);
	}
	return girlList;
}

// function guardMaker(){
// 	console.log("sulod");
// 	var guardList = ['guard1','guard2','guard3','guard4'];
// 	guardTopX=0;
// 	guardTopY=0;
// 	guardBottomX=0;
// 	guardBottomY=300;
// 	for(var x = 0; x < guardList.length; x++){
// 		if(x%2==0){
// 			guardList[x] = new Guard(guardList[x], guardTopX, guardTopY);
// 		}
// 		else if(x%2!=0){
// 			guardList[x] = new Guard(guardList[x], guardBottomX, guardBottomY);
// 		}
// 	}

// 	for (var x=0; x<guardList.length; x++){
// 		positionMap(guardList[x].x, guardList[x].y, guardList[x]);
// 	}
// 	return guardList;
// }

function girlPositionGenerator(girlObject){
	var x,y;
	while(x==null||y==null||avoidOverlap(x,y)==true){
		x=randX(0, 140)
		y=randY();
	}
	
	positionMap(x, y, girlObject);
	console.log("Girl Object: " + girlObject.id + "at x " + girlObject.x + " y: " + girlObject.y);
	return girlObject;
}

//regeneration of girls after they are grinded
//shift to get rid of first element in array (fifo)
function girlRegenerator(grindedArray){
 		girlIndex = grindedArray.shift();
 		randomizeType = Math.random();
 		type = Math.floor(((randomizeType*(4-1)) + 1));
		girlListGlobal[girlIndex] = new Girl(girlListGlobal[girlIndex].id, 0, 0, false, type);
 		girlPositionGenerator(girlListGlobal[girlIndex]);
 		document.getElementById(girlListGlobal[girlIndex].id).style.display = "block";
}
//to avoid overlap generation of girls over gary
function avoidOverlap(x,y){
	if(((x<gary.x-40)||(x>gary.y+80)) && ((y<gary.y-60)||(y>gary.y+120))){
		console.log("false");
		return false;
	}
	else{
		console.log("true");
		return true;
	}
}

function randX(min,max){	
	var randX;
	var randGen = Math.random();
	randX = Math.floor(((randGen*(max-min)) + min)/10);
	randX *= 10;
	if(randX == 0){
		randX += 10;
	}
	console.log("Random X: " + randX);
	return parseInt(randX);
}

function randY(){	
	var randY;
	while(randY==null||randY>540){
		randY = Math.floor((Math.random()*1000)/10);
		randY *= 10;
		console.log("Random Y: " + randY);
	}
	return parseInt(randY);
}

function garyCollision(objects, left, top){
	garyLeft = left;
	garyRight = left + 40;
	garyTop = top;
	garyBottom = top + 60;
	objectLeft=objects.x;
	objectTop=objects.y;
	if(objects.x==null&&objects.y==null){
	objectRight=null;					//FIXING NULL GLITCH WHEN REGENERATING GIRLS
	objectBottom=null;
	}
	objectRight=objects.x+40 ;
	objectBottom=objects.y+60;
	console.log("current girl: " + " Object id = " + objects.id + " Object Left: " + objectLeft + " Object top: " + objectTop + " Gary Left: " + garyLeft + " Gary Top: " + garyTop);

	if((garyTop==objectBottom&&garyTop>objectTop)&&((garyRight>=objectLeft&&garyRight<=objectRight)||(garyLeft<=objectRight&&garyLeft>=objectLeft))){
		console.log('Gary hits bottom of object' + objects.id);
		return 1;
	}
	if((garyBottom==objectTop&&garyBottom<=objectBottom)&&((garyRight>objectLeft&&garyRight<=objectRight)||(garyLeft<objectRight&&garyLeft>=objectLeft))){
		console.log('Gary hits top of object ' + objects.id);
		return 2;
	}
	if((objectLeft<garyLeft && objectRight==garyLeft)&&((garyBottom>objectTop&&garyBottom<=objectBottom)||(garyTop<objectBottom&&garyTop>=objectTop))){ 
		//Left
		objects.collide = true;
		console.log("Gary hits right of object" + objects.id);
		return 3;
	}   
	if((objectLeft==garyRight && objectRight>garyRight)&&((garyBottom>objectTop&&garyBottom<=objectBottom)||(garyTop<objectBottom&&garyTop>=objectTop))){ 
		//Right
		objects.collide = true;
		console.log('Gary hits left of object' + objects.id);
		return 4;
	}
	objects.collide = false;
	return 0;

}

function moveGary(event){
	window.removeEventListener('keydown', moveGary);
	var collide = false;
	var column;
	for(var x = 0; x <= 900; x+=180){
		if(x <= gary.x){
			column = x/180;
		}
	}
	console.log(column);
	collide1 = garyCollision(girlListGlobal[column], (gary.x - (180 * column)), gary.y);
	if(column == 4){
		collide2 = garyCollision(girlListGlobal[column], (gary.x - (180 * column)), gary.y);
	}
	else{
		collide2 = garyCollision(girlListGlobal[column + 1], (gary.x - (180 * (column + 1))), gary.y);
	}
	//UP ARROW PRESSED
	if(event.keyCode=="38"){
		faceGary("GaryRunLeft.png", "gary");
		if(collide1 != 1 && collide2 != 1){
			positionMap(0,-10,gary);
		}
	}
	//DOWN ARROW PRESSED
	else if(event.keyCode=="40"){
		faceGary("GaryRunRight.png", "gary");
		if(collide1 != 2 && collide2 != 2){
			positionMap(0, 10,gary);
		}
	}
	//LEFT ARROW PRESSED
	else if(event.keyCode=="37"){
		faceGary("GaryRunLeft.png", "gary");
		if(collide1 != 3 && collide2 != 3){
			positionMap(-10,0,gary);
		}
	}
	//RIGHT ARROW PRESSED
	else if(event.keyCode=="39"){
		faceGary("GaryRunRight.png", "gary");
		if(collide1 != 4 && collide2 != 4){
			positionMap(10,0,gary);
		}
	}

	else if(event.keyCode == "32"){
		//addEventListener("keypress",function(){});
		console.log("Space pressed");
		if(collide2!=0||collide1!=0){
			console.log("Grind");
			grind();
		}
	}
	window.addEventListener("keyup", stopGary);
}

function stopGary(event){
	//UP ARROW PRESSED
	if(event.keyCode=="38"){
		faceGary("GaryStandLeft.png", "gary");
	}

	//DOWN ARROW PRESSED
	else if(event.keyCode=="40"){
		faceGary("GaryStandRight.png", "gary");
	}

	//LEFT ARROW PRESSED
	else if(event.keyCode=="37"){
		faceGary("GaryStandLeft.png", "gary");
	}
	//RIGHT ARROW PRESSED
	else if(event.keyCode=="39"){
		faceGary("GaryStandRight.png", "gary");
	}
	else if(event.keyCode == "32"){
		//clearInterval(grinding);
		girlRestart();
		console.log("Space released");
	}
	garyStart();
}

function faceGary(direction, id){
	document.getElementById(id).firstChild.src = "resources/" + direction;
}

function grind(){
	for(x=0;x<girlListGlobal.length;x++){
		if(girlListGlobal[x].collide==true){
			console.log("Grinding with girl " + girlListGlobal[x].id);
			console.log("Stamina " + girlListGlobal[x].stamina + "Score " + girlListGlobal[x].scoreEarn);
			window.grinding = setInterval(garyScores,1000,x);
		}
	}
}
//gary scoresssss!!!!!! if girl is done, push index of girl to last element of grinded array, hide girl, change x and y to null para
//--indi mabunggo si gary sa x and y sang girl even though hidden ang girl. Stop grinding interval. Regenerate girl in 10 seconds  
function garyScores(girlIndex){
	console.log("Running Again");
	var sumScore = girlListGlobal[girlIndex].scoreEarn;
	window.resetIndex = girlIndex;
	window.pressured = false;
	girlListGlobal[girlIndex].stamina -= 1;
	if(girlListGlobal[girlIndex].stamina<0){
		window.pressured = true;
		girlRestart();
		life--;
		console.log("BACK OFF GARY!!!! YAKKKK!");
		console.log("Gary's confidence: " + life);
		if(life<=0){
			gameLose();
		}
		return 0;
	}
	if(girlListGlobal[girlIndex].stamina<girlListGlobal[girlIndex].pressure){
		sumScore = girlListGlobal[girlIndex].scoreEarn * 2;
		window.pressured = true;
		console.log("YAKK GARY DIS YOU?!!");
	
	}
	score += sumScore;
	document.getElementById('score').innerHTML = score;
	console.log("Score: " + score);
}

function girlRestart(){
	clearInterval(grinding);
	if(pressured==true){
		time+=girlListGlobal[resetIndex].timeAdd;
		document.getElementById(girlListGlobal[resetIndex].id).style.display = "none";
		girlListGlobal[resetIndex].x = undefined;
		girlListGlobal[resetIndex].y = undefined;
		grindedArray.push(resetIndex);
		setTimeout(function(){
		girlRegenerator(grindedArray);
		},10000);
	}
	else{
		console.log("Stil ok");
	}
}

function positionMap(X, Y, object){
	var sumX = object.x;
	var sumY = object.y;
	sumX = sumX + X;
	sumY = sumY + Y;
	
	if(sumX < 0){
		document.getElementById(object.id).style.left = 0 + "px";
		sumX=0;
	}
	else if(sumX > 860){
		document.getElementById(object.id).style.left = 860 + "px";
		sumX=860;
	}
	else{
		document.getElementById(object.id).style.left = sumX + "px";
	}
	object.x=sumX;

	
	if(sumY < 0){
		document.getElementById(object.id).style.top = 0 + "px";
		sumY=0;
	}
	else if(sumY > 540){
		document.getElementById(object.id).style.top = 540 + "px";
		sumY=540;
	}
	else{
		document.getElementById(object.id).style.top = sumY + "px";
	}
	object.y=sumY;
	console.log(object.id + " is at X = " + object.x + " Y = " + object.y);
}

function gameLose(){
	var Name = prompt("Wassup Hokage enter your name: ");
	window.close();
}