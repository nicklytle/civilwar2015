define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry'],
function(PIXI, Screen, Images, Collisions) {
//console.log("GETHERE");
				function enemy_ship(sprite, name, question, answer){
					this.sprite = sprite;
					this.name = name;
					this.question = question;
					this.answer = answer;
					this.isCorrect = function(ans){
						if(ans == answer){
							return true;
						}else{
							return false;
						}
					}
				}
	var SampleMiniGame = new Screen({
		init: function(){
				//Need to declare a "ship" type to match questions, answers, and sprites
			  //Need to initialize a question box, an answer box, our ship, and start the enemies
			this.music = new Audio('/assets/music/(ShipGame)_DrunkenSailor.wav');
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
			[["South Carolina",'B'],
			["Mississippi",'B'],
			["Florida",'B'],
			["Alabama",'B'],
			["Georgia",'B'],
			["Louisiana",'B'],
			["Texas",'B'],
			["Virginia",'B'],
			["Arkansas",'B'],
			["North Carolina",'B'],
			["Tennessee",'B'],
			["Capital was Richmond, VA",'B'],
			["California",'A'],
			["Connecticut",'A'],
			["Delaware",'A'],
			["Illinois",'A'],
			["Indiana",'A'],
			["Iowa",'A'],
			["Kansas",'A'],
			["Kentucky",'A'],
			["Maine",'A'],
			["Maryland",'A'],
			["Massachusetts",'A'],
			["Michigan",'A'],
			["Minnesota",'A'],
			["Missouri",'A'],
			["Nevada",'A'],
			["New Hampshire",'A'],
			["New Jersey",'A'],
			["New York",'A'],
			["Ohio",'A'],
			["Oregon",'A'],
			["Pennsylvania",'A'],
			["Rhode Island",'A'],
			["Vermont",'A'],
			["West Virginia",'A'],
			["Wisconsin",'A'],
			["Capital was Washington, D.C.",'A']],//END OF STATES
			[["Fort Sumter Victory",'B'],
			["First Battle of Bull Run Victory",'B'],
			["Second Battle of Bull Run Victory",'B'],
			["Battle of Fredericksburg Victory",'B'],
			["Battle of Chancellorsville Victory",'B'],
			["Northern Virginia Campaign Victory",'B'],
			["Lost the War",'B'],
			["Less Soldiers Lost",'B'],
			["Smaller Army",'B'],
			["General Pickett’s Charge",'B'],
			["Merrimack",'B'],
			["Gettysburg Victory",'A'],
			["Battle of Vicksburg Victory",'A'],
			["Antietam Victory",'A'],
			["Won the War",'A'],
			["Bigger Army",'A'],
			["Anaconda Plan",'A'],
			["Lost More Soldiers",'A'],
			["Battle of Appomattox Court House Victory",'A'],
			["Battle of Petersburg Victory",'A'],
			["Monitor",'A']],//END OF BATTLES
			[["South Carolina",'B'],
			["Mississippi",'B'],
			["Florida",'B'],
			["Alabama",'B'],
			["Georgia",'B'],
			["Louisiana",'B'],
			["Texas",'B'],
			["Virginia",'B'],
			["Arkansas",'B'],
			["North Carolina",'B'],
			["Tennessee",'B'],
			["Capital was Richmond, VA",'B'],
			["California",'A'],
			["Connecticut",'A'],
			["Delaware",'A'],
			["Illinois",'A'],
			["Indiana",'A'],
			["Iowa",'A'],
			["Kansas",'A'],
			["Kentucky",'A'],
			["Maine",'A'],
			["Maryland",'A'],
			["Massachusetts",'A'],
			["Michigan",'A'],
			["Minnesota",'A'],
			["Missouri",'A'],
			["Nevada",'A'],
			["New Hampshire",'A'],
			["New Jersey",'A'],
			["New York",'A'],
			["Ohio",'A'],
			["Oregon",'A'],
			["Pennsylvania",'A'],
			["Rhode Island",'A'],
			["Vermont",'A'],
			["West Virginia",'A'],
			["Wisconsin",'A'],
			["Capital was Washington, D.C.",'A'],
			["Fort Sumter Victory",'B'],
			["First Battle of Bull Run Victory",'B'],
			["Second Battle of Bull Run Victory",'B'],
			["Battle of Fredericksburg Victory",'B'],
			["Battle of Chancellorsville Victory",'B'],
			["Northern Virginia Campaign Victory",'B'],
			["Lost the War",'B'],
			["Less Soldiers Lost",'B'],
			["Smaller Army",'B'],
			["General Pickett’s Charge",'B'],
			["Merrimack",'B'],
			["Gettysburg Victory",'A'],
			["Battle of Vicksburg Victory",'A'],
			["Antietam Victory",'A'],
			["Won the War",'A'],
			["Bigger Army",'A'],
			["Anaconda Plan",'A'],
			["Lost More Soldiers",'A'],
			["Battle of Appomattox Court House Victory",'A'],
			["Battle of Petersburg Victory",'A'],
			["Monitor",'A']],//END OF REVIEW1
			[["General Robert E. Lee",'B'],
			["Thomas “Stonewall” Jackson",'B'],
			["Jefferson Davis",'B'],
			["General Pickett",'B'],
			["General J.E.B. Stuart",'B'],
			["Abraham Lincoln",'A'],
			["General Ulysses S. Grant",'A'],
			["General Sherman",'A'],
			["General McClellan",'A'],
			["General Custer",'A'],
			["General Meade",'A'],
			["Clara Barton",'A']],//END OF PEOPLE
			[["“Battle Hymn of the Republic”",'A'],
			["Industrialized Economy",'A'],
			["Uncle Tom’s Cabin",'A'],
			["More Urbanized",'A'],
			["Emancipation Proclamation",'A'],
			["Gettysburg Address",'A'],
			["“House Divided Against It Self…”",'A'],
			["Pro Tariffs",'A'],
			["Strong Federal Government",'A'],
			["Slaves were Soldiers",'A'],
			["“Dixie”",'B'],
			["Rebel Yell",'B'],
			["State’s Rights",'B'],
			["Stars and Bars",'B'],
			["King Cotton",'B'],
			["Stars and Stripes",'B'],
			["Agricultural Economy",'B'],
			["Rural",'B'],
			["Anti Tariff",'B'],
			["Slaves were Laborers",'B']],//END OF CULTURE
			[["General Robert E. Lee",'B'],
			["Thomas “Stonewall” Jackson",'B'],
			["Jefferson Davis",'B'],
			["General Pickett",'B'],
			["General J.E.B. Stuart",'B'],
			["Abraham Lincoln",'A'],
			["General Ulysses S. Grant",'A'],
			["General Sherman",'A'],
			["General McClellan",'A'],
			["General Custer",'A'],
			["General Meade",'A'],
			["Clara Barton",'A'],
			["“Battle Hymn of the Republic”",'A'],
			["Industrialized Economy",'A'],
			["Uncle Tom’s Cabin",'A'],
			["More Urbanized",'A'],
			["Emancipation Proclamation",'A'],
			["Gettysburg Address",'A'],
			["“House Divided Against It Self…”",'A'],
			["Pro Tariffs",'A'],
			["Strong Federal Government",'A'],
			["Slaves were Soldiers",'A'],
			["“Dixie”",'B'],
			["Rebel Yell",'B'],
			["State’s Rights",'B'],
			["Stars and Bars",'B'],
			["King Cotton",'B'],
			["Stars and Stripes",'B'],
			["Agricultural Economy",'B'],
			["Rural",'B'],
			["Anti Tariff",'B'],
			["Slaves were Laborers",'B']],//END OF REVIEW2
			[["South Carolina",'B'],
			["Mississippi",'B'],
			["Florida",'B'],
			["Alabama",'B'],
			["Georgia",'B'],
			["Louisiana",'B'],
			["Texas",'B'],
			["Virginia",'B'],
			["Arkansas",'B'],
			["North Carolina",'B'],
			["Tennessee",'B'],
			["Capital was Richmond, VA",'B'],
			["California",'A'],
			["Connecticut",'A'],
			["Delaware",'A'],
			["Illinois",'A'],
			["Indiana",'A'],
			["Iowa",'A'],
			["Kansas",'A'],
			["Kentucky",'A'],
			["Maine",'A'],
			["Maryland",'A'],
			["Massachusetts",'A'],
			["Michigan",'A'],
			["Minnesota",'A'],
			["Missouri",'A'],
			["Nevada",'A'],
			["New Hampshire",'A'],
			["New Jersey",'A'],
			["New York",'A'],
			["Ohio",'A'],
			["Oregon",'A'],
			["Pennsylvania",'A'],
			["Rhode Island",'A'],
			["Vermont",'A'],
			["West Virginia",'A'],
			["Wisconsin",'A'],
			["Capital was Washington, D.C.",'A'],
			["Fort Sumter Victory",'B'],
			["First Battle of Bull Run Victory",'B'],
			["Second Battle of Bull Run Victory",'B'],
			["Battle of Fredericksburg Victory",'B'],
			["Battle of Chancellorsville Victory",'B'],
			["Northern Virginia Campaign Victory",'B'],
			["Lost the War",'B'],
			["Less Soldiers Lost",'B'],
			["Smaller Army",'B'],
			["General Pickett’s Charge",'B'],
			["Merrimack",'B'],
			["Gettysburg Victory",'A'],
			["Battle of Vicksburg Victory",'A'],
			["Antietam Victory",'A'],
			["Won the War",'A'],
			["Bigger Army",'A'],
			["Anaconda Plan",'A'],
			["Lost More Soldiers",'A'],
			["Battle of Appomattox Court House Victory",'A'],
			["Battle of Petersburg Victory",'A'],
			["Monitor",'A'],
			["General Robert E. Lee",'B'],
			["Thomas “Stonewall” Jackson",'B'],
			["Jefferson Davis",'B'],
			["General Pickett",'B'],
			["General J.E.B. Stuart",'B'],
			["Abraham Lincoln",'A'],
			["General Ulysses S. Grant",'A'],
			["General Sherman",'A'],
			["General McClellan",'A'],
			["General Custer",'A'],
			["General Meade",'A'],
			["Clara Barton",'A'],
			["“Battle Hymn of the Republic”",'A'],
			["Industrialized Economy",'A'],
			["Uncle Tom’s Cabin",'A'],
			["More Urbanized",'A'],
			["Emancipation Proclamation",'A'],
			["Gettysburg Address",'A'],
			["“House Divided Against It Self…”",'A'],
			["Pro Tariffs",'A'],
			["Strong Federal Government",'A'],
			["Slaves were Soldiers",'A'],
			["“Dixie”",'B'],
			["Rebel Yell",'B'],
			["State’s Rights",'B'],
			["Stars and Bars",'B'],
			["King Cotton",'B'],
			["Stars and Stripes",'B'],
			["Agricultural Economy",'B'],
			["Rural",'B'],
			["Anti Tariff",'B'],
			["Slaves were Laborers",'B']]//END OF REVIEW3
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
			this.playerTexture.push(Images.getTexture("ironcladsplode7.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode8.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode9.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode10.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode11.png"));
			this.playerTexture.push(Images.getTexture("ironcladsplode12.png"));
			this.playerShip = new enemy_ship(new PIXI.MovieClip(this.playerTexture),"Player","","Q");
			this.playerShip.sprite.position.x = 370;
			this.playerShip.sprite.position.y = 240;
			this.stage.addChild(this.playerShip.sprite);
			
			this.backgroundBox = new PIXI.Sprite(Images.getTexture("BOXClear.png"));
			this.backgroundBox.position.x = 490;
			this.backgroundBox.position.y = 490;
			this.stage.addChild(this.backgroundBox);
			
			this.playerLives = 3;
			this.round = 1;
			this.score = 0;
			this.enemies = this.questionNums[0];
			this.yCoord = 0;
			this.isActiveEnemy = true;
			this.enemyTimer = 600;
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
			this.answerText1 = new PIXI.Text("A: UNION",{font:"30px Arial ", fill:"blue"});
			this.answerText1.position.x = 500;
			this.answerText1.position.y = 500;
			this.stage.addChild(this.answerText1);
			this.answerText2 = new PIXI.Text("B: CONFEDERACY",{font:"30px Arial ", fill:"gray"});
			this.answerText2.position.x = 500;
			this.answerText2.position.y = 550;
			this.stage.addChild(this.answerText2);
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
			
			this.randomIndex = Math.floor(Math.random() * this.questionArr[this.round - 1].length);
			//console.log(this.randomIndex);
			this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questionArr[this.round - 1][this.randomIndex][0],this.questionArr[this.round - 1][this.randomIndex][1]);
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
		  this.enemyTimer--;
		  updateTimerText(this);
		  
		  if(this.playerShip.sprite.currentFrame == 5){
			this.playerShip.sprite.gotoAndStop(0);
		  }
		  
		 if(this.playerShip.sprite.currentFrame == 13){
			this.playerShip.sprite.gotoAndStop(0);
		  }
		  
		  if(this.enemyTimer < 1){
			
			//remove ship
			removeShip(this);
			
			//wrong answer code
			wrongAnswer(this);
		  }
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
			if(this.enemies < 1){
				if(this.round > 6){
					alert("YOU WIN!");
					this.music.pause();
					TestWorldScreen.music.play();
					this.changeScreen(TestWorldScreen);
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
				if(this.enemy.sprite.position.x < 240){
					this.enemy.sprite.position.x++;
					this.questionText.position.x++;
				}
			}
		  },
		  onKeyDown: function(keyCode)
		  {

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
				  if(this.enemy.isCorrect(this.answerSubmitted)){
				  this.playerShip.sprite.play();
						removeShip(this);
					this.stage.removeChild(this.scoreText);
					this.score ++; 
					this.scoreText = new PIXI.Text("Score: " + this.score,{font: "30px Arial "});
					this.scoreText.position.x = 300;
					this.scoreText.position.y = 0; 
					this.stage.addChild(this.scoreText);
					this.shipHit.play();
					this.shipHit.currentTime=0;

				  }else{
					//wrong answer		
						wrongAnswer(this);
					//remove ship
						removeShip(this);
				  }
			  }
		  //Need to add code to take in a key A, B, C, or D, and check it against the answer to the currently selected question
			if (keyCode == 27)
			{
				this.music.pause();
				TestWorldScreen.music.play();
			  this.changeScreen(TestWorldScreen);
			}
		  },
		  onMouseDown: function(point)
		  {
		  //We can use the mouse to select enemies

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
		game.enemy.sprite.play();
		game.questionText.position.x = -100;
		game.stage.removeChild(game.questionText)
		game.enemies--;
		game.enemyTimer = 600;
		updateLeftRoundsText(game);
	}
	function wrongAnswer(game){
		game.playerLives--;
		game.playerShip.sprite.gotoAndPlay(6);
		updateLivesText(game);
		if(game.playerLives < 1){
			removeShip(game);
			game.enemy.sprite.gotoAndStop(12);
			alert("YOU LOSE!");
			game.music.pause();
			TestWorldScreen.music.play();
			game.changeScreen(TestWorldScreen);
			resetGame(game);
		}
		game.playerHit.play();
		game.playerHit.currentTime=0;

	}
	  return SampleMiniGame;
  }
);