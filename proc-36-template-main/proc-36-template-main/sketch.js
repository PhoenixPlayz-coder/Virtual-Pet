var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feed;
var lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  Feed=createButton("Feed the Dog");
  Feed.position(900,95);
  Feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  //write code to display text lastFed time here
  fill("black");
  textSize(20);
  if(lastFed>=12){
    text("Last Feed Time"+lastFed%12+"pm", 300,100)
  }
  else if(lastFed == 0){
    text("Last Feed TIme : 12am",300,100)
  }
  else {
    text("Last Feed Time"+ lastFed+"am",300,100)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodValue = foodObj.getFoodStock()
  if(foodValue<=0){
    foodObj.updateFoodStock(foodValue)
  }
  else{
    foodObj.updateFoodStock(foodValue - 1)
  }
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
