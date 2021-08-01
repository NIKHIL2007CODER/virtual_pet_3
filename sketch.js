  var databse, foodS, foodStock;
  var fedTime, lastFed, feed, addFood, foodObj;
  var DeadDog , dogImg , dogImg2 , dogVaccination , dogFoodStock , garden , bedroom , happydog;
  var injection , lazydog , livingroom , milk , runningdog , leftrunningdog , vaccination , washroom ;
  var gamestate ,readState ;
  var curretnTime ;
  function preload(){
 
    //images ⬇

        //activties of dog
        dogImg = loadImage("images/Dog.png");
        happydog = loadImage("images/happydog.png");
        lazydog = loadImage("images/Lazy.png");
        deadDog = loadImage("images/deadDog.png");
        runnningdog = loadImage("images/running.png");
        leftrunningdog = loadImage("images/runningLeft.png");
        
        // other activities
        dogVaccination = loadImage("images/dogVaccination.png");
        
        //object
        dogFoodStock = loadImage("images/Food Stock.png");
        milk = loadImage("images/milk.png");

        // places
        garden = loadImage("images/Garden.png");
        livingroom = loadImage("images/Living Room.png");
        washroom = loadImage("images/Wash Room.png");
        bedroom = loadImage("images/Bed Room.png");

    // images ^    
    }
  function setup() {
      createCanvas(600, 605);
      foodObj = new Food();

        database = firebase.database();
        dog = createSprite(width/2, 400, 10, 10);
        dog.addImage(dogImg);
        dog.scale = 0.45

        feed = createButton("FEED");
        feed.position(800, 30);
        feed.mousePressed(feedDog);

        addfood = createButton("ADD FOOD");
        addfood.position(900, 30);
        addfood.mousePressed(addFood);

        foodStock = database.ref('Food');
        foodStock.on("value", readStock);

        readState = database.ref("gameState");
        readState.on("value",function(data){
            gameState = data.val();
        });

    }

    function draw() {  
        
      currentTime=hour();
      if(currentTime==(lastFed)){
        update("play");
        foodObj.garden();
      }
      else if(currentTime==(lastFed+2)){
        update("sleeping");
        foodObj.bedroom();
      }
      else if(currentTime>(lastFed+2) && curentTime<(lastFed+4)){
        update("bathing");
        foodObj.washroom();
      }
      else{
        update("hungry");
        foodObj.livingroom();
      }
      
      if (gameState!="hungry"){
        feed.hide();
        addfood.hide();
        dog.remove();
      }

      else{
        feed.show();
        addfood.show();
        dog.addImage(dogImg);
      }

      fedTime = database.ref('fedTime');
      fedTime.on('value', function(data){
      lastFed = data.val();
    
      })
      
      fill(137,36);
      stroke(10);
      strokeWeight(1.8)
      textFont("harrington") ;
      textSize(30);
        
      if(lastFed >=12){
        text("LAST FEED :" + lastFed % 12 + 'PM', 50, 40);
      }   
      else if(lastFed === 0){
        text("LAST FEED : 12 AM", 50, 40);
      } 
      else {
        text("LAST FEED :"+ lastFed+'AM', 50, 40);
      }

      

      foodObj.display();
        drawSprites();
        
      
    } 
 
    
  function readStock(data){
      foodS = data.val();
        foodObj.updateFoodStock(foodS)
    }
  function feedDog(){
        dog.addImage(happydog);
        foodObj.updateFoodStock(foodObj.getFoodStock()-1)
        database.ref('/').update({
        Food:foodObj.getFoodStock(), fedTime:hour()
      })
    }
  function addFood(){
    
      foodS++ ;
      database.ref('/').update({
        Food:foodS
      })
  }
  
  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }
