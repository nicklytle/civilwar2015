define(
	['pixi', 'engine/base', 'engine/graphics',
	'engine/classes/Screen', '../npcloader', '../constants',
	'engine/input', 'engine/geometry', 'engine/arrays',
	'./testMini', 'engine/helpers'],
	function(PIXI, engine, Images,
			Screen, LoadNPCs, constants,
			Input, Collisions, Arrays,
			SampleMiniGame, helpers) {
		
		TestWorldScreen = new Screen ({
			init: twsInit,
			update: twsUpdate,
			onKeyDown: twsOnKeyDown,
			backgroundColor: 0x66CC99,
			// onMouseDown: someOtherFunction
			// remember, you need commas after every
			// key-value pair
		});

		function twsInit()
		{
			this.music = new Audio('/assets/music/town_music.ogg');
			this.music.play();
			this.updated = false;
			//Sounds.load("coin.wav");
			// IMPORTANT:
			// anything that you want to access
			// after the init() method completes
			// (i.e. in the update function),
			// you must attach it to the screen
			// via "this.variableName = ...",
			// instead of "var variableName = ..."

			var stageWorld = this.stage;
			// just a nickname so we don't have to change so much stuff
			this.bg = Images.createSprite("env/town_map.png");
			this.bg.position.x -= 100;
			this.bg.position.y -= 100;
			this.stage.addChild(this.bg);
			
			//REMEMBER - stuff added to the screen is added in order
			//Lowest stuff first (the things that go behind everything else)

			// load textures from file
			var textureBunny = Images.getTexture("hat4.png");
			var textureGreen = Images.getTexture("wheat.gif");

			// add text to screen to track framerate
			this.text = new PIXI.Text("", {
					font : "24px Arial",
					fill : "white"
				});
			this.text.position.x = 6;
			this.text.position.y = 6;

			// add some random grass
			for (var i = 0; i < 5; i++) {
				var ob = new PIXI.Sprite(textureGreen);

				// randomize their positions
				ob.position.x = Math.random() * constants.STAGE_W;
				ob.position.y = Math.random() * constants.STAGE_H;

				// center their anchor points
				ob.anchor.x = 0.5;
				ob.anchor.y = 0.5;

				// add a name var to track them
				ob.name = "obstacle";

				// put 'em onstage
				stageWorld.addChild(ob);
			}
			
			// create PIXI MovieClip
			var newClip = [];
			
			newClip.push(Images.getTexture("hat4.png"));
			newClip.push(Images.getTexture("hat4back.png"));
			newClip.push(Images.getTexture("hat4sideleft.png"));
			newClip.push(Images.getTexture("hat4sideright.png"));

			this.bunny = new PIXI.MovieClip(newClip);

			// center the sprite's anchor point
			this.bunny.anchor.x = 0.5;
			this.bunny.anchor.y = 0.5;

			// move the sprite to the center of the screen
			this.bunny.position.x = constants.STAGE_W / 2;
			this.bunny.position.y = constants.STAGE_H / 2;

			// scale the bunny up to 2x its normal size
			this.bunny.scale = new PIXI.Point(.2, .2);

			// make him interactive and popup when you click on him
			this.bunny.interactive = true;
			this.bunny.mousedown = function () {
				// alert("that tickles!");
			};

			// attach him to the stageWorld is at the bottom, because the main character should probably be on top of everything
			
			//Load NPC's data from the XML file
			this.AllOfTheNPCs = [];
			LoadNPCs(this.AllOfTheNPCs, '/data/npcs.xml');
			
			//Add NPC's to the world
			for(var i = 0; i < this.AllOfTheNPCs.length;i++){
				this.AllOfTheNPCs[i]["MovieClip"] = new PIXI.MovieClip(this.AllOfTheNPCs[i].texture);
				
				var current = this.AllOfTheNPCs[i].MovieClip;
				
				current.anchor.x = 0.5;
				current.anchor.y = 0.5;
				current.position.x = this.AllOfTheNPCs[i].x;
				current.position.y = this.AllOfTheNPCs[i].y;
				current.scale = new PIXI.Point(this.AllOfTheNPCs[i].scale, this.AllOfTheNPCs[i].scale);
				stageWorld.addChild(current);
			}
			
			//helper variables for dialogue box control
			//text display should be 1 if a dialogue box is on-screen
			//interact should be 1 if the interaction button is currently held down
			//currNPC holds what npc is currently being talked to
			//change fadeLoadingScreen to 1 if you want to fade to a loading screen
			//loadingscreenIsDone will report true after it's done fading and 3 seconds have elapsed
			
			this.textdisplay = 0;
			this.interact = 0;
			this.currNPC = 0;
			this.fadeLoadingScreen = 0;
			this.loadingScreenIsDone = false;
			this.delay = 0;
			
			// Player character
			stageWorld.addChild(this.bunny);
			
			// add fps text last to make sure it's on top of everything
			// (ow ow)

			//stageWorld.addChild(this.text);
			
			//new dialogue box
			
			this.namebox = new PIXI.Text("",{
					font : "24px Arial",
					fill : "white",
				});
			this.namebox.position.x = 20;
			this.namebox.position.y = 425;
			this.ui.addChild(this.namebox);
			
			this.dialoguetext = new PIXI.Text("", {
					font : "24px Arial",
					fill : "white",
					wordWrap : true,
					wordWrapWidth : 750
				});
			this.dialoguetext.position.x = 20;
			this.dialoguetext.position.y = 450;
			this.ui.addChild(this.dialoguetext);
			
			this.answer1 = new PIXI.Text("", {
					font : "24px Arial",
					fill : "white"
				});
				
			this.answer1text = "";
			
			this.answer1.position.x = 20;
			this.answer1.position.y = 550;
			this.ui.addChild(this.answer1);
			this.answer1.interactive = true;
			this.answer1.mousedown = function(){
				Answer1();
			};
			this.answer1.ButtonMode = true;
				
			this.answer2 = new PIXI.Text("",{
					font : "24px Arial",
					fill : "white"
				});
			
			this.answer2text = "";
			
			this.answer2.position.x = 420;
			this.answer2.position.y = 550;
			this.ui.addChild(this.answer2);
			this.answer2.interactive = true;
			this.answer2.mousedown = function(){
				Answer2();
			};
			this.answer2.ButtonMode = true;
			
			this.ui.addChild(this.text);
			
			//I have run out of brain. If there's a way to get text from a PIXI.text object, please tell me.
			function Answer1(){
			
				oldtext = TestWorldScreen.answer1text;
				TestWorldScreen.dialoguetext.setText(TestWorldScreen.currNPC.dialogue[TestWorldScreen.answer1text]);
				try{
				TestWorldScreen.answer1.setText(TestWorldScreen.currNPC.answer1[oldtext]);
				TestWorldScreen.answer2.setText(TestWorldScreen.currNPC.answer2[oldtext]);
				TestWorldScreen.answer1text = TestWorldScreen.currNPC.answer1[oldtext];
				TestWorldScreen.answer2text = TestWorldScreen.currNPC.answer2[oldtext];
				
				}catch(e){
				TestWorldScreen.answer1.setText("");
				TestWorldScreen.answer2.setText("");
				TestWorldScreen.answer1text = "";
				TestWorldScreen.answer2text = "";
				TestWorldScreen.delay++;
				}
				
			
				
			}
			
			function Answer2(){
			
				oldtext = TestWorldScreen.answer2text;
				TestWorldScreen.dialoguetext.setText(TestWorldScreen.currNPC.dialogue[oldtext]);
				
				try{
				TestWorldScreen.answer1.setText(TestWorldScreen.currNPC.answer1[oldtext]);
				TestWorldScreen.answer2.setText(TestWorldScreen.currNPC.answer2[oldtext]);
				TestWorldScreen.answer1text = TestWorldScreen.currNPC.answer1[oldtext];
				TestWorldScreen.answer2text = TestWorldScreen.currNPC.answer2[oldtext];
				}catch(e){
				TestWorldScreen.answer1.setText("");
				TestWorldScreen.answer2.setText("");
				TestWorldScreen.answer1text = "";
				TestWorldScreen.answer2text = "";
				TestWorldScreen.delay++;
				}
			}

			for ( var asdf = 0; asdf < this.stage.children.length; asdf++ ) {
				var dood = this.stage.children[asdf];
				if (dood == this.bg) { continue; }
				dood.interactive = true;
				dood.mousedown = function () {
					// alert( dood.position.x + "," + dood.position.y );
				};
				dood.anchor.x = 0.5;
				dood.anchor.y = 0.5;
			}
		}

		function twsUpdate(delta)
		{

			var stageWorld = this.stage;
			var bunny = this.bunny; // i'm lazy
			var TJ = this.TJ;
			//bunny.rotation += delta*2*Math.PI/5;

			// run bunny around screen based on key presses
			if (Input.anyKeyDown(constants.KEYS_UP)) {
				bunny.gotoAndStop(1);
				bunny.position.y -= constants.PLAYER_SPEED * delta;
			}
			if (Input.anyKeyDown(constants.KEYS_DOWN)) {
				bunny.gotoAndStop(0);
				bunny.position.y += constants.PLAYER_SPEED * delta;
			}
			if (Input.anyKeyDown(constants.KEYS_LEFT)) {
				bunny.gotoAndStop(2);
				bunny.position.x -= constants.PLAYER_SPEED * delta;
			}
			if (Input.anyKeyDown(constants.KEYS_RIGHT)) {
				bunny.gotoAndStop(3);
				bunny.position.x += constants.PLAYER_SPEED * delta;
			}
			
			// if near an NPC, highlight them
			
			//OLD NPC's - delete this soon
			/*
			for(var i = 0; i < this.NPCList.length; i++){
				if(Collisions.doRectanglesOverlap(bunny.getBounds(), this.NPCList[i].getBounds(), -30)){
					this.NPCList[i].gotoAndStop(1);
				}
				if(!Collisions.doRectanglesOverlap(bunny.getBounds(), this.NPCList[i].getBounds(), -30)){
					this.NPCList[i].gotoAndStop(0);
				}
			}
			*/
			
			//NEW NPC's
			for(var i = 0; i < this.AllOfTheNPCs.length;i++){
				if(Collisions.doRectanglesOverlap(bunny.getBounds(), this.AllOfTheNPCs[i].MovieClip.getBounds(),-30)){
					this.AllOfTheNPCs[i].MovieClip.gotoAndStop(1);
				}
				if(!Collisions.doRectanglesOverlap(bunny.getBounds(), this.AllOfTheNPCs[i].MovieClip.getBounds(),-30)){
					this.AllOfTheNPCs[i].MovieClip.gotoAndStop(0);
				}
			}

			//DIALOGUE!
			//TODO: Make this less hardcoded and hacky.
			
			// press the spacebar near an NPC to start interacting (get 'em to say something).
			
			
			
			if (Input.anyKeyDown(constants.KEYS_INTERACT) && this.textdisplay == 0 && this.interact == 0) {
			
				for(var i = 0; i < this.AllOfTheNPCs.length; i++){
					if(Collisions.doRectanglesOverlap(bunny.getBounds(),this.AllOfTheNPCs[i].MovieClip.getBounds(), -30)){
						this.interact = 1;
						this.currNPC = this.AllOfTheNPCs[i];
						//BRING UP INTRO DIALOGUE
						//TODO: Override this depending on conditionals

						this.namebox.setText(this.currNPC.name);
						this.dialoguetext.setText(this.AllOfTheNPCs[i].dialogue.intro);
						
						//console.log(this.AllOfTheNPCs[i].answer1.intro);
						
						try{
						this.answer1.setText(this.AllOfTheNPCs[i].answer1.intro);
						this.answer1text = this.AllOfTheNPCs[i].answer1.intro;
						
						this.answer2.setText(this.AllOfTheNPCs[i].answer2.intro);
						this.answer2text = this.AllOfTheNPCs[i].answer2.intro;
						}catch(e){
							this.delay++;
						}
						
					}
				}
			}
			
			if (this.interact == 1 && this.textdisplay == 0 && !Input.anyKeyDown(constants.KEYS_INTERACT)){
				this.textdisplay = 1;
				this.interact =  0;
			}
			
			//While interacting, choices are available to peruse.
			//So, space is to start talking, but everything else is mouse controlled.
			
			//Press space again to stop interacting
			
			if (Input.anyKeyDown(constants.KEYS_INTERACT) && this.textdisplay == 1 && this.interact == 0) {
				DialogueClear();
				this.interact = 1;
			 }
			 
			 if (this.interact == 1 && this.textdisplay == 1 && !Input.anyKeyDown(constants.KEYS_INTERACT)){
				this.textdisplay = 0;
				this.interact = 0;
				this.currNPC = 0;
				this.delay = 0;
				//If you don't want to do an activity/minigame, just exit dialogue as normal.
				this.fadeLoadingScreen = 0;
			 }
			 
			 //Fade a loading screen
			 /*
			 //This is probably the hackiest thing I've done this semester.
			 if(this.fadeLoadingScreen == 1 && this.loadingscreen.alpha <= 6){
				this.loadingscreen.alpha+= 0.01;
				this.text.alpha -= 0.01;
			 }
			 
			 if(this.loadingscreen.alpha >= 4 && this.fadeLoadingScreen == 1){
					this.loadingScreenIsDone = true;
					this.fadeLoadingScreen = 0;
					//INSERT MINIGAME OR CHANGE SCREEN HERE or wherever it works, this.loadingScreenIsDone now returns true.
			 }
			 
			//console.log(this.loadingscreen.alpha);
			//console.log(this.fadeLoadingScreen);
			//console.log(this.loadingScreenIsDone);
			*/
			
			//Delay function - in case people don't want to press the spacebar to end a conversation.
			
			if(this.delay >= 1){
				this.delay++;
			}
			
			if(this.delay >= 400){
				DialogueClear();
				this.textdisplay = 0;
				this.interact = 0;
				this.currNPC = 0;
				this.delay = 0;
			}
			
			//console.log(this.delay);
			
			// collision detection - remove every obstacle bunny that is touching
			// our debug character
			
			// var pBounds = this.bunny.getBounds();

			/*for (var i = 0; i < stageWorld.children.length; i++) {
				var ob = stageWorld.children[i];
				if (!exists(ob.name) || ob.name != "obstacle") {
					continue;
				}

				var oBounds = ob.getBounds();
				//var pBounds = bunny.getBounds(); // already defined outside of the for loop

				// Collisions.doRectanglesOverlap is a helper from helpers.js
				// yaaaaaaaaay
				var touching = Collisions.doRectanglesOverlap(oBounds, pBounds, -10);

				if (touching) {
					Sounds.play("coin.wav");
					stageWorld.removeChild(ob);
					i--;
				}
			}
			*/

			if (this.updated) {
				window.player = this.bunny;
				var player = this.bunny;
				var geometry = Collisions;
				var pBounds = player.getBounds();
				this.AllOfTheNPCs.forEach(function(npc) {
					var npcBounds = npc.MovieClip.getBounds();
					var overlap = geometry.getRectangleOverlap(pBounds, npcBounds, -40);
					if (overlap) {
						// console.log(overlap);
						var horizontal = overlap.width < overlap.height;
						if (horizontal) {
							var reverse = (npcBounds.x + npcBounds.width/2.0) > 
								(pBounds.x + pBounds.width / 2.0);
							console.log(reverse);
							player.position.x += overlap.width * (reverse ? -1 : 1);
						} else {
							var reverse = (npcBounds.y + npcBounds.height/2.0) > 
								(pBounds.y + pBounds.height / 2.0);
							player.position.y += overlap.height * (reverse ? -1 : 1);
						}
					}
				});
			}

			if (this.updated) {
				var self = this;
				var l = [player];
				this.AllOfTheNPCs.forEach(function(npc) {
					var mc = npc.MovieClip;
					l.push(mc);
					self.stage.removeChild(mc);
				});
				l.sort(helpers.spriteZSort);
				l.forEach(function(child) {
					self.stage.addChild(child);
				});
			}


			// var self = this;
			// if (this.updated) {
			// 	this.AllOfTheNPCs.forEach(function(npc) {
			// 		if (npc._rect) return;
			// 		npc._rect = true;
			// 		var b = npc.MovieClip.getBounds();
			// 		var gfx = new PIXI.Graphics();
			// 		gfx.beginFill(0x00FFFF);
			// 		gfx.drawRect(b.x, b.y, b.width, b.height);
			// 		self.stage.addChild(gfx);
			// 	});
			// }
			

			// for(var c1 = 0; c1 < this.stage.children.length; c1++) {
			// 	var ob1 = this.stage.children[c1];
			// 	if (exists(ob1.collision) && ob1.collision == true) {
			// 		for(var c2 = 0; c2 < this.stage.children.length; c2++) {
			// 			var ob2 = this.stage.children[c2];
			// 			if (c1 != c2 && exists(ob2.collision) && ob2.collision == true) {
			// 				resolveCollisionWeighted(
			// 					ob1,
			// 					ob2,
			// 					0.5,
			// 					-10
			// 				);
			// 			}
			// 		}
			// 	}
			// }
			//this.stage.children.sort(spriteZSort);

			this.centerCameraPosition(bunny.position.x, bunny.position.y, constants.STAGE_W, constants.STAGE_H);

			// TODO game fps.....
			// this.text.setText(engine.DEBUG_MODE ? (Math.round(Game.fps) + " FPS") : "");
			this.updated = true;
		}

		function twsOnKeyDown(keyCode) {
			// switch screens on ESC press
			if (Arrays.containsElement(constants.KEYS_EXIT,keyCode)) {
				//this.changeScreen(TestMenuScreen);
				console.log("EEK");
				console.log(this.nextScreen);
				this.music.pause();
				SampleMiniGame.music.play();
				this.changeScreen(SampleMiniGame);
			}
		}

		function DialogueClear() {
		TestWorldScreen.dialoguetext.setText("");
		TestWorldScreen.answer1.setText("");
		TestWorldScreen.answer2.setText("");
		TestWorldScreen.namebox.setText("");
		}

		return TestWorldScreen;
	}
);