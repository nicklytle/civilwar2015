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
			["Capital was Washington, D.C.",'A']],
			[["Battle1",'B'],["Battle2",'A']],
			[],
			[],
			[],
			[],
			[]
			];
			
			this.playerShip = new enemy_ship(new PIXI.Sprite(Images.getTexture("ironclad.png")),"Player","","Q");
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
			this.isActiveEnemy = false;
			this.enemyTimer = 600;
			this.enemyTexture = [];
			this.enemyTexture.push(Images.getTexture("woodship.png"));
			
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

			this.scoreText = new PIXI.Text("Score: " + this.score,{font:"30px Arial "});
			this.scoreText.position.x = 300;
			this.scoreText.position.y = 0;
			this.stage.addChild(this.scoreText);
			this.timerText = new PIXI.Text("Time To Answer: " + Math.floor(this.enemyTimer / 60),{font:"30px Arial "});
			this.timerText.position.x = 0;
			this.timerText.position.y = 40;
			this.stage.addChild(this.timerText);

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
		  if(this.enemyTimer < 1){
			
			//remove ship
			removeShip(this);
			
			//wrong answer code
			wrongAnswer(this);
		  }
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
			if(this.enemies < 1){
				if(this.round > 3){
					alert("YOU WIN!");
					this.music.pause();
					TestWorldScreen.music.play();
					this.changeScreen(TestWorldScreen);
					resetGame(this);
				}else{
					this.round = this.round + 1;
					this.enemies = this.questionNums[this.round - 1];
					this.playerLives = 3;


					updateRoundsText(this);
					updateLivesText(this);

				}
			}
			if(this.isActiveEnemy == false){
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
						removeShip(this);
					this.stage.removeChild(this.scoreText);
					this.score ++; 
					this.scoreText = new PIXI.Text("Score: " + this.score,{font: "30px Arial "});
					this.scoreText.position.x = 300;
					this.scoreText.position.y = 0; 
					this.stage.addChild(this.scoreText);
				  }else{
				  //remove ship
						removeShip(this);
					//wrong answer		
						wrongAnswer(this);
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
	
	function resetGame(game){
		game.score = 0;
		game.cheat_index = 0;
		game.playerLives = 3;
		game.round = 1;
		game.enemies = 3;
		game.yCoord = 0;
		game.isActiveEnemy = false;
		updateRoundsText(game);
		updateLivesText(game);
		game.isActiveEnemy = false;
		game.stage.removeChild(game.enemy.sprite);
		game.questionText.position.x = -100;
		game.stage.removeChild(game.questionText);

		game.score = 0;
		game.scoreText = new PIXI.Text("Score: " + game.score,{font:"30px Arial "});
		game.scoreText.position.x = 300;
		game.scoreText.position.y = 0;
		game.stage.addChild(game.scoreText);

	}
	function removeShip(game){
		game.isActiveEnemy = false;
		game.stage.removeChild(game.enemy.sprite);
		// game.stage.removeChild(game.questionText);
		game.questionText.position.x = -100;
		game.stage.removeChild(game.questionText)
		game.enemies--;
		game.enemyTimer = 600;
	}
	function wrongAnswer(game){
		game.playerLives--;
		updateLivesText(game);
		if(game.playerLives < 1){
			alert("YOU LOSE!");
			game.music.pause();
			TestWorldScreen.music.play();
			game.changeScreen(TestWorldScreen);
			resetGame(game);
		}
	}
	  return SampleMiniGame;
  }
);