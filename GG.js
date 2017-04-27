window.onload = function(){
	positionMap(440, 280, "gary");
	console.log(getX("gary"));
	console.log(getY("gary"));
	gary();
	window.girlListGlobal = girlMaker();
	/*EJFLOW*/
	window.collisionChecker = setInterval(function(){
		window.collide=garyCollision(girlListGlobal);
		console.log("Collide: " + collide);
	},500);

	for(x=0;x<girlListGlobal.length;x++){
		console.log("Girl: " + girlListGlobal[x].id + " at X: " + getX(girlListGlobal[x].id) + " at Y: " + getY(girlListGlobal[x].id));
	}
	//EJFLOW 
}

// Object Constructor for creating girls
function girl(id, min, max){
	this.id = id;
	this.min = min;
	this.max = max;
}

function girlMaker(){
	var girlList = ['girl1','girl2','girl3','girl4','girl5'];
	for(var x = 0; x < girlList.length; x++){
		var min = 184 * x;
		var max = 184 * (x+1);
		//console.log(min  + "||" + max);
		girlList[x] = new girl(girlList[x], min, max);
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
	//gary = document.getElementById('gary');

	//for(var x=0; x<objects.length; x++){
		garyX = getX('gary');
		garyY = getY('gary');
		objectX=getX(objects[0].id);
		objectY=getY(objects[0].id);
		console.log("current girl: " + x);
		if((objectX<=garyX) && ((objectY+60)<=garyY)&&(objectY-60)>=garyY){
			console.log('hoy');
			return false;
		}
		else{
			console.log('hey: ' + objects[0].id + "Object Position: " + objectX + " " + objectY + " Gary X = " + garyX + " Gary Y = " + garyY);
			return true;
		}

	//}
}

function gary(){
	window.addEventListener('keydown',moveGary);
}

function moveGary(event){
	console.log("hey");
	gary = document.getElementById('gary');
	//UP ARROW PRESSED
	if(event.keyCode=="38"){
		if(collide==false){
			positionMap(0,-5,'gary');
		}
		
	}

	//DOWN ARROW PRESSED
	if(event.keyCode=="40"){
		if(collide==false){
			positionMap(0,5,'gary');
		}
	}

	//LEFT ARROW PRESSED
	if(event.keyCode=="37"){
		if(collide==false){
			positionMap(-5,0,'gary');
		}
	}
	//RIGHT ARROW PRESSED
	if(event.keyCode=="39"){
		if(collide==false){
			positionMap(5,0,'gary');
		}
	}
	console.log("gary.style.left");
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