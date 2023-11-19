import { Component, OnInit } from '@angular/core';
import { Pillar } from 'src/bird.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'flappyBirdClone';

  pillarSpawn = [0]
  newPillarSpawn : Pillar[] = []

  bird = document.getElementById('flappyBird')
  birdStart = this.bird?.offsetTop
  // pillarTop = document.getElementById('upperPillar')
  // pillarBottom = document.getElementById('lowerPillar')
  viewportHeight = window.innerHeight

  birdHeight = this.bird?.clientHeight
  birdWidth = this.bird?.clientWidth
  birdLeft = this.bird?.offsetLeft

  moveDownDistance = 1
  moveUpDistance = 50
  pillarMoveLeft = 1
  // pillarStart = this.pillarBottom?.offsetLeft
  totalHeightOfPillar = 80 

  birdFalling(adjust : number, lowestPoint : number){

    setTimeout( () => {
       
      while(this.birdStart == undefined || this.bird == undefined || this.birdHeight == undefined || this.birdWidth == undefined || this.birdLeft == undefined){
        this.bird = document.getElementById('flappyBird')
        this.birdStart = this.bird?.offsetTop
        this.birdHeight = this.bird?.clientHeight
        this.birdWidth = this.bird?.clientWidth
        this.birdLeft = this.bird?.offsetLeft
      }

      console.log("heightBird: "+ this.birdHeight)
      console.log("widthBird: "+ this.birdWidth)
      console.log("leftBird: "+ this.birdLeft)
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

  getPillarElementInfo(id : number){

    let upperPillar = 'upperPillar' + id
    let lowerPillar = 'lowerPillar' + id

    let pillarAbove = document.getElementById(upperPillar)
    let pillarBelow = document.getElementById(lowerPillar)
    let pillarPosition = pillarBelow?.offsetLeft
    let pillarWidth = pillarAbove?.clientWidth

    // console.log(pillarWidth)

    while(pillarAbove == undefined || pillarBelow == undefined || pillarPosition == undefined || pillarWidth == undefined){
      pillarAbove = document.getElementById(upperPillar)
      pillarBelow = document.getElementById(lowerPillar)
      // pillarPosition = this.pillarBottom?.offsetLeft
      let pillarWidth = pillarAbove?.clientWidth
      console.log("loop" + id)
    }
    
    return {
      above: pillarAbove , 
      below : pillarBelow , 
      position : pillarPosition, 
      Width : pillarWidth
    }
    
  }

  pillarsMoving(adjust : number, furthersPoint : number, id : number , changeHeight : boolean){

    setTimeout( () => {
     
      let pillar = this.getPillarElementInfo(id)
      if(changeHeight){
        let randNum =  this.totalHeightOfPillar * Math.random();
        pillar.above.style.height = randNum + "vh"
        pillar.below.style.height = (this.totalHeightOfPillar - randNum )+ "vh"
        changeHeight = !changeHeight
      } 
      
      if(pillar.below != undefined && pillar.above != undefined && pillar.position!= undefined && pillar.Width != undefined){
        
        pillar.above.style.left = (pillar.position - this.pillarMoveLeft) + 'px'
        pillar.below.style.left = (pillar.position - this.pillarMoveLeft) + 'px'
    
        pillar.position -= this.pillarMoveLeft

        if(pillar.position == 70){
          let newPillar = id + 1
          this.pillarSpawn.push(newPillar);
          
          // let tempPillarInfo = this.getPillarElementInfo(newPillar)
          // let randNum =  this.totalHeightOfPillar * Math.random();
          // tempPillarInfo.above.style.height = randNum + "vh"
          // tempPillarInfo.below.style.height = (this.totalHeightOfPillar - randNum )+ "vh"
          console.log(id);
          this.pillarsMoving(1, furthersPoint, newPillar, true)
        }

        if(pillar.position >= furthersPoint - pillar.Width){
          this.pillarsMoving(1, furthersPoint , id, changeHeight)
        }else{
          this.pillarSpawn.splice(0, 1)
        }
      }else{
        console.log('umm')
      }
    }
      ,10 * adjust)
  }

  
  ngOnInit(){
    console.log(this.totalHeightOfPillar)
    let container = document.getElementById('container')

    this.birdFalling(1, this.viewportHeight)
    this.pillarsMoving(1, 0, 0, true)
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


