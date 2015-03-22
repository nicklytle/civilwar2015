define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry',
  'game/constants', 'engine/arrays'],

function(PIXI, Screen, Images, Collisions, constants, arrays) {
	function getHubScreen() {
		return require('game/screens/GameHub');
	}
//console.log("GETHERE");
	function enemy_ship(sprite, name, question, answer){
		this.sprite = sprite;
		this.name = name;
		this.question = question;
		this.answer = answer;
		this.touching = function(pos){
			console.log(pos);
			console.log(this.sprite.getBounds());
			pos.width=1;
			pos.height=1;
			if(Collisions.doRectanglesOverlap(this.sprite.getBounds(), pos, 0)){
				return true;
			}
			return false;
		}
		this.speed=Math.random()*2+2;
	}


	var SampleMiniGame = new Screen({
		init: function(){
				//Need to declare a "ship" type to match questions, answers, and sprites
			  //Need to initialize a question box, an answer box, our ship, and start the enemies
			this.staging = 0;
			this.music = new Audio('assets/music/(ShipGame)_DrunkenSailor.wav');
			this.music.loop = true;
			this.shipHit = new Audio(
			'assets/music/(ShipGame)_EnemyHit.wav');
			this.playerHit = new Audio(
			'assets/music/(ShipGame)_PlayerHit.wav');

			this.cheat_arr=[38,38,40,40,37,39,37,39,66,65];
			this.cheat_index = 0;
			var backMap = Images.getTexture("minibg.png");
			var back = new PIXI.Sprite(backMap);
			back.scale.x *= .7;
			back.scale.y *= .7;
			this.stage.addChild(back);
			//var this.enemySet = [];
			this.questionNums = [5,5,10,5,5,10,15];
			this.questionArr = [
			[["South Carolina",true],
						["Mississippi",true],
						["Florida",true],
						["Alabama",true],
						["Georgia",true],
						["Louisiana",true],
						["Texas",true],
						["Virginia",true],
						["Arkansas",true],
						["North Carolina",true],
						["Tennessee",true],
						["Capital was Richmond, VA",true],
						["California",false],
						["Connecticut",false],
						["Delaware",false],
						["Illinois",false],
						["Indiana",false],
						["Iowa",false],
						["Kansas",false],
						["Kentucky",false],
						["Maine",false],
						["Maryland",false],
						["Massachusetts",false],
						["Michigan",false],
						["Minnesota",false],
						["Missouri",false],
						["Nevada",false],
						["New Hampshire",false],
						["New Jersey",false],
						["New York",false],
						["Ohio",false],
						["Oregon",false],
						["Pennsylvania",false],
						["Rhode Island",false],
						["Vermont",false],
						["West Virginia",false],
						["Wisconsin",false],
						["Capital was Washington, D.C.",false]],//END OF STATES
						[["Fort Sumter Victory",true],
						["First Battle of Bull Run Victory",true],
						["Second Battle of Bull Run Victory",true],
						["Battle of Fredericksburg Victory",true],
						["Battle of Chancellorsville Victory",true],
						["Northern Virginia Campaign Victory",true],
						["Lost the War",true],
						["Less Soldiers Lost",true],
						["Smaller Army",true],
						["General Pickett’s Charge",true],
						["Merrimack",true],
						["Gettysburg Victory",false],
						["Battle of Vicksburg Victory",false],
						["Antietam Victory",false],
						["Won the War",false],
						["Bigger Army",false],
						["Anaconda Plan",false],
						["Lost More Soldiers",false],
						["Battle of Appomattox Court House Victory",false],
						["Battle of Petersburg Victory",false],
						["Monitor",false]],//END OF BATTLES
						[["South Carolina",true],
						["Mississippi",true],
						["Florida",true],
						["Alabama",true],
						["Georgia",true],
						["Louisiana",true],
						["Texas",true],
						["Virginia",true],
						["Arkansas",true],
						["North Carolina",true],
						["Tennessee",true],
						["Capital was Richmond, VA",true],
						["California",false],
						["Connecticut",false],
						["Delaware",false],
						["Illinois",false],
						["Indiana",false],
						["Iowa",false],
						["Kansas",false],
						["Kentucky",false],
						["Maine",false],
						["Maryland",false],
						["Massachusetts",false],
						["Michigan",false],
						["Minnesota",false],
						["Missouri",false],
						["Nevada",false],
						["New Hampshire",false],
						["New Jersey",false],
						["New York",false],
						["Ohio",false],
						["Oregon",false],
						["Pennsylvania",false],
						["Rhode Island",false],
						["Vermont",false],
						["West Virginia",false],
						["Wisconsin",false],
						["Capital was Washington, D.C.",false],
						["Fort Sumter Victory",true],
						["First Battle of Bull Run Victory",true],
						["Second Battle of Bull Run Victory",true],
						["Battle of Fredericksburg Victory",true],
						["Battle of Chancellorsville Victory",true],
						["Northern Virginia Campaign Victory",true],
						["Lost the War",true],
						["Less Soldiers Lost",true],
						["Smaller Army",true],
						["General Pickett’s Charge",true],
						["Merrimack",true],
						["Gettysburg Victory",false],
						["Battle of Vicksburg Victory",false],
						["Antietam Victory",false],
						["Won the War",false],
						["Bigger Army",false],
						["Anaconda Plan",false],
						["Lost More Soldiers",false],
						["Battle of Appomattox Court House Victory",false],
						["Battle of Petersburg Victory",false],
						["Monitor",false]],//END OF REVIEW1
						[["General Robert E. Lee",true],
						["Thomas “Stonewall” Jackson",true],
						["Jefferson Davis",true],
						["General Pickett",true],
						["General J.E.B. Stuart",true],
						["Abraham Lincoln",false],
						["General Ulysses S. Grant",false],
						["General Sherman",false],
						["General McClellan",false],
						["General Custer",false],
						["General Meade",false],
						["Clara Barton",false]],//END OF PEOPLE
						[["“Battle Hymn of the Republic”",false],
						["Industrialized Economy",false],
						["Uncle Tom’s Cabin",false],
						["More Urbanized",false],
						["Emancipation Proclamation",false],
						["Gettysburg Address",false],
						["“House Divided Against It Self…”",false],
						["Pro Tariffs",false],
						["Strong Federal Government",false],
						["Slaves were Soldiers",false],
						["“Dixie”",true],
						["Rebel Yell",true],
						["State’s Rights",true],
						["Stars and Bars",true],
						["King Cotton",true],
						["Stars and Stripes",false],
						["Agricultural Economy",true],
						["Rural",true],
						["Anti Tariff",true],
						["Slaves were Laborers",true]],//END OF CULTURE
						[["General Robert E. Lee",true],
						["Thomas “Stonewall” Jackson",true],
						["Jefferson Davis",true],
						["General Pickett",true],
						["General J.E.B. Stuart",true],
						["Abraham Lincoln",false],
						["General Ulysses S. Grant",false],
						["General Sherman",false],
						["General McClellan",false],
						["General Custer",false],
						["General Meade",false],
						["Clara Barton",false],
						["“Battle Hymn of the Republic”",false],
						["Industrialized Economy",false],
						["Uncle Tom’s Cabin",false],
						["More Urbanized",false],
						["Emancipation Proclamation",false],
						["Gettysburg Address",false],
						["“House Divided Against It Self…”",false],
						["Pro Tariffs",false],
						["Strong Federal Government",false],
						["Slaves were Soldiers",false],
						["“Dixie”",true],
						["Rebel Yell",true],
						["State’s Rights",true],
						["Stars and Bars",true],
						["King Cotton",true],
						["Stars and Stripes",false],
						["Agricultural Economy",true],
						["Rural",true],
						["Anti Tariff",true],
						["Slaves were Laborers",true]],//END OF REVIEW2
						[["South Carolina",true],
						["Mississippi",true],
						["Florida",true],
						["Alabama",true],
						["Georgia",true],
						["Louisiana",true],
						["Texas",true],
						["Virginia",true],
						["Arkansas",true],
						["North Carolina",true],
						["Tennessee",true],
						["Capital was Richmond, VA",true],
						["California",false],
						["Connecticut",false],
						["Delaware",false],
						["Illinois",false],
						["Indiana",false],
						["Iowa",false],
						["Kansas",false],
						["Kentucky",false],
						["Maine",false],
						["Maryland",false],
						["Massachusetts",false],
						["Michigan",false],
						["Minnesota",false],
						["Missouri",false],
						["Nevada",false],
						["New Hampshire",false],
						["New Jersey",false],
						["New York",false],
						["Ohio",false],
						["Oregon",false],
						["Pennsylvania",false],
						["Rhode Island",false],
						["Vermont",false],
						["West Virginia",false],
						["Wisconsin",false],
						["Capital was Washington, D.C.",false],
						["Fort Sumter Victory",true],
						["First Battle of Bull Run Victory",true],
						["Second Battle of Bull Run Victory",true],
						["Battle of Fredericksburg Victory",true],
						["Battle of Chancellorsville Victory",true],
						["Northern Virginia Campaign Victory",true],
						["Lost the War",true],
						["Less Soldiers Lost",true],
						["Smaller Army",true],
						["General Pickett’s Charge",true],
						["Merrimack",true],
						["Gettysburg Victory",false],
						["Battle of Vicksburg Victory",false],
						["Antietam Victory",false],
						["Won the War",false],
						["Bigger Army",false],
						["Anaconda Plan",false],
						["Lost More Soldiers",false],
						["Battle of Appomattox Court House Victory",false],
						["Battle of Petersburg Victory",false],
						["Monitor",false],
						["General Robert E. Lee",true],
						["Thomas “Stonewall” Jackson",true],
						["Jefferson Davis",true],
						["General Pickett",true],
						["General J.E.B. Stuart",true],
						["Abraham Lincoln",false],
						["General Ulysses S. Grant",false],
						["General Sherman",false],
						["General McClellan",false],
						["General Custer",false],
						["General Meade",false],
						["Clara Barton",false],
						["“Battle Hymn of the Republic”",false],
						["Industrialized Economy",false],
						["Uncle Tom’s Cabin",false],
						["More Urbanized",false],
						["Emancipation Proclamation",false],
						["Gettysburg Address",false],
						["“House Divided Against It Self…”",false],
						["Pro Tariffs",false],
						["Strong Federal Government",false],
						["Slaves were Soldiers",false],
						["“Dixie”",true],
						["Rebel Yell",true],
						["State’s Rights",true],
						["Stars and Bars",true],
						["King Cotton",true],
						["Stars and Stripes",false],
						["Agricultural Economy",true],
						["Rural",true],
						["Anti Tariff",true],
						["Slaves were Laborers",true]]//END OF REVIEW3
			];

			this.playerTexture = [];
			this.playerTexture.push(Images.getTexture("ironclad.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire1.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire2.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire3.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire4.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire5.png"));
			this.playerTexture.push(Images.getTexture("ironcladfire6.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode1.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode2.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode3.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode4.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode5.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode6.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode7.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode8.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode9.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode10.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode11.png"));
			//this.playerTexture.push(Images.getTexture("ironcladsplode12.png"));
			this.playerShip = new enemy_ship(new PIXI.MovieClip(this.playerTexture),"Player","","Q");
			this.playerShip.sprite.position.x = 370;
			this.playerShip.sprite.position.y = 240;
			this.stage.addChild(this.playerShip.sprite);

			/*this.backgroundBox = new PIXI.Sprite(Images.getTexture("BOXClear.png"));
			this.backgroundBox.position.x = 490;
			this.backgroundBox.position.y = 490;
			this.stage.addChild(this.backgroundBox);*/

			this.playerLives = 3;
			this.round = 1;
			this.score = 0;
			this.enemies = this.questionNums[0];
			this.yCoord = 0;
			this.isActiveEnemy = true;
			this.enemyTimer = 500;
			this.enemyTexture = [];
			this.enemyTexture.push(Images.getTexture("woodship.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode1.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode2.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode3.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode4.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode5.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode6.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode7.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode8.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode9.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode10.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode11.png"));
			this.enemyTexture.push(Images.getTexture("woodshipsplode12.png"));


			//text field declarations
			/*this.answerText1 = new PIXI.Text("A: UNION",{font:"30px Arial ", fill:"blue"});
			this.answerText1.position.x = 500;
			this.answerText1.position.y = 500;
			this.stage.addChild(this.answerText1);
			this.answerText2 = new PIXI.Text("B: CONFEDERACY",{font:"30px Arial ", fill:"gray"});
			this.answerText2.position.x = 500;
			this.answerText2.position.y = 550;
			this.stage.addChild(this.answerText2);*/
			this.roundText = new PIXI.Text("Round: " + this.round,{font:"30px Arial "});
			this.roundText.position.x = 0;
			this.roundText.position.y = 0;
			this.stage.addChild(this.roundText);
			this.livesText = new PIXI.Text("Lives: " + this.playerLives,{font:"30px Arial "});
			this.livesText.position.x = 550;
			this.livesText.position.y = 0;
			this.stage.addChild(this.livesText);
			this.leftInRoundText = new PIXI.Text("Left in round: " + this.enemies,{font:"30px Arial "});
			this.leftInRoundText.position.x = 300;
			this.leftInRoundText.position.y = 40;
			this.stage.addChild(this.leftInRoundText);
			this.scoreText = new PIXI.Text("Score: " + this.score,{font:"30px Arial "});
			this.scoreText.position.x = 300;
			this.scoreText.position.y = 0;
			this.stage.addChild(this.scoreText);
			this.timerText = new PIXI.Text("Time To Answer: " + Math.floor(this.enemyTimer / 60),{font:"30px Arial "});
			this.timerText.position.x = 0;
			this.timerText.position.y = 40;
			this.stage.addChild(this.timerText);

			//ITEMS RELATED TO OPENING

			this.graphics = new PIXI.Graphics();

			this.graphics.beginFill(0xFFFFFF);

			// set the line style to have a width of 5 and set the color to red
			this.graphics.lineStyle(5, 0x000000);

			// draw a rectangle
			this.graphics.drawRect(100, 100, 600, 400);

			this.stage.addChild(this.graphics);

			this.otherText = new PIXI.Text("Ahoy, Sailor!",{font:"60px Arial "});
			this.otherText.position.x = 225;
			this.otherText.position.y = 125;
			this.stage.addChild(this.otherText);


			this.otherText3 = new PIXI.Text("Welcome to the USS Monitor!",{font:"30px Arial "});
			this.otherText3.position.x = 190;
			this.otherText3.position.y = 225;
			this.stage.addChild(this.otherText3);

			this.otherText4 = new PIXI.Text("If you see a ship that says something related to the Union, let it pass!",{font:"18px Arial "});
			this.otherText4.position.x = 125;
			this.otherText4.position.y = 300;
			this.stage.addChild(this.otherText4);

			this.otherText5 = new PIXI.Text("But if not, shoot it down by clicking on it!",{font:"18px Arial "});
			this.otherText5.position.x = 250;
			this.otherText5.position.y = 350;
			this.stage.addChild(this.otherText5);



			this.otherText2 = new PIXI.Text("Press A to Start!",{font:"40px Arial "});
			this.otherText2.position.x = 250;
			this.otherText2.position.y = 450;
			this.stage.addChild(this.otherText2);





			this.staging = 0;






			this.randomIndex = Math.floor(Math.random() * this.questionArr[this.round - 1].length);
			//console.log(this.randomIndex);
			this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questionArr[this.round - 1][this.randomIndex][0],this.questionArr[this.round - 1][this.randomIndex][1]);
			this.enemyTimer=600/this.enemy.speed;
			//this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questionArr[0][0],this.questionArr[0][1]);
			this.stage.addChild(this.enemy.sprite);
			this.enemy.sprite.position.x = -100;
			this.yCoord = Math.floor(Math.random() * 100) + 1;
			this.enemy.sprite.position.y = this.yCoord + 300;
			this.questionText = new PIXI.Text(this.enemy.question,{font:"30px Arial ", fill:"red"});
			this.questionText.position.x = -100;
			this.questionText.position.y = this.yCoord-50 + 300;
			this.stage.addChild(this.questionText);



			//this.questionText = new PIXI.Text(this.questions[0],{font:"30px Arial ", fill:"red"});
            //this.questionText.position.x = -100;
            //this.questionText.position.y = 450;
            //this.stage.addChild(this.questionText);
			//Array of questions, randomly chosen, 3 lives per round, round length increases
			//Keys A and B 65 and 66
			//this.music.play();
		  },
		  update: function(delta)
		  {
		  console.log(this.staging);
		  if(this.staging==1){
		  this.enemyTimer--;
		  updateTimerText(this);

		  if(this.playerShip.sprite.currentFrame == 5){
			this.playerShip.sprite.gotoAndStop(0);
		  }

		  if(this.playerShip.sprite.currentFrame == 13){
			this.playerShip.sprite.gotoAndStop(0);
		  }

		  if(this.enemyTimer < 1){
			if(!this.enemy.answer){
				//this.playerShip.sprite.play();
					this.enemy.sprite.gotoAndPlay(12);
					removeShip(this);
				this.stage.removeChild(this.scoreText);
				this.score ++;
				this.scoreText = new PIXI.Text("Score: " + this.score,{font: "30px Arial "});
				this.scoreText.position.x = 300;
				this.scoreText.position.y = 0;
				this.stage.addChild(this.scoreText);
				this.shipHit.play();
				this.shipHit.currentTime=0;
			}
			else{

				//wrong answer code
				wrongAnswer(this);
				//remove ship
				this.enemy.sprite.gotoAndPlay(12);
				removeShip(this);

			}
		  }
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
			if(this.enemies < 1){
				if(this.round > 6){
					alert("YOU WIN!");
					this.music.pause();
					getHubScreen().music.play();
					this.changeScreen(getHubScreen());
					resetGame(this);
				}else{
					this.round = this.round + 1;
					this.enemies = this.questionNums[this.round - 1];
					this.playerLives = 3;

					updateLeftRoundsText(this);
					updateRoundsText(this);
					updateLivesText(this);

				}
			}
			if(this.isActiveEnemy == false && this.enemy.sprite.currentFrame > 11){
				this.stage.removeChild(this.enemy.sprite);
				this.isActiveEnemy = true;
				this.randomIndex = Math.floor(Math.random() * this.questionArr[this.round - 1].length);
				//console.log(this.randomIndex);
				this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questionArr[this.round - 1][this.randomIndex][0],this.questionArr[this.round - 1][this.randomIndex][1]);
				this.enemyTimer=600/this.enemy.speed;
				//this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questionArr[0][0],this.questionArr[0][1]);
				this.stage.addChild(this.enemy.sprite);
				this.enemy.sprite.position.x = -100;
				this.yCoord = Math.floor(Math.random() * 100) + 1;
				this.enemy.sprite.position.y = this.yCoord + 300;
				this.questionText = new PIXI.Text(this.enemy.question,{font:"30px Arial ", fill:"red"});
				this.questionText.position.x = -100;
				this.questionText.position.y = this.yCoord-50 + 300;
				this.stage.addChild(this.questionText);
			}
			if(this.isActiveEnemy == true){
				if(this.enemy.sprite.position.x < 700){
					this.enemy.sprite.position.x+=this.enemy.speed;
					this.questionText.position.x+=this.enemy.speed;
					//this.enemy.sprite.position.x++;
					//this.questionText.position.x++;
				}
			}
			}
		  },
		  onKeyDown: function(keyCode)
		  {
			console.log(this.staging);
			if(this.staging==1){
		  	if (arrays.containsElement(constants.KEYS_EXIT, keyCode)) {
		  		alert('Exiting game!');
				this.stage.removeChild(this.enemy.sprite);
		  		resetGame(this);
		  		this.music.pause();
				getHubScreen().music.play();
		  		this.changeScreen(getHubScreen());
		  		console.log(this.nextScreen);
		  		return;
		  	}
			/*if(keyCode == 67){
				console.log("RESET!");
				resetGame(this);
			}*/
			  if(keyCode == 65){
					console.log("PRESSED A");
					this.answerSubmitted = 'A';
			  }
			  else if(keyCode == 66){
					console.log("PRESSED B");
					this.answerSubmitted = 'B';
			  }else{
				this.answerSubmitted = '';
			  }

			  if(keyCode == this.cheat_arr[this.cheat_index]){
					this.cheat_index = this.cheat_index + 1;
					if(this.cheat_index > 9){
						this.playerLives = this.playerLives + 20;
						this.cheat_index = 0;
						updateLivesText(this);
					}
			  }else{
					this.cheat_index = 0;
			  }

			  if(this.answerSubmitted != ''){

			  }
		  //Need to add code to take in a key A, B, C, or D, and check it against the answer to the currently selected question
			if (keyCode == 27)
			{
				this.music.pause();
				getHubScreen().music.play();
			  this.changeScreen(getHubScreen());
			}
			}
			if(this.staging==0){
				if(keyCode == 65){
					console.log("PRESSED A");
			  }
			  this.staging++;
			  this.stage.removeChild(this.graphics);
			  this.stage.removeChild(this.otherText);
			  this.stage.removeChild(this.otherText2);
			  this.stage.removeChild(this.otherText3);
			  this.stage.removeChild(this.otherText4);
			  this.stage.removeChild(this.otherText5);
			  this.stage.removeChild(this.otherText6);



			}
		  },
		  onMouseDown: function(point)
		  {
			  console.log(point);
			if(this.enemy.touching(point)){
				console.log("Clicked on Ship");
				this.playerShip.sprite.play();
				this.enemy.sprite.play();

				if(this.enemy.answer){
					this.stage.removeChild(this.scoreText);
					this.score ++;
					this.scoreText = new PIXI.Text("Score: " + this.score,{font: "30px Arial "});
					this.scoreText.position.x = 300;
					this.scoreText.position.y = 0;
					this.stage.addChild(this.scoreText);
					this.shipHit.play();
					this.shipHit.currentTime=0;
				}else {
					//wrong answer
						wrongAnswer(this);
					//remove ship
						removeShip(this);
				}
				removeShip(this);
			}
			else
				console.log("Did not click on ship");
		  }
	});
	//console.log("WTFMATE");

	function updateTimerText(game){
		game.stage.removeChild(game.timerText);
		game.timerText = new PIXI.Text("Time To Answer: " + Math.floor(game.enemyTimer / 60),{font:"30px Arial "});
		game.timerText.position.x = 0;
		game.timerText.position.y = 40;
		game.stage.addChild(game.timerText);
	}

	function updateRoundsText(game){
		game.stage.removeChild(game.roundText);
		game.roundText = new PIXI.Text("Round: " + game.round,{font:"30px Arial "});
		game.roundText.position.x = 0;
		game.roundText.position.y = 0;
		game.stage.addChild(game.roundText);
	}

	function updateLivesText(game){
		game.stage.removeChild(game.livesText);
		game.livesText = new PIXI.Text("Lives: " + game.playerLives,{font:"30px Arial "});
		game.livesText.position.x = 550;
		game.livesText.position.y = 0;
		game.stage.addChild(game.livesText);
	}

	function updateLeftRoundsText(game){
		game.stage.removeChild(game.leftInRoundText);
		game.leftInRoundText = new PIXI.Text("Left in round: " + game.enemies,{font:"30px Arial "});
		game.leftInRoundText.position.x = 300;
		game.leftInRoundText.position.y = 40;
		game.stage.addChild(game.leftInRoundText);
	}

	function resetGame(game){
		game.cheat_index = 0;
		game.playerLives = 3;
		game.round = 1;
		game.enemies = game.questionNums[0];
		game.yCoord = 0;
		updateRoundsText(game);
		updateLivesText(game);
		updateLeftRoundsText(game);
		game.stage.removeChild(game.scoreText);
		game.score = 0;
		game.scoreText = new PIXI.Text("Score: " + game.score,{font:"30px Arial "});
		game.scoreText.position.x = 300;
		game.scoreText.position.y = 0;
		game.stage.addChild(game.scoreText);
		removeShip(game);
		game.isActiveEnemy = true;
		game.randomIndex = Math.floor(Math.random() * game.questionArr[game.round - 1].length);
		game.enemy = new enemy_ship(new PIXI.MovieClip(game.enemyTexture),"Enemy",game.questionArr[game.round - 1][game.randomIndex][0],game.questionArr[game.round - 1][game.randomIndex][1]);
		game.yCoord = Math.floor(Math.random() * 100) + 1;
		game.enemy.sprite.position.y = game.yCoord + 300;
		game.questionText = new PIXI.Text(game.enemy.question,{font:"30px Arial ", fill:"red"});
		game.questionText.position.x = -100;
		game.questionText.position.y = game.yCoord-50 + 300;
		game.stage.addChild(game.questionText);
		game.stage.addChild(game.enemy.sprite);
		game.enemy.sprite.position.x = -100;
	}
	function removeShip(game){
		game.isActiveEnemy = false;
		//game.stage.removeChild(game.enemy.sprite);
		// game.stage.removeChild(game.questionText);
		game.questionText.position.x = -100;
		game.stage.removeChild(game.questionText)
		game.enemies--;
		game.enemyTimer = 600;
		updateLeftRoundsText(game);
	}
	function wrongAnswer(game){
		game.playerLives--;
		console.log(game.playerLives);
		//game.playerShip.sprite.gotoAndPlay(6);
		updateLivesText(game);
		if(game.playerLives < 1){
			removeShip(game);
			game.enemy.sprite.gotoAndStop(12);
			alert("YOU LOSE!");
			game.music.pause();
			getHubScreen().music.play();
			game.changeScreen(getHubScreen());
			resetGame(game);
		}
		game.playerHit.play();
		game.playerHit.currentTime=0;

	}
	  return SampleMiniGame;
  }
);