window.onload = function(){

	positionMap(440, 280, "gary");
	console.log(getX("gary"));
	console.log(getY("gary"));
	gary();
	window.girlListGlobal = girlMaker();

	for(x=0;x<girlListGlobal.length;x++){
		console.log("Girl: " + girlListGlobal[x].id + " at X: " + getX(girlListGlobal[x].id) + " at Y: " + getY(girlListGlobal[x].id));
	}
}

// Object Constructor for creating girls
function girl(id, min, max, collide){
	this.id = id;
	this.min = min;
	this.max = max;
	this.collide = collide;
}

function girlMaker(){
	var girlList = ['girl1','girl2','girl3','girl4','girl5'];
	for(var x = 0; x < girlList.length; x++){
		var min = 190 * x;
		var max = 190 * (x+1);
		//console.log(min  + "||" + max);
		girlList[x] = new girl(girlList[x], min, max, false);
	}

	for (var x=0; x<girlList.length; x++){
		girlGenerator(girlList[x]);
	}

	return girlList;
}


function girlGenerator(girlObject){
	var x,y;
	while(x==null||y==null||overlapGary(x,y)==true){
		x=randX(girlObject.min, girlObject.max - 40)
		y=randY();
		console.log("overlapGary: "+overlapGary(x,y));
	}
	positionMap(x, y, girlObject.id);
	//positionMap(randX(girlObject.min, girlObject.max - 40), randY(), girlObject.id);
}


function overlapGary(x,y){
	garyX=getX('gary');
	garyY=getY('gary');
	if(((x<garyX-40)||(x>garyY+80)) && ((y<garyY-60)||(y>garyY+120))){
		return false;
	}
	else{
		return true;
	}
}

function randX(min,max){	

	var randX;
	var randGen = Math.random();
	randX = Math.floor(((randGen*(max-min)) + min)/10);
	randX *= 10;
	console.log("Random X: " + randX);
	return parseInt(randX);

}

function randY(){
	var randY;
	// randX = Math.floor(((randGen*(max-min)) + min)/10);
	while(randY==null||randY>540){
// <<<<<<< HEAD
// 		//randY = (Math.random()*1000)/10;
// 		randY = 0; 
// 		console.log("Random Y: " + parseInt(randY));
// =======
		randY = Math.floor((Math.random()*1000)/10);
		randY *= 10;
		console.log("Random Y: " + randY);
//>>>>>>> 661e1f88520dfac3b3b0d8a778066038388fe99e
	}
	return parseInt(randY);
}

function garyCollision(objects, left, top){

	garyLeft = left;
	garyRight = left + 40;
	garyTop = top;
	garyBottom = top + 60;
	objectLeft=getX(objects.id);
	objectRight=getX(objects.id)+40 ;
	objectTop=getY(objects.id );
	objectBottom=getY(objects.id)+60;
	console.log("current girl: " + objects.id);

	if((garyTop==objectBottom&&garyTop>objectTop)&&((garyRight>=objectLeft&&garyRight<=objectRight)||(garyLeft<=objectRight&&garyLeft>=objectLeft))){
		console.log('Gary hits bottom of object');
		return 1;
	}
	if((garyBottom==objectTop&&garyBottom<=objectBottom)&&((garyRight>objectLeft&&garyRight<=objectRight)||(garyLeft<objectRight&&garyLeft>=objectLeft))){
		console.log('Gary hits top of object');
		return 2;
	}
	if((objectLeft<garyLeft && objectRight<=garyLeft)&&((garyBottom>objectTop&&garyBottom<=objectBottom)||(garyTop<objectBottom&&garyTop>=objectTop))){ 
		//Left
		console.log("Gary hits right of object");
		return 3;
	}   
	if((objectLeft>=garyRight && objectRight>garyRight)&&((garyBottom>objectTop&&garyBottom<=objectBottom)||(garyTop<objectBottom&&garyTop>=objectTop))){ 
		//Right
		console.log('Gary hits left of object');
		return 4;
	}
		//console.log('hey: ' + objects.id + "Object Position: " + objectX + " " + objectY + " Gary X = " + garyX + " Gary Y = " + garyY);
	return 0

}

function gary(){
	window.addEventListener('keydown',moveGary);
}

function moveGary(event){
// <<<<<<< HEAD
// // <<<<<<< HEAD
// 	for(var x=0; x < 5; x++){
// 		girlListGlobal[x].collide = garyCollision(girlListGlobal[x]);
// 		var collide = girlListGlobal[x].collide;
// 		console.log("Collide: " + collide);
		
// 	}
// 	window.removeEventListener('keydown', moveGary);

// 		//UP ARROW PRESSED
// 		if(event.keyCode=="38"){
// 			faceGary("GaryRunLeft.png", "gary");
// 			positionMap(0,-20,'gary');
// 		}

// 		//DOWN ARROW PRESSED
// 		else if(event.keyCode=="40"){
// 			faceGary("GaryRunRight.png", "gary");
// 			positionMap(0, 20,'gary');
// 		}

// 		//LEFT ARROW PRESSED
// 		else if(event.keyCode=="37"){
// 			faceGary("GaryRunLeft.png", "gary");
// 			positionMap(-20,0,'gary');
			
// 		}
// 		//RIGHT ARROW PRESSED
// 		else if(event.keyCode=="39"){
// 			faceGary("GaryRunRight.png", "gary");
// 			positionMap(20,0,'gary');
// // =======

// // 	window.removeEventListener('keydown', moveGary);
// // 	var collide = false;
// // 	for(var x; x < 5; x++){
// // 		girlListGlobal[x].collide = garyCollision(girlListGlobal[x]);
// // 		collide = girlListGlobal[x].collide;
// // 		console.log("collide with: " + girlListGlobal[x].id);
// // 	}
// // 	//UP ARROW PRESSED
// // 	if(event.keyCode=="38"){
// // 		faceGary("GaryRunLeft.png", "gary");
// // 		if(!collide){
// // 			positionMap(0,-10,'gary');
// // 		}
// // 	}
// // 	//DOWN ARROW PRESSED
// // 	else if(event.keyCode=="40"){
// // 		faceGary("GaryRunRight.png", "gary");
// // 		if(!collide){
// // 			positionMap(0, 10,'gary');
// // 		}
// // 	}
// // 	//LEFT ARROW PRESSED
// // 	else if(event.keyCode=="37"){
// // 		faceGary("GaryRunLeft.png", "gary");
// // 		if(!collide){
// // 			positionMap(-10,0,'gary');
// // >>>>>>> 597f5db1da45c6822ceebdc49a0b79813a8168ce
// // 		}
// // 	}
// // 	//RIGHT ARROW PRESSED
// // 	else if(event.keyCode=="39"){
// // 		faceGary("GaryRunRight.png", "gary");
// // 		if(!collide){
// // 			positionMap(10,0,'gary');

// 	}
// 	window.addEventListener("keyup", stopGary);
// =======

	window.removeEventListener('keydown', moveGary);
	var collide = false;
	var column;
	for(var x = 0; x <= 920; x+=184){
		if(x <= getX('gary')){
			column = x/184;
		}
	}
	console.log(column);
	collide = garyCollision(girlListGlobal[column], getX('gary'), getY('gary'));
	//UP ARROW PRESSED
	if(event.keyCode=="38"){
		faceGary("GaryRunLeft.png", "gary");
		if(collide != 1){
			positionMap(0,-10,'gary');
		}
	}
	//DOWN ARROW PRESSED
	else if(event.keyCode=="40"){
		faceGary("GaryRunRight.png", "gary");
		if(collide != 2){
			positionMap(0, 10,'gary');
		}
	}
	//LEFT ARROW PRESSED
	else if(event.keyCode=="37"){
		faceGary("GaryRunLeft.png", "gary");
		if(collide != 3){
			positionMap(-10,0,'gary');
		}
	}
	//RIGHT ARROW PRESSED
	else if(event.keyCode=="39"){
		faceGary("GaryRunRight.png", "gary");
		if(collide != 4){
			positionMap(10,0,'gary');
		}

	}
	window.addEventListener("keyup", stopGary);
	//190, 380, 570, 760, 950
// >>>>>>> 661e1f88520dfac3b3b0d8a778066038388fe99e
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
	gary();

}

function faceGary(direction, id){
	document.getElementById(id).firstChild.src = "resources/" + direction;

}

function positionMap(X, Y, id){

	var position = document.getElementById(id);

	var sumX = getX(id);
	if(!sumX){
		sumX = 0;
	}

	sumX = sumX + X;
	if(sumX < 0){
		position.style.left = 0 + "px";
	}
	else if(sumX > 880){
		position.style.left = 880 + "px";
	}
	else{
		position.style.left = sumX + "px";
	}


	var sumY = getY(id);
	if(!sumY){
		sumY = 0;
	}

	sumY = sumY + Y;
	if(sumY < 0){
		position.style.top = 0 + "px";
	}
	else if(sumY > 540){
		position.style.top = 540 + "px";
	}
	else{
		position.style.top = sumY + "px";
	}
	 console.log(id + " is at X = " + position.style.left + " Y = " + position.style.top);
}

function getX(id){
	var positionX = document.getElementById(id);
	return parseInt(positionX.style.left);
}

function getY(id){
	var positionY = document.getElementById(id);
	return parseInt(positionY.style.top);
}