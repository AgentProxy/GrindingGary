
// var garyX=440;
// var garyY=280;


window.onload = function(){
	//gary = document.getElementById('gary');
	//console.log(gary.style.left);
	positionMap(440, 280, "gary");

	console.log(getX("gary"));
	console.log(getY("gary"));
		 gary();
		 girls();
		//positionRandom();
}

function girls(){
	var girls = ['girl1','girl2','girl3','girl4','girl5'];
	girlGenerator();

	function girlGenerator(){
		var min=0,max=184;
		for (x=0; x<girls.length; x++){
// s
			console.log("max: " + (max-40) + " min: " + min);
			positionMap(randX(min,(max-40)),randY(),girls[x]);
			min=min+184;
			max=max+184;
// =======
// 			positionMap(randX(min,max),randY(),girls[x]);
// >>>>>>> 85a08e97c37c46b31129e6355f902321533bc56b
		}
	}

}

function randX(min,max){
	var randX;
// <<<<<<< HEAD
 	while(randX==null){
		randX = (Math.random()*(max-min)) + min; 
// =======
	//while(randX==null||randX>880){
	//	randX = (Math.random()*max) + min;;  
// >>>>>>> 85a08e97c37c46b31129e6355f902321533bc56b
		console.log("Random X: " + parseInt(randX));
	}
	return parseInt(randX);
}

function randY(){
	var randY;
// <<<<<<< HEAD
// 	while(randY==null||randY>540||(randY>getY('gary')-60&&randY<getY('gary')+60)||(randY<getY('gary')-60&&randY>getY('gary')+60)){
// =======
	while(randY==null||randY>540){
// >>>>>>> 85a08e97c37c46b31129e6355f902321533bc56b
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