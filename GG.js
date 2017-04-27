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
		var min = 184 * x;
		var max = 184 * (x+1);
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
 	while(randX==null){
		randX = (Math.random()*(max-min)) + min; 
		console.log("Random X: " + parseInt(randX));
	}
	return parseInt(randX);

}

function randY(){
	var randY;
	while(randY==null||randY>540){
		randY = Math.random()*1000;
		console.log("Random Y: " + parseInt(randY));
	}
	return parseInt(randY);
}

function garyCollision(objects){
// <<<<<<< HEAD
	//gary = document.getElementById('gary');

	// for(var x=0; x<5; x++){
		garyLeft = getX('gary');
		garyRight = getX('gary')+40;
		garyTop = getY('gary');
		garyBottom = getY('gary')+60;
		objectLeft=getX(objects.id);
		objectRight=getX(objects.id)+40 ;
		objectTop=getY(objects.id );
		objectBottom=getY(objects.id)+60;
		console.log("current girl: " + objects.id);
		// if((objectX+40<=garyX)&&(((objectY+60>garyY)&&(objectY<garyY))||(objectY<garyY+60)&&(objectY+60>garyY+60))){
		//if((garyX<=objectX+40)&&(garyX+40<objectX+80)&&(garyX>objectX-40)) -- Range v1
		if((objectLeft<garyLeft&&objectRight>garyLeft)&&((garyBottom>objectTop&&garyBottom<objectBottom)||(garyTop<objectBottom&&garyTop>objectTop))){ 
			//Left
			console.log("Gary hits right of object");
			return true;
		}
		if((objectLeft<=garyRight&&garyRight<objectRight)&&((garyBottom>objectTop&&garyBottom<objectBottom)||(garyTop<objectBottom&&garyTop>objectTop))){ 
			//Right
			console.log('Gary hits left of object');
			return true;
		}
		    
		if((garyBottom>=objectTop&&garyBottom<objectBottom)&&((garyRight>objectLeft&&garyRight<objectRight)||(garyLeft<objectRight&&garyLeft>objectLeft))){
			console.log('Gary hits top of object');
			return true;
		}
		if((garyTop<=objectBottom&&garyTop>objectTop)&&((garyRight>objectLeft&&garyRight<objectRight)||(garyLeft<objectRight&&garyLeft>objectLeft))){
			console.log('Gary hits bottom of object');
			return true;
		}
		else{
			//console.log('hey: ' + objects.id + "Object Position: " + objectX + " " + objectY + " Gary X = " + garyX + " Gary Y = " + garyY);
			return false;
		}
	// }
}

function gary(){
	window.addEventListener('keydown',moveGary);
}

function moveGary(event){

	window.removeEventListener('keydown', moveGary);
	for(var x; x < 5; x++){
		girlListGlobal[x].collide = garyCollision(girlListGlobal[x]);
// <<<<<<< HEAD
// 		collide = girlListGlobal[x].collide;
 		console.log("Collide: " + collide);
// =======
		var collide = false;
		//var collide = girlListGlobal[x].collide;
		//UP ARROW PRESSED
	}
// >>>>>>> 4ecd56fd12bd1d0f37249662cb4beae211bdbe9e
		if(event.keyCode=="38"){
			faceGary("GaryRunLeft.png", "gary");
			// if(!collide){
				positionMap(0,-20,'gary');
			// }
		}

		//DOWN ARROW PRESSED
		else if(event.keyCode=="40"){
			faceGary("GaryRunRight.png", "gary");
			// if(!collide){
				positionMap(0, 20,'gary');
			// }
		}

		//LEFT ARROW PRESSED
		else if(event.keyCode=="37"){
			faceGary("GaryRunLeft.png", "gary");
			// if(!collide){
				positionMap(-20,0,'gary');
			// }
		}
		//RIGHT ARROW PRESSED
		else if(event.keyCode=="39"){
			faceGary("GaryRunRight.png", "gary");
			// if(!collide){
				positionMap(20,0,'gary');
			// }
		}
	window.addEventListener("keyup", stopGary);

}

function stopGary(event){
	//UP ARROW PRESSED
	if(event.keyCode=="38"){
		faceGary("GaryStandLeft.png", "gary");
		// positionMap(0,-20,'gary');
	}

	//DOWN ARROW PRESSED
	else if(event.keyCode=="40"){
		faceGary("GaryStandRight.png", "gary");
		// positionMap(0, 20,'gary');
	}

	//LEFT ARROW PRESSED
	else if(event.keyCode=="37"){
		faceGary("GaryStandLeft.png", "gary");
		// positionMap(-20,0,'gary');
	}
	//RIGHT ARROW PRESSED
	else if(event.keyCode=="39"){
		// positionMap(20,0,'gary');
		// faceGary("GaryMovesRight.gif", "gary");
		// window.setTimeout(function(){
		faceGary("GaryStandRight.png", "gary");
		// }, 100);
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
	// console.log(id + " is at X = " + position.style.left + " Y = " + position.style.top);
}

function getX(id){
	var positionX = document.getElementById(id);
	return parseInt(positionX.style.left);
}

function getY(id){
	var positionY = document.getElementById(id);
	return parseInt(positionY.style.top);
}