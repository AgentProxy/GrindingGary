window.onload = function(){
	positionMap(440, 280, "gary");
	console.log(getX("gary"));
	console.log(getY("gary"));
		 gary();
		 girls();
}

function girls(){
	var girlList = ['girl1','girl2','girl3','girl4','girl5'];
	girlGenerator(girlList);
}


function girlGenerator(girlList){
	var min=0,max=184;
	for (x=0; x<girlList.length; x++){
		console.log("max: " + (max-40) + " min: " + min);
		console.log("Overlap?: "+overlapGaryX(girls[x]) + "Girl: " + girls[x]);
		positionMap(randX(min,(max-40)),randY(),girls[x]);
		min=min+184;
		max=max+184;
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

// function overlapGaryX(object){
// 	object = getX(object);
// 	gary = getX('gary');

// 	if((object < (gary-40))  && (object > (gary + 80))){
// 		return true;
// 	}
// 	else{
// 		return false;
// 	}

// }

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