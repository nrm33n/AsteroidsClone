class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(199,21,133);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxVelocity);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        this.thrusters(this.size/2,this.size/2,30,40); //draws thruster on right 
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1,0));
        this.thrusters(-this.size/2,this.size/2,-30,40); //draws thruster on left 
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0,-0.1));
        this.thrusters(this.size/2,this.size/2,30,55); //draws both thrusters
        this.thrusters(-this.size/2,this.size/2,-30,55);
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0,0.1));
        this.thrusters(this.size/2,this.size/2,30,30); //draws both thrusters
        this.thrusters(-this.size/2,this.size/2,-30,30);
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    this.applyForce(createVector(0,0.05));
    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.03);
    this.applyForce(friction);
  }

  thrusters(side1,side2,width, length){ //draws particle thrusters according to the way spaceship is moving
    var thrustlocs=[];
    while (thrustlocs.length<30){
      thrustlocs.push(new createVector((random(this.location.x + side1, this.location.x + side1 + width)), 
                                        random(this.location.y + side2, this.location.y + side2 + length)));
    }
    fill(random(100,255),0,0,175);

    for (var i=0; i<thrustlocs.length; i++){
      ellipse(thrustlocs[i].x, thrustlocs[i].y,random(2,15));
    }

  }
}
