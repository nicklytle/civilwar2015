define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry'],
function(PIXI, Screen, Images, Collisions) {
	// the next time i see somebody not using
	// indentation, i swear to TJ i'm going to
	// MURDER THEM!!! - andy
	//I fixed the indentation. Please put the knife down. -David
	function graphnode(sprite,name,adjacent){
		this.sprite = sprite;
		this.name = name;
		this.adjacent = adjacent;
		this.touching = function(pos){
			if(Collisions.doRectanglesOverlap(this.sprite.getBounds(), pos, 0)){
				return true;
			}
			return false;
		}
		this.toString = function(){
			return this.name;
		}
		this.setinvis = function(){
			this.sprite.gotoAndStop(0);
		}
		this.setvis = function(){
			this.sprite.gotoAndStop(1);
		}
		this.setenemy = function(){
			this.sprite.gotoAndStop(2);
		}
		this.setescape = function(){
			this.sprite.gotoAndStop(3);
		}
		this.isAdj = function(node){
			for(var key in adjacent){
				if(adjacent[key] == node){
					return true;
				}
			}
			return false;
		}
	}

	var SampleMiniGame = new Screen({
		init: function(){
				/*
				There's an issue where on occasion the necessary assets don't load.
				This is bigger than just this code, but if it doesn't seem to be
				working when you make the change, check the console log.
				Need to implement win nodes in a better way than hard-coding them
				*/
				var backMap = Images.getTexture("map.png");
				var back = new PIXI.Sprite(backMap);
				this.stage.addChild(back);
				var markTexture = [];
			    markTexture.push(Images.getTexture("node.png"));
			    markTexture.push(Images.getTexture("node_player.png"));
			    markTexture.push(Images.getTexture("node_enemy.png"));
			    markTexture.push(Images.getTexture("node_escape.png"));
			  
			  /*this.marker = new graphnode(new PIXI.MovieClip(markTexture), "start",[]);
			  this.mark2 = new graphnode(new PIXI.MovieClip(markTexture), "end",[this.marker]);
			  this.mark3 = new graphnode(new PIXI.MovieClip(markTexture), "bonus",[this.marker,this.mark2]);
			  this.mark4 = new graphnode(new PIXI.MovieClip(markTexture), "namesarenotimportantrightnow",[this.marker,this.mark2, this.mark3]);
			  this.marker.adjacent.push(this.mark2);
			  this.marker.adjacent.push(this.mark3);
			  this.marker.adjacent.push(this.mark4);
			  this.mark2.adjacent.push(this.mark3);
			  this.mark2.adjacent.push(this.mark4);
			  this.mark3.adjacent.push(this.mark4);
				this.stage.addChild(this.marker.sprite);
				this.stage.addChild(this.mark2.sprite);
				this.stage.addChild(this.mark3.sprite);
				this.stage.addChild(this.mark4.sprite);
				this.marker.sprite.position.x = 100;
				this.marker.sprite.position.y = 30;
				this.mark2.sprite.position.x = 200;
				this.mark3.sprite.position.x = 300;
				this.mark4.sprite.position.x = 400;
				this.mark3.sprite.position.y = 50;
				this.mark3.setescape();*/
				this.graph = [];
				this.playernode = 10;
				this.enemynode = 11;
				this.moves = 100;
			  //this.graph[this.playernode].setvis();
			  
			  // WTF IS THIS?! -- andy
			  strData = "50,475,\"San Antonio, Texas\",\"2,3\",2\n" + 
				"70,425,\"Austin, Texas\",\"1,3,4\",0\n" +
				"100,445,\"Houston, Texas\",\"1,2,4,5\",0\n" +
				"150,410,\"Alexandria, Louisiana\",\"2,3,5,7\",0\n" +
				"200,430,\"Baton Rouge, Louisiana\",\"3,4,6,7,11\",0\n" +
				"210,455,\"New Orleans, Louisiana\",\"5,\",5\n" +
				"205,375,\"Jackson, Mississippi\",\"4,5,8,10\",0\n" +
				"185,320,\"Little Rock, Arkansas\",\"7,9,15,16\",1\n" +
				"270,345,\"Birmingham, Alabama\",\"8,10,16,17\",1\n" +
				"270,375,\"Montgomery, Alabama\",\"7,9,11,17\",0\n" +
				"275,420,\"Tallahassee, Florida\",\"5,10,12\",0\n" +
				"365,430,\"St. Augustine, Florida\",\"11,13,18\",0\n" +
				"375,475,\"Lakeland, Florida\",\"12,14\",0\n" +
				"400,515,\"Everglades, Florida\",\"13,\",6\n" +
				"175,270,\"Springfield, Missouri\",\"8,19\",0\n" +
				"260,300,\"Nashville, Tennessee\",\"8,9,20\",0\n" +
				"310,360,\"Atlanta, Georgia\",\"9,10,18,22\",0\n" +
				"365,375,\"Savannah, Georgia\",\"12,17,23\",0\n" +
				"185,260,\"Saint Louis, Missouri\",\"15,27\",0\n" +
				"270,265,\"Louisiville, Kentucky\",\"16,21,31\",0\n" +
				"355,275,\"Roanoke, Virginia\",\"20,22,24,35,36\",1\n" +
				"360,335,\"Columbia, South Carolina\",\"17,21,23\",0\n" +
				"395,345,\"Charleston, South Carolina\",\"18,22,25,42\",4\n" +
				"405,295,\"Raleigh, North Carolina\",\"21,25\",0\n" +
				"430,310,\"Jacksonville, North Carolina\",\"23,24\",0\n" +
				"155,185,\"Des Moines, Iowa\",\"27,29\",0\n" +
				"205,220,\"Springfield, Illinois\",\"19,26,29,30\",0\n" +
				"205,140,\"Madison, Wisconsin\",\"26,29\",2\n" +
				"225,190,\"Chicago, Illinois\",\"27,28,30\",0\n" +
				"250,235,\"Indianapolis, Indiana\",\"27,29,31\",0\n" +
				"310,195,\"Cincinnati, Ohio\",\"27,29,32\",0\n" +
				"210,145,\"Detroit, Michigan\",\"27,29,33\",2\n" +
				"305,220,\"Columbus, Ohio\",\"27,29,34\",0\n" +
				"295,240,\"Cleveland, Ohio\",\"27,29,35\",0\n" +
				"355,230,\"Charleston, West Virginia\",\"27,29,36\",0\n" +
				"405,248,\"Richmond, Virginia\",\"27,29,37\",0\n" +
				"370,190,\"Pittsburgh, Pennysylvania\",\"27,29,38\",0\n" +
				"420,215,\"Annapolis, Maryland\",\"27,29,39\",0\n" +
				"430,195,\"Philadelphia, Pennysylvania\",\"27,29,40\",0\n" +
				"435,140,\"Rochester, New York\",\"27,29,41\",2\n" +
				"385,135,\"Albany, New York\",\"27,29,42\",0\n" +
				"450,175,\"New York, New York\",\"27,29,43\",0\n" +
				"485,130,\"Boston, Massachusetts\",\"27,29,44\",0\n" +
				"465,95,\"Montpelier, Vermont\",\"27,29,45\",2";
			  //all this code shamelessly stolen from http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
				  // Check to see if the delimiter is defined. If not,
				  // then default to comma.
				strDelimiter = null;
				strDelimiter = (strDelimiter || ",");

				  // Create a regular expression to parse the CSV values.
				  var objPattern = new RegExp(
					(
					  // Delimiters.
					  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

					  // Quoted fields.
					  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

					  // Standard fields.
					  "([^\"\\" + strDelimiter + "\\r\\n]*))"
					),
					"gi"
					);


				  // Create an array to hold our data. Give the array
				  // a default empty first row.
				  var arrData = [[]];

				  // Create an array to hold our individual pattern
				  // matching groups.
				  var arrMatches = null;


				  // Keep looping over the regular expression matches
				  // until we can no longer find a match.
				  while (arrMatches = objPattern.exec( strData )){

					// Get the delimiter that was found.
					var strMatchedDelimiter = arrMatches[ 1 ];

					// Check to see if the given delimiter has a length
					// (is not the start of string) and if it matches
					// field delimiter. If id does not, then we know
					// that this delimiter is a row delimiter.
					if (
						strMatchedDelimiter.length &&
						(strMatchedDelimiter != strDelimiter)
					){

					  // Since we have reached a new row of data,
					  // add an empty row to our data array.
						arrData.push( [] );

					}


					// Now that we have our delimiter out of the way,
					// let's check to see which kind of value we
					// captured (quoted or unquoted).
					if (arrMatches[ 2 ]){
					  // We found a quoted value. When we capture
					  // this value, unescape any double quotes.
						var strMatchedValue = arrMatches[ 2 ].replace(
						new RegExp( "\"\"", "g" ),
						"\""
						);
					} else {
					  // We found a non-quoted value.
						var strMatchedValue = arrMatches[ 3 ];
					}


					// Now that we have our value string, let's add
					// it to the data array.
					arrData[ arrData.length - 1 ].push( strMatchedValue );
				  }
			  
			  //shameless stealing ends here
			  
			  for(var key in arrData){
				  //alert(arrData[key][2]);
				  var tempnode = new graphnode(new PIXI.MovieClip(markTexture), arrData[key][2],[]);
				  this.stage.addChild(tempnode.sprite);
				  tempnode.sprite.position.x = arrData[key][0];
				  tempnode.sprite.position.y = arrData[key][1];
				  this.graph.push(tempnode);
			  }
			  for(var adj in arrData){
				  //alert(arrData[adj][3]);
				  var adjArr = arrData[adj][3].split(',');
				  for(var adjNode in adjArr){
					this.graph[adj].adjacent.push(this.graph[parseInt(adjArr[adjNode]) - 1]);
				  }
			  }
			  this.graph[this.playernode].setvis();
			  this.graph[0].setescape();
			  this.graph[27].setescape();
			  this.graph[31].setescape();
			  this.graph[39].setescape();
			  this.graph[43].setescape();
			  this.playerturn = true;
			  this.switchtimer = 120;
		  },
		  update: function(delta)
		  {
			  if(this.switchtimer < 1){
					this.switchtimer = 120;
					if(this.playerturn){
						this.graph[this.enemynode].setinvis();
						this.graph[this.playernode].setvis();
					}else{
						this.graph[this.playernode].setinvis();
						this.graph[this.enemynode].setenemy();
					}
				}else{
					this.switchtimer = this.switchtimer - 1;
				}
		  },
		  onKeyDown: function(keyCode)
		  {
			if (arrayContains(KEYS_EXIT,keyCode))
			{
			  this.changeScreen(TestWorldScreen);
			}
		  },
		  onMouseDown: function(point)
		  {
			if(this.playerturn){
				//this.graph[this.playernode].setvis();
				for(var i = 0; i < this.graph.length; i++){
				//console.log("checking node " + i);
					if(this.graph[i].touching(point) && this.graph[this.playernode].isAdj(this.graph[i]) && this.moves > 0){
						this.playerturn = false;
						console.log("MOVING TO NODE " + i);
						this.graph[this.playernode].setinvis();
						this.graph[i].setvis();
						this.playernode = i;
						this.moves = this.moves - 1;
					}
				}
				if (this.playernode == 0 || this.playernode == 27 || this.playernode == 31 || this.playernode == 39 || this.playernode == 43 ){
					alert("you win!");
					this.graph[this.playernode].setinvis();
					this.changeScreen(TestWorldScreen);
					this.playernode = 0;
				}
					if (this.enemynode == this.playernode){
						alert("you lose!");
						this.graph[this.playernode].setinvis();
						this.changeScreen(TestWorldScreen);
						this.playernode = 0;
					}
			}else{
				for(var i = 0; i < this.graph.length; i++){
					//console.log("checking node " + i);
					if(this.graph[i].touching(point) && this.graph[this.enemynode].isAdj(this.graph[i]) && i != 0 && i != 27 && i != 31 && i != 39 && i != 43){
						this.playerturn = true;
						console.log("MOVING ENEMY TO NODE " + i);
						this.graph[this.enemynode].setinvis();
						this.graph[i].setenemy();
						this.enemynode = i;
						//this.moves = this.moves - 1;
					}
				}
				if (this.enemynode == this.playernode){
					alert("you lose!");
					this.graph[this.playernode].setinvis();
					this.changeScreen(TestWorldScreen);
					this.playernode = 0;
				}
			}
		  }
	});
	  return SampleMiniGame;
  }
);