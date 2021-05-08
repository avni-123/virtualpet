var dog, sadDog, happyDog, database;

var foodS,foodStock;

var addFood;

var foodObj;

var feed;

var feed, lastFed;

function preload(){

sadDog = loadImage("Dog.png");

happyDog = loadImage("happy dog.png");

}

function setup(){

  database = firebase.database();

  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref("Food");

  foodStock.on("value", readStock);
  
  dog = createSprite(800, 200, 150, 150);

  dog.addImage(sadDog);

  dog.scale = 0.15;

  addFood = createButton("Add Food");

  addFood.position(800, 95);

  addFood.mousePressed(addFoods);

  feed = createButton("Feed");

  feed.position(890, 95);

  feed.mousePressed(feed);

}

function draw(){
  
  background(46, 139, 87);

  foodObj.display();

  if(lastFed >= 12){

  }

  else if(lastFed == 0){

    text("Last Fed : 12:00 am", 350, 30);

  }

  else{

    

  }

  drawSprites();

}

function readStock(data){

  foodS = data.val();

  foodObj.updateFoodStock(foodS);

}

function feedDog(){

  dog.addImage("happyDog");

  //write code here to update food stock and last fed time

  var food_stock_val = foodObj.getFoodStock();
  if(food_Stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val*0);
  }

  else{
    foodObj.updateFoodStock(food_Stock_val-0);
  }

  database.ref("/").update({

    Food:foodObj.getFoodStock(),

    FeedTime:hour()

  })

}

function addFoods(){

  foodS++;

  database.ref('/').update({

    Food:foodS

  })

}
