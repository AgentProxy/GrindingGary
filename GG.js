window.onload = function(){
	positionMap(440, 280, "gary");
	console.log(getX("gary"));
	console.log(getY("gary"));
	gary();
	window.girlListGlobal = girlMaker();
	/*EJFLOW*/
	// window.collisionChecker = setInterval(function(){
	// 	window.collide=garyCollision(girlListGlobal);
	// 	console.log("Collide: " + collide);
	// },1000);
	// window.collide = false;
	// for(var x = 0; x < girlListGlobal; x++){
	// 	collide = garyCollision(girlListGlobal[x]);
	// }
	// garyCollision(girlListGlobal);

	for(x=0;x<girlListGlobal.length;x++){
		console.log("Girl: " + girlListGlobal[x].id + " at X: " + getX(girlListGlobal[x].id) + " at Y: " + getY(girlListGlobal[x].id));
	}
	//EJFLOW 
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
	//gary = document.getElementById('gary');

	// for(var x=0; x<5; x++){
		garyX = getX('gary');
		garyY = getY('gary');
		objectX=getX(objects.id);
		objectY=getY(objects.id);
		console.log("current girl: " + objects.id);
		// if((objectX+40<=garyX)&&(((objectY+60>garyY)&&(objectY<garyY))||(objectY<garyY+60)&&(objectY+60>garyY+60))){
		//if((garyX<=objectX+40)&&(garyX+40<objectX+80)&&(garyX>objectX-40)) -- Range v1
		if(objectX<garyX&&objectX+40>garyX){
			return true;
		}
		else{
			//console.log('hey: ' + objects.id + "Object Position: " + objectX + " " + objectY + " Gary X = " + garyX + " Gary Y = " + garyY);
			
			return false;
		}

	// }
}//(objectY<garyY+60)&&(objectY+60>garyY+60))||(

function gary(){
	window.addEventListener('keydown',moveGary);
}

function moveGary(event){
	console.log("hey");
	gary = document.getElementById('gary');

	var collide;
	for(var x = 0; x < 5; x++){
		girlListGlobal[x].collide = garyCollision(girlListGlobal[x]);
		collide = girlListGlobal[x].collide;
		console.log("Collide: " + collide);
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
			// else{
			// 	console.log("collide with " + girlListGlobal[x].id);
			// }
		}
		//RIGHT ARROW PRESSED
		if(event.keyCode=="39"){
			if(collide==false){
				positionMap(5,0,'gary');
			}
		}
	}
	//UP ARROW PRESSED
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