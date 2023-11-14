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

  // getPillarInfo(id : string ,upper){

  // }

  pillarsMoving(adjust : number, furthersPoint : number, currentPillar : number){

    let upperPillar = 'upperPillar' + currentPillar
    let lowerPillar = 'lowerPillar' + currentPillar
    
    console.log(upperPillar)
    setTimeout( () => {

      // this.pillarTop = document.getElementById(upperPillar)
      // this.pillarBottom = document.getElementById(lowerPillar)
      // this.pillarStart = this.pillarBottom?.offsetLeft

      let pillarAbove = document.getElementById(upperPillar)
      let pillarBelow = document.getElementById(lowerPillar)
      let pillarPosition = pillarBelow?.offsetLeft
      let pillarWidth = pillarAbove?.clientWidth

      console.log(pillarWidth)

      while(pillarAbove == undefined || pillarBelow == undefined || pillarPosition == undefined){
        pillarAbove = document.getElementById(upperPillar)
        pillarBelow = document.getElementById(lowerPillar)
        pillarPosition = this.pillarBottom?.offsetLeft
        console.log("loop")
      }

      // console.log(this.pillarBottom)
      // console.log(this.viewportHeight  - this.birdHeight - this.moveDownDistance)
      console.log("----")
      if(pillarBelow != undefined && pillarAbove != undefined && pillarPosition != undefined && pillarWidth != undefined){
        // console.log(this.birdStart)
        pillarAbove.style.left = (pillarPosition- this.pillarMoveLeft) + 'px'
        pillarBelow.style.left = (pillarPosition - this.pillarMoveLeft) + 'px'
        console.log("----" + pillarBelow.style.right)
        // console.log('#p' + this.pillarStart)
        pillarPosition -= this.pillarMoveLeft

        if(pillarPosition == 70){
          let newPillar = currentPillar + 1
          this.pillarSpawn.push(newPillar);
          console.log(currentPillar);
          this.pillarsMoving(1, furthersPoint, newPillar)
        }

        if(pillarPosition >= furthersPoint - pillarWidth){
          this.pillarsMoving(1, furthersPoint - pillarWidth, currentPillar)
        }else{
          // this.pillarSpawn.push(++currentPillar);
          // console.log(currentPillar);
          // this.pillarsMoving(1, furthersPoint, currentPillar)
          
        }
      }else{
        console.log('umm')
      }
    }
      ,10 * adjust)
  }

  pillarSpawn = [0]

  ngOnInit(){
    let container = document.getElementById('container')

    this.birdFalling(1, this.viewportHeight)
    this.pillarsMoving(1, 0, 0)
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
