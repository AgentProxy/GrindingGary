
// var garyX=440;
// var garyY=280;


window.onload = function(){
	//gary = document.getElementById('gary');
	//console.log(gary.style.left);
	positionMap(440, 280, "gary");

	console.log(getX("gary"));
	console.log(getY("gary"));
		 gary();
		 girlMaker();
		//positionRandom();
}

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
		console.log(min  + "||" + max);
		girlList[x] = new girl(girlList[x], min, max);
	}

	for (var x=0; x<girlList.length; x++){
		girlGenerator(girlList[x]);
	}

}

function girlGenerator(girlObject){

	// var mult = girls.split("");
	// var multiplier = mult[4];
	// var min = 184 * (multiplier - 1);
	// var max = 184 * multiplier;
	console.log("max: " + (girlObject.max - 40) + " min: " + girlObject.min);
	positionMap(randX(girlObject.min, girlObject.max - 40), randY(), girlObject.id);
	// console.log(multiplier);

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

function gary(){

	 window.addEventListener('keydown',moveGary);

}

function moveGary(event){
		console.log("hey");
		gary = document.getElementById('gary');
		//UP ARROW PRESSED
		if(event.keyCode=="38"){
			positionMap(0,-5,'gary');
		}

		//DOWN ARROW PRESSED
		if(event.keyCode=="40"){
			positionMap(0,5,'gary');
		}

		//LEFT ARROW PRESSED
		if(event.keyCode=="37"){
			positionMap(-5,0,'gary');
			//garyX=garyX-40;
			//gary.style.left=garyX+"px";
		}
		//RIGHT ARROW PRESSED
		if(event.keyCode=="39"){
			positionMap(5,0,'gary');
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