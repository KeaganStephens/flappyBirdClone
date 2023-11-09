import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flappyBirdClone';

  bird = document.getElementById('flappyBird')
  start = this.bird?.offsetTop
  viewportHeight = window.innerHeight
  birdHeight = this.bird?.clientHeight

  birdFalling(adjust : number, lowestPoint : number){

    setTimeout( () => {
       
      while(this.start == undefined || this.bird == undefined || this.birdHeight == undefined ){
        this.bird = document.getElementById('flappyBird')
        this.start = this.bird?.offsetTop
        this.birdHeight = this.bird?.clientHeight
      }

      console.log(this.birdHeight)
      console.log(this.viewportHeight  - this.birdHeight - 50)
      console.log("----")
      if(this.start != undefined && this.bird != undefined){
        console.log(this.start)
        this.start += 50 
        this.bird.style.top = (this.start + 50) + 'px'
        if(this.start <= lowestPoint - (this.birdHeight * 2) - 50){
          this.birdFalling(1, lowestPoint)
        }
      }else{
        console.log('umm')
      }
    }
      ,1000 * adjust)
  }

  birdFlying(highestPoint : number){
    console.log("1")
    while(this.start != undefined){
      continue
    }
    if(this.start != undefined && this.bird != undefined){
      this.bird.style.top = (this.start - 50) + 'px'
    }
  }


  ngOnInit(){
    // this.birdFalling(1, this.viewportHeight)
    console.log(this.viewportHeight)
    while(this.bird == undefined){
      this.bird = document.getElementById('flappyBird')
    }
    if(this.bird != undefined){
      console.log("hello")
      this.bird.addEventListener('click',() => this.birdFlying)
    }
}

  
}
