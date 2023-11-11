import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flappyBirdClone';

  bird = document.getElementById('flappyBird')
  birdStart = this.bird?.offsetTop
  pillarTop = document.getElementById('upperPillar')
  pillarBottom = document.getElementById('lowerPillar')
  viewportHeight = window.innerHeight
  birdHeight = this.bird?.clientHeight
  moveDownDistance = 1
  moveUpDistance = 50
  pillarMoveLeft = 1
  pillarStart = this.pillarBottom?.offsetLeft

  birdFalling(adjust : number, lowestPoint : number){

    setTimeout( () => {
       
      while(this.birdStart == undefined || this.bird == undefined || this.birdHeight == undefined ){
        this.bird = document.getElementById('flappyBird')
        this.birdStart = this.bird?.offsetTop
        this.birdHeight = this.bird?.clientHeight
      }

      // console.log(this.birdHeight)
      // console.log(this.viewportHeight  - this.birdHeight - this.moveDownDistance)
      // console.log("----")
      if(this.birdStart != undefined && this.bird != undefined){
        console.log(this.birdStart)
        this.bird.style.top = (this.birdStart + this.moveDownDistance) + 'px'
        this.birdStart += this.moveDownDistance
        if(this.birdStart <= lowestPoint - (this.birdHeight * 2) - this.moveDownDistance){
          this.birdFalling(1, lowestPoint)
        }
      }else{
        console.log('umm')
      }
    }
      ,10 * adjust)
  }

  birdFlying(highestPoint : number){
    console.log("1")
    while(this.birdStart == undefined || this.bird == undefined){
      this.birdStart = this.bird?.offsetTop
      this.bird = document.getElementById('flappyBird')
    }
    if(this.birdStart != undefined && this.bird != undefined){
      this.bird.style.top = (this.birdStart - this.moveUpDistance) + 'px'
      this.birdStart -= this.moveUpDistance 
    }
  }

  pillarsMoving(adjust : number, furthersPoint : number){

    setTimeout( () => {
       
      while(this.pillarBottom == undefined || this.pillarTop == undefined || this.pillarStart == undefined){
        this.pillarTop = document.getElementById('upperPillar')
        this.pillarBottom = document.getElementById('lowerPillar')
        this.pillarStart = this.pillarBottom?.offsetLeft
        console.log('#p' + this.pillarStart)
      }

      console.log(this.pillarBottom)
      // console.log(this.viewportHeight  - this.birdHeight - this.moveDownDistance)
      console.log("----")
      if(this.pillarBottom != undefined && this.pillarTop!= undefined && this.pillarStart != undefined){
        console.log(this.birdStart)
        this.pillarTop.style.left = (this.pillarStart - this.pillarMoveLeft) + 'px'
        this.pillarBottom.style.left = (this.pillarStart - this.pillarMoveLeft) + 'px'
        console.log("----" + this.pillarBottom.style.right)
        console.log('#p' + this.pillarStart)
        this.pillarStart -= this.pillarMoveLeft
        if(this.pillarStart >= furthersPoint ){
          this.pillarsMoving(1, furthersPoint)
        }
      }else{
        console.log('umm')
      }
    }
      ,10 * adjust)
  }

  ngOnInit(){
    let container = document.getElementById('container')

    this.birdFalling(1, this.viewportHeight)
    this.pillarsMoving(1, 0)
    console.log(this.viewportHeight)
    while(this.bird == undefined){
      this.bird = document.getElementById('flappyBird')
    }
    if(container != undefined){
      console.log("hello")
      container.addEventListener('click',() => this.birdFlying(1))
    }
}

  
}
