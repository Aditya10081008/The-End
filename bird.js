

class Bird {
  constructor() {
    this.y = height/2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -20;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    this.brain = new NeuralNetwork(4,4,2);
   

  }

  show() {
    stroke(255);
    fill(255 , 100);
    ellipse(this.x,this.y,32,32);  }

  up() {
    this.velocity = this.lift;
  }
 
  think(pipes) {
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++){
      let d = pipes[i].x - this.x;
      if (d < closestD && d > 0){
        closest = pipes[i];
        closestD = d;
      }
    }
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = pipes[0].top / height;
    inputs[2] = pipes[0].bottom / height;
    inputs[3] = pipes[0].x / width;
      let output = this.brain.predict(inputs);
      if(output[0] > output[1]){
        this.up();
      }
    }
  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }
}