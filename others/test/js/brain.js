/**
 *	brain.js
 *
 *	Controls the brain drawing and movement
 *
 */

/**
 *	brain
 *	@context
 *	@positions array of shape objects
 *	
 *	Initializing of brain, all functions for movement contained.
 */
function brain(context, positions){
    var movement;
	var startPoint = getStart();
	var brain=document.getElementById("brain");
	var theBrain ={
            spritex:0, x:0,y:0,brainLayer:0,brainIndex:0
        };
        //theBrain.spritex = 0;
	theBrain.brainLayer = startPoint.theLayer;
	theBrain.brainIndex = startPoint.theIndex;
	theBrain.x = array_right[start].points[3].x;
	theBrain.y = array_right[start].points[3].y;
	var direction = "direction_SW";
	
    
	startBrainRoll();
    
	/*
     start rolling the brain
    */
	function startBrainRoll(){
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0,0,canvas.width,canvas.height);
		redraw(context);
		addAllShapes(context, positions);
		control_frame(context);
        
        context.drawImage(brain, theBrain.spritex, 0, 99, 99, theBrain.x, theBrain.y, 30,30);
		
		whereTo();
	}
	
    /*
     determine where is the brain rolling
    */
	function whereTo(){
		//Find out direction
		if(positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_SW"
				|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_NW"
					|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_SE"
						|| positions[theBrain.brainLayer][theBrain.brainIndex].type == "direction_NE"){
			direction = positions[theBrain.brainLayer][theBrain.brainIndex].type;
		}
		
		if(theBrain.brainLayer == 0 && theBrain.brainIndex == end){
			win();
		} else if(theBrain.brainLayer == 0){
			if(isBlocked() == true){
				lose();
			} else {
				rollGround();
			}
		} else if (direction == "direction_SW"){
			if(isBlocked() == true){
				lose();
			} else {
				rollSW();
			}
		} else if (direction == "direction_NW"){
			if(isBlocked() == true){
				lose();
			} else {
				rollNW();
			}
		} else if (direction == "direction_SE"){
			if(isBlocked() == true){
				lose();
			} else {
				rollSE();
			}
		} else if (direction == "direction_NE"){
			if(isBlocked() == true){
				lose();
			} else {
				rollNE();
			}
		}
	}
	
    /*
     rolling on the ground 
    */
	function rollGround(){
		if(direction == "direction_SW"){
			theBrain.brainIndex += 6;
			moveBrain(0);
		} else if (direction == "direction_NW"){
			theBrain.brainIndex -= 1;
			moveBrain(1);
		} else if (direction == "direction_SE"){
			theBrain.brainIndex += 1;
			moveBrain(2);
		} else if (direction == "direction_NE"){
			theBrain.brainIndex -= 6;
			moveBrain(3);
		}
	}
	
    /*
     rolling to the south west
    */
	function rollSW(){		
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 6;
				moveBrain(0);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SW"){
				theBrain.brainIndex += 6;
				theBrain.brainLayer -=1;
				moveBrain(4);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
    /*
     rolling to the north west
    */
	function rollNW(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 1;
				if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NW"){
					moveBrain(8);
				} else {
					moveBrain(1);
				}
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NW"){
				theBrain.brainIndex -= 1;
				theBrain.brainLayer -=1;
				moveBrain(5);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
    /*
     rolling to south east
    */
	function rollSE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex += 1;
				moveBrain(2);
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_SE"){
				theBrain.brainIndex += 1;
				theBrain.brainLayer -=1;
				moveBrain(6);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
    /*
     rolling to north east
    */
	function rollNE(){
		if(positions[theBrain.brainLayer-1][theBrain.brainIndex].used == true){
			if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "box"){
				theBrain.brainIndex -= 6;
				if(positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NE"){
					moveBrain(9);
				} else {
					moveBrain(3);
				}
			} else if (positions[theBrain.brainLayer-1][theBrain.brainIndex].type == "slope_NE"){
				theBrain.brainIndex -= 6;
				theBrain.brainLayer -=1;
				moveBrain(7);
			} else {
				lose();
			}
		} else {
			lose();
		}
	}
	
    /*
     showing the Brain on the game frame
     @param direction is the direction that the brain will go
    */
	function moveBrain(direction){
		var moveInc;
		var imgInc;
		//Counter Clockwise SW,NW
		//Clockwise SE, NE
		if(direction == 0 || direction == 1 || direction == 4 || direction == 5 || direction == 8){
			moveInc = 0;
			imgInc = 0;
		} else {
			moveInc = 23;
			imgInc = 23;
		}
		var brainPoint = directionXY(direction);        
		
        movement = setInterval(function (){    
            removeAllEvent();
			if(easterActivated == true){
				brain.src = "images/egg/egg" + imgInc + ".png";
			} //else {
                //window.alert(theBrain.spritex + ", " + theBrain.x+ ", " + theBrain.y);
              //  if (theBrain.spritex == 2507){
                //    theBrain.spritex = 0;
              //  } 
			//}
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
            //context.drawImage(brain, spritex, 0, 99,99, theBrain.x,theBrain.y, 30,30);
            
			context.drawImage(brain, theBrain.spritex = imgInc * 109 , 0, 99, 99, theBrain.x += brainPoint.x,theBrain.y += brainPoint.y, 30, 30);
			if(direction == 0 || direction == 1 || direction == 4 || direction == 5 || direction == 8){
				if(moveInc == 23){
					clearInterval(movement);
					if(checkLoss() == true){
						lose();
					} else {
						whereTo();
					}
				}
				moveInc++;
				imgInc++;
				if(imgInc  == 23){
					imgInc = 0;
				}
			} else {
				if(moveInc == 0){
					clearInterval(movement);
					if(checkLoss() == true){
						lose();
					} else {
						whereTo();
					}
				}
				moveInc--;
				imgInc--;
				if(imgInc  == 0){
					imgInc = 23;
				}
			}
		}, 25);
    }
	
    /*
     check does it lose or not
     @return does the user lose or not as boolean
    */
	function checkLoss(){
		if(theBrain.brainIndex < 36 && theBrain.brainIndex >= 0){
			if (array_floor[theBrain.brainIndex].crevice == true){
				return true;
			}
		}
		
		if(direction == "direction_SW"){
			if(theBrain.brainIndex > 35){
				return true;
			}
		} else if (direction == "direction_NW"){
			if(theBrain.brainIndex < 0 || theBrain.brainIndex % 6 == 5){
				return true;
			}
		} else if (direction == "direction_SE"){
			if(theBrain.brainIndex % 6 == 0){
				return true;
			}
		} else if (direction == "direction_NE"){
			if(theBrain.brainIndex < 0){
				return true;
			}
		}
	}
	
    /*
     the direction values (cordination) for rolling 
     @param direction is the direction that the brain will move to
     @return the coordination of the brain moving
    */
	function directionXY(direction){
		var theX;
		var theY;
		if(direction == 0){
			//FLAT SW
			theX = -2.25;
			theY = 1.166666666;
		}else if (direction == 1){
			//FLAT NW
			theX = -2.25;
			theY = -1.166666666;
		} else if (direction == 2){
			//FLAT SE
			theX = 2.25;
			theY = 1.166666666;
		} else if (direction == 3){
			//FLAT NE
			theX = 2.25;
			theY = -1.166666666;
		} else if (direction == 4){
			//SLOPE SW
			theX = -2.2916666666;
			theY = 3.2083333333;
		} else if (direction == 5){
			//SLOPE NW
			theX = -2.2916666666;
			theY = 1.10;
		} else if (direction == 6){
			//SLOPE SE
			theX = 2.2916666666;
			theY = 3.2083333333;
		} else if (direction == 7){
			//SLOPE NE
			theX = 2.2916666666;
			theY = 1;
		} else if (direction == 8){
			//SPECIAL CASE: NW next shape slope
			theX = -1.78125;
			theY = -0.9236111105833333;
		} else if (direction == 9){
			//SPECIAL CASE: NE next shape slope
			theX = 1.125;
			theY = -0.583333333;
		}
		
		return { 	x: theX,
					y: theY
		};
	}
	
    /*
     check does the shapes block the brain moving or not
     @return the shapes blocked or not as boolean
    */
	function isBlocked(){
		if(positions[theBrain.brainLayer][theBrain.brainIndex].used == true
			&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_SW"
				&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_NW"
					&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_SE"
						&& positions[theBrain.brainLayer][theBrain.brainIndex].type != "direction_NE"){
			return true;
		} else {
			return false;
		}
	}
	
    /*
     lose the game function will show the explosion animation and show the game over page
    */
	function lose(){
        clearInterval(movement);
        var i = 0;
        var explosion= setInterval(function (){
			if(easterActivated == true){
				brain.src = "images/EGGSPLOSION/ee" + i + ".png";
				console.log(brain.src);
			} else {
				brain.src = "images/EXPLOSION/e" + i + ".png";
			}
            
            context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
            context.drawImage(brain, theBrain.spritex, 0, 99, 99, theBrain.x, theBrain.y, 30,30);
            //context.drawImage(brain, theBrain.x, theBrain.y, 30, 30);
            i++;
            if(i==19){
                i = 0;
            }
        },100);
        setTimeout(function (){
            clearInterval(explosion);
            $("#mycanvas").hide();
            $("#time").hide();
            $("#gameOver").show();
            printLoseScore(); 
        },2000);
	}
	
    /*
     the win function show the dropping animation and the game win page and calculate the score
    */
	function win(){
        timesOfWin++;
        clearInterval(movement);
		var i = 0;
        var dropBall= setInterval(function (){
			if(easterActivated == true){
				brain.src = "images/eggDrop/ed" + i + ".png";
			} else {
				brain.src = "images/Drop/d" + i + ".png";
			}
            
            context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0,0,canvas.width,canvas.height);
			redraw(context);
			addAllShapes(context, positions);
			control_frame(context);
            context.drawImage(brain, theBrain.spritex, 0, 99, 99, theBrain.x, theBrain.y += 3.5, 30,30);
            //context.drawImage(brain, theBrain.x, theBrain.y += 3.5, 30, 30);
            i++;
            if(i==9){
                i = 0;
            }
        },200);
        setTimeout(function (){
			clearInterval(dropBall);
			if(time < 0){
				time= 0;
			}
			theScore += (time/4) * 10;
			//console.log(theScore);
			if(levels == 0){
				var height = parseInt((35-start) / 6);
				var far = parseInt(end/6);
				if(height == 0){
					height = 1;
				}
				//console.log(height);
				theScore += height*(time/4)/10;
				//console.log(theScore);
				if(far < height){
					theScore += (height - far)*(time/4)/10;
					theScore = parseInt(theScore);
				}else {
					theScore = parseInt(theScore);
				}
				for(i = 0; i < positions.length; i++){
					for(j = 0; j < positions[i].length; j++){
						if(positions[i][j].used == true){
							switch(positions[i][j].shapeName){
								case "box":
									theScore -= 5;
									break;
								case "slope":
									theScore -= 10;
									break;
								case "direction":
									theScore -= 15;
									break;
								default:
									break;
							}
						}
					}
				}
			}
			$("#mycanvas").hide();
			$("#time").hide();
			$("#gameWin").show();
			if(achievement_one()){
				$("#achieve_1").show();
			}
			if(achievement_two()){
				$("#achieve_2").show();
			}
			if(achievement_three()){
				$("#achieve_3").show();
			}
			printWinScore(theScore-currentScore);
            currentScore = theScore;
        },2000);
	}
}

/**
 *	getStart
 *	
 *	@return starting x and y of brain.
 */
function getStart(){		
	return { 	theLayer: parseInt((35-start) / 6),
				theIndex: parseInt(start%6)
	};
}

	/**
	 *	sendScore
	 *
	 *	Send the score.
	 */
function getScore(){
    if(levels == 0){
        document.location.href="/form2.html?score=" + theScore + "&achievement1=" + achievement1 + "&achievement2=" +achievement2 + "&achievement3=" + achievement3;
    }else {
        document.location.href="/form.html?score=" + theScore;   
    }
}


	/**
	 *	printLoseScore
	 *
	 *	Show score after losing the game.
	 */
function printLoseScore(){
    document.getElementById('loseScore').innerHTML = theScore;
}

	/**
	 *	printWinScore
	 *
	 *	Show score after winning the game.
	 */
function printWinScore(currentScore){
    document.getElementById('winScore').innerHTML = theScore;
    document.getElementById('levelScore').innerHTML = currentScore;
}
