/**
 * GameFrame.js
 * 
 * Object creation, isometric grid and redraw handled.
 * 
 */
 
 
 /**
  * createObj
  *	No params
  *	Populates array for floor and walls with each tile. 6x6
  */
function createObj() {
    var rows=0;
    var cols=0;
    for(var i=0; i<36; i++){
        var rect_floor={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], end:false, crevice:false
        };
        if(i%6==0){
            rows++;
            cols=0;
        }
        rect_floor.x=cols*rect_floor.width;
        rect_floor.y=rows*rect_floor.height;
        rect_floor.index=i;
        array_floor.push(rect_floor);
        cols++;
    }

    rows=0;
    cols=0;
    for(var j=0; j<36; j++){
        var rect_right={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], start:false
        };
        if(j%6==0){
            rows++;
            cols=0;
        }
        rect_right.x=cols*rect_right.width;
        rect_right.y=rows*rect_right.height;
        rect_right.index=j;
        array_right.push(rect_right);
        cols++;
    }

    rows=0;
    cols=0;
    for(var k=0; k<36; k++){
        var rectObj={
            width:55,height:55,color:"grey",x:0,y:0,index:0,type:null,points:[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
        };
        if(k%6==0){
            rows++;
            cols=0;
        }
        rectObj.x=cols*rectObj.width;
        rectObj.y=rows*rectObj.height;
        rectObj.index=k;
        array_left.push(rectObj);
        cols++;
    }
}

/**
 *	floor
 *	@param context is the context for the canvas 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function floor(context){
	endPoint=document.getElementById("end");
	creviceImg=document.getElementById("theCrevice");
    for(var i=0; i<array_floor.length; i++){
		if(i == end){
			getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
			var pos = shapePoints(i,0);
			array_floor[i].end = true;
		} else if(checkIfCrevice(i) == true) {
			getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
			array_floor[i].crevice = true;
		} else {
			context.beginPath();
			context.fillStyle="#65A658";
			context.setTransform(1,0.5,-1,0.5,455,395);
			context.strokeStyle="D6FFCD";
			context.strokeRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
			context.fillRect(array_floor[i].x,array_floor[i].y,array_floor[i].width,array_floor[i].height);
			array_floor[i].type="floor";
			getPoints(array_floor[i],1,0.5,-1,0.5,455,395);
		}
    }
	context.setTransform(1,0,0,1,0,0);
	context.drawImage(endPoint, pos.x, pos.y,109,109);
	
	drawCrevices(context);
    context.restore();
}

/**
 *	right_wall
 *	@context 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function right_wall(context){
	startPoint=document.getElementById("start");
    for(var i=0; i<array_right.length; i++){
		if(i == start){
			getPoints(array_right[i],1,0.5,0,1,400,38);
			var pos = getStart();
			var getPos = shapePoints(pos.theIndex,pos.theLayer);
			array_right[i].start = true;
		} else {
			egg = array_right[i];
			context.beginPath();
			context.fillStyle="#6DBB6C";
			context.strokeStyle="#D6FFCD";
			context.setTransform(1,0.5,0,1,400,38);
			context.strokeRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
			context.fillRect(array_right[i].x,array_right[i].y,array_right[i].width,array_right[i].height);
			array_right[i].type="right_wall";
			getPoints(array_right[i],1,0.5,0,1,400,38);
		}
    }
	context.setTransform(1,0,0,1,0,0);
	context.drawImage(startPoint, getPos.x, getPos.y,110,110);
    context.restore();
}

/**
 *	left_wall
 *	@context 
 *
 *	Draws each of the 36 tiles and transforms them for the 3D grid.
 *	Stores each point of the newly transformed tile back in the object.
 *	
 */
function left_wall(context){
    for(var i=0; i<array_left.length; i++){
        context.beginPath();
        context.fillStyle="#4E7F44";
        context.strokeStyle="#D6FFCD";
        context.setTransform(1,-0.5,0,1,70,203);
        context.strokeRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        context.fillRect(array_left[i].x,array_left[i].y,array_left[i].width,array_left[i].height);
        array_left[i].type="left_wall";
        getPoints(array_left[i],1,-0.5,0,1,70,203);
    }
    context.restore();
}

/**
 *	frame_horizontal
 *	@param context is the context for the canvas 
 *  drawing the frame 
 *	
 *	
 *	
 */
function frame_horizontal(context) {
    context.beginPath();
    context.strokeStyle="#D6FFCD";
    var grd_left = context.createLinearGradient(20, 20, 20, 55);
    grd_left.addColorStop(0, "#65A564");
    grd_left.addColorStop(0.5, "#DDF9C0");
    grd_left.addColorStop(1, "#D6FFCD");
    //bottom_left
    context.fillStyle=grd_left;
    context.setTransform(1,0.5,0,1.5,15,560);
    for(var i=0; i<7; i++) {
        context.strokeRect(i*55,0,55,55);
        context.fillRect(i*55,0,55,55);
    }
    var grd_right = context.createLinearGradient(20, 20, 20, 55);
    grd_right.addColorStop(0, "#50824F");
    grd_right.addColorStop(0.5, "#DDF9C0");
    grd_right.addColorStop(1, "#D6FFCD");
    //bottom_right
    context.fillStyle=grd_right;
    context.setTransform(1,-0.5,0,1.5,400,753);
    for(var j=0; j<7; j++) {
        context.strokeRect(j*55,0,55,55);
        context.fillRect(j*55,0,55,55);
    }

    context.fillStyle="#84E383";
    //top_right
    context.setTransform(1,0.5,-1,0.5,400,38);
    for(var k=0; k<7; k++) {
        context.strokeRect(k*55,0,55,55);
        context.fillRect(k*55,0,55,55);
    }
    //top_left
    context.setTransform(1,-0.5,1,0.5,15,230);
    for(var n=0; n<6; n++) {
        context.strokeRect(n*55,0,55,55);
        context.fillRect(n*55,0,55,55);
    }
    context.restore();
}

/**
 *	frame_vertical
 *	@param context is the context for the canvas 
 *
 *	draw the frame
 *	
 *	
 */
function frame_vertical(context) {
    context.beginPath();
    context.fillStyle="#50824F";
    context.strokeStyle="#D6FFCD";
    //right
    context.setTransform(1,-0.5,0,1,730,258);
    for(var i=0; i<6; i++) {
        context.strokeRect(0,i*55,55,55);
        context.fillRect(0,i*55,55,55);
    }
    context.fillStyle="#65A564";
    //left
    context.setTransform(1,0.5,0,1,15,230);
    for(var j=0; j<6; j++) {
        context.strokeRect(0,j*55,55,55);
        context.fillRect(0,j*55,55,55);
    }
    context.restore();
}

/**
 *	timer
 *	@context 
 *
 *	Timer for game play, loss cases and calculating score.
 *	
 */
function timer(context){
    clearInterval(mytimer);
    mytimer = setInterval(function (){
        context.clearRect(0, 0, 800, 10);
        document.getElementById('time').innerHTML=time-- +" seconds";
        var bar=time * 4;
        //console.log(time);
        if(time >= 150){
            context.fillStyle= "#00FF00";
        } else if(time >= 100){
            context.fillStyle="#00FFFF";
        } else if(time >= 50){
            context.fillStyle="#FFFF00";
        } else{
            context.fillStyle="#FF0000";
        }
        
        context.fillRect(0,0,bar - 10,10);
            
       if(time == -2){
            clearInterval(timer);
            $("#mycanvas").hide();
            $("#time").hide();
            printLoseScore();
            $("#gameOver").show();
        }
    }, 1000);
}

/**
 *	redraw
 *	@context 
 *
 *	redraws the entire canvas
 *	
 */
function redraw(context) {
    context.save();
    floor(context);
    context.save();
    right_wall(context);
    context.save();
    left_wall(context);
    context.save();
    frame_horizontal(context);
    context.save();
    frame_vertical(context);
    context.save();
}

/**
 *	addAllShapes
 *	@context 
 *	@position Contains all shapes that have been placed on the grid.
 *
 *	Draws all shapes that have been placed on the grid.
 *	
 */
function addAllShapes(context,position){
    context.setTransform(1, 0, 0, 1, 0, 0);
	for(i = 0; i < position.length;i++){
		for(var j = 0; j < position[i].length;j++){
			if(position[i][j].used == true){
				if(position[i][j].type == "box"){
					context.drawImage(box, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "box";
				} else if (position[i][j].type == "slope_SW"){
					context.drawImage(slope0, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "slope";
				} else if (position[i][j].type == "slope_NW"){
					context.drawImage(slope1, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "slope";
				} else if (position[i][j].type == "slope_NE"){
					context.drawImage(slope2, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "slope";
				} else if (position[i][j].type == "slope_SE"){
					context.drawImage(slope3, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "slope";
				}else if (position[i][j].type == "direction_SW"){
                    context.drawImage(direction0, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "direction";
                }else if (position[i][j].type == "direction_NW"){
                    context.drawImage(direction1, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "direction";
                }else if (position[i][j].type == "direction_NE"){
                    context.drawImage(direction2, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "direction";
                }else if (position[i][j].type == "direction_SE"){
                    context.drawImage(direction3, position[i][j].point.x, position[i][j].point.y-2,109,112);
                    position[i][j].shapeName = "direction";
                }
			}
		}
	}
//    console.log(position[0][0].point.x);
//    console.log(position[0][0].point.y);
}

/**
 *	addTransparentShape
 *	@context 
 *	@x position to draw shape
 *	@y position to draw shape
 *	@type shape type
 *
 *	Draws the transparent shape at correct location for being dragged.	
 *	
 */
function addTransparentShape(context,x,y,type){
	if(type == "box"){
		context.drawImage(trn_box, x, y,109,109);
	} else if (type == "slope_SW"){
		context.drawImage(trn_slope_SW, x, y,109,109);
	} else if (type == "slope_NW"){
		context.drawImage(trn_slope_NW, x, y,109,109);
	} else if (type == "slope_SE"){
		context.drawImage(trn_slope_SE, x, y,109,109);
	} else if (type == "slope_NE"){
		context.drawImage(trn_slope_NE, x, y,109,109);
	} else if (type == "direction_SW"){
		context.drawImage(trn_direction_SW, x, y,109,109);
	} else if (type == "direction_NW"){
		context.drawImage(trn_direction_NW, x, y,109,109);
	} else if (type == "direction_SE"){
		context.drawImage(trn_direction_SE, x, y,109,109);
	} else if (type == "direction_NE"){
		context.drawImage(trn_direction_NE, x, y,109,109);
	}
}

/*
 check if the tile is a crevice
 @return true or false as boolean
 @param pos just the floor tile
*/
function checkIfCrevice(pos){
	for(var i = 0; i < crevices.length;i++){
		if (crevices[i] == pos){
			return true;
		}
	}
	
	return false;
}

/*
 draw the crevices 
 @param context is the context for the canvas
*/
function drawCrevices(context){
	for(var i = 0; i < array_floor.length;i++){
		if(array_floor[i].crevice == true){
			var pos = shapePoints(i,0);
			context.setTransform(1,0,0,1,0,0);
			context.drawImage(creviceImg, pos.x, pos.y,109,109);			
		}
	}
}

/**
 *	orientationchange
 *		
 *	Checks if device has been rotates, only supports landscape mode.
 *	
 */
$(window).bind('orientationchange', function() {
    switch ( window.orientation ) {
        case 0:
            $('.turnDeviceNotification').css('display', 'none');
            // The device is in portrait mode now
            if(device.tablet() && !device.landscape()){
                alert("Please rotate your tablet to landscape to continue!");
            }
            break;

        case 180:
            $('.turnDeviceNotification').css('display', 'none');
            // The device is in portrait mode now
            if(device.tablet() && !device.landscape()){
                alert("Please rotate your phone to landscape to continue!");
            }
            break;

        case 90:
            // The device is in landscape now
            $('.turnDeviceNotification').css('display', 'block');
            if(device.landscape() && !device.tablet()){
                alert("Please rotate your phone back to portrait mode to continue!");
            }
            break;

        case -90:
            // The device is in landscape now
            $('.turnDeviceNotification').css('display', 'block');
            if(device.landscape() && !device.tablet()){
                alert("Please rotate your phone back to portrait mode to continue!");
            }
            break;
    }
});
