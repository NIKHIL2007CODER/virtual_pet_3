class Food{
   constructor(){
       this.foodStock = 0;
       this.lastFed;
       this.image = loadImage("images/Food Stock.png");
   }
   updateFoodStock(foodStock){
       this.foodStock = foodStock
   }
   getFedTime(lastFed){
       this.lastFed = lastFed
   }
   deductFood(){
       if(this.foodStock > 0){
           this.foodStock = this.foodStock - 1
       }
   }
   getFoodStock(){
       return this.foodStock
   }

   bedroom(){
        background(bedroom,550,500);
   }

   garden(){
        background(garden,550,500);
   }

   washroom(){
        background(washroom,550,500);
   }

   livingroom(){
       background(livingroom,550,500);
   }
   display(){
       var x = 200;
       var y = 500;
       imageMode(CENTER);
       //image(this.image, 120, 220, 50, 50)

       if(this.foodStock !== 0){
           for(var i = 0; i < this.foodStock; i = i+40){
        if(i % 5 === 0) {
            x = 40; 
            y = y+50
        }
       image(this.image, x, y, 80, 80)   
       x = x+30        
   }
       }
   }
}