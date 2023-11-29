import { Component, OnInit } from '@angular/core';
import { Pillar } from 'src/bird.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'flappyBirdClone';

  timeoutIds : any[] = [];

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
  birdBottom : any
  birdRight : any

  moveDownDistance = 1
  moveUpDistance = 50
  pillarMoveLeft = 1
  // pillarStart = this.pillarBottom?.offsetLeft
  totalHeightOfPillar = 80 

  birdFalling(adjust: number, lowestPoint: number) {
    const fall = () => {
     
        while(this.birdStart == undefined || this.bird == undefined || this.birdHeight == undefined || this.birdWidth == undefined || this.birdLeft == undefined){
          this.bird = document.getElementById('flappyBird')
          this.birdStart = this.bird?.offsetTop
          this.birdHeight = this.bird?.clientHeight
          this.birdWidth = this.bird?.clientWidth
          this.birdLeft = this.bird?.offsetLeft
          if(this.birdStart != undefined && this.birdHeight != undefined && this.birdLeft != undefined && this.birdWidth != undefined){
            this.birdBottom = this.birdStart + this.birdHeight
            this.birdRight = this.birdLeft + this.birdWidth
          }
        }
      

      // console.log("heightBird: "+ this.birdHeight)
      // console.log("widthBird: "+ this.birdWidth)
      // console.log("leftBird: "+ this.birdLeft)

      // console.log(this.viewportHeight  - this.birdHeight - this.moveDownDistance)
      // console.log("----")

      // this.checkIfBirdTouchesPillar(this.birdStart, this.birdLeft, this.birdWidth, this.birdHeight, 1)

      if(this.birdStart != undefined && this.bird != undefined){
        // console.log(this.birdStart)
        this.bird.style.top = (this.birdStart + this.moveDownDistance) + 'px'
        this.birdStart += this.moveDownDistance
        this.birdBottom = this.birdStart + this.birdHeight
        if(this.birdBottom != lowestPoint
           //- (this.birdHeight * 2) - this.moveDownDistance
           ){
          this.birdFalling(1, lowestPoint)
        }
      }else{
        console.log('umm')
      }
    }
  
    setTimeout(fall, 10 * adjust);
  }

  checkIfBirdTouchesPillar(pillar : {
    above: any , 
    below : any , 
    position : number, 
    Width : number}){

    // console.log(pillar)
    
    if(this.birdStart != undefined && this.birdHeight != undefined && this.birdLeft != undefined && this.birdWidth != undefined){
      if(this.birdRight >= pillar.position && this.birdLeft <= (pillar.position + pillar.Width)){
        // console.log('between')
        
        let pillarFromTop = pillar.above.clientHeight
        let pillarFromBottom = pillar.below.clientHeight
        console.log('------------')
        console.log(this.viewportHeight)
        console.log('From top TOP ' + this.birdStart)
        console.log('From top BOTTOM ' + this.birdBottom)
        console.log('Pillar form TOP ' + pillarFromTop)
        console.log('Pillar from bottom ' + pillarFromBottom)
        if(
          //this.birdBottom <= pillarFromTop 
          // || 
          this.birdStart <=  pillar.above.clientHeight || this.birdBottom >= (this.viewportHeight - pillar.below.clientHeight)
          ){
          console.log('touching')
          
          const container = document.getElementById('container');
          if (container) {
              container.style.backgroundColor = 'blue';
          }
          throw new Error("exiting the function foo");
        }
      }
    }
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

    // console.log(pillarAbove)
    // console.log(pillarBelow)
    // console.log(pillarPosition)
    // console.log(pillarWidth)

    while(pillarAbove == undefined || pillarBelow == undefined || pillarPosition == undefined || pillarWidth == undefined){
      pillarAbove = document.getElementById(upperPillar)
      pillarBelow = document.getElementById(lowerPillar)
      pillarPosition = pillarBelow?.offsetLeft
      pillarWidth = pillarAbove?.clientWidth
      console.log("loop" + id)
    }
    
    // console.log('[------]')
    // console.log(pillarAbove)
    // console.log(pillarBelow)
    // console.log(pillarPosition)
    // console.log(pillarWidth)
    // console.log('[------]')

    return {
      above: pillarAbove , 
      below : pillarBelow , 
      position : pillarPosition, 
      Width : pillarWidth
    }
    
  }

  slowMovePillar(pillar : {
    above: any , 
    below : any , 
    position : number, 
    Width : number}, end : number , id : number, furthersPoint : number){
    
    pillar.above.style.left = (pillar.position - this.pillarMoveLeft) + 'px'
    pillar.below.style.left = (pillar.position - this.pillarMoveLeft) + 'px'
    
    pillar.position -= this.pillarMoveLeft

    this.checkIfBirdTouchesPillar(pillar)

    if(pillar.position == 70){

      console.log("3")
    
      let newPillar = id + 1
      this.pillarSpawn.push(newPillar);
      
      // let tempPillarInfo = this.getPillarElementInfo(newPillar)
      // let randNum =  this.totalHeightOfPillar * Math.random();
      // tempPillarInfo.above.style.height = randNum + "vh"
      // tempPillarInfo.below.style.height = (this.totalHeightOfPillar - randNum )+ "vh"
      console.log(id);
      this.pillarsMoving(1, furthersPoint, newPillar, true)
    }

    if(pillar.position >= end){
      setTimeout(() => this.slowMovePillar(pillar, end , id, furthersPoint), 10);
    }else{
      this.pillarSpawn.splice(0, 1)
    }

  }

  pillarsMoving(adjust : number, furthersPoint : number, id : number , changeHeight : boolean){
    // console.log('im working')
    const movingPillar = () => {
      // console.log('----------------')
      let pillar = this.getPillarElementInfo(id)

      // console.log(pillar) //working

      if(changeHeight){
        let randNum =  this.totalHeightOfPillar * Math.random();
        pillar.above.style.height = randNum + "vh"
        pillar.below.style.height = (this.totalHeightOfPillar - randNum )+ "vh"
        changeHeight = !changeHeight
      } 
      
      if(pillar.below != undefined && pillar.above != undefined && pillar.position!= undefined && pillar.Width != undefined){
        
        console.log("2")

        this.slowMovePillar(pillar, furthersPoint - pillar.Width, id, furthersPoint)
          
      }else{
        console.log('umm')
      }
    }
    
    let timeoutId = setTimeout( movingPillar, 1000 * adjust)

    this.timeoutIds.push(timeoutId);
      // console.log(this.timeoutIds)
  }

  
  ngOnInit(){
    // console.log(this.totalHeightOfPillar)
    let container = document.getElementById('container')

    this.birdFalling(1, this.viewportHeight)
    this.pillarsMoving(1, 0, 0, true)
    // console.log(this.viewportHeight)
    while(this.bird == undefined){
      this.bird = document.getElementById('flappyBird')
    }
    if(container != undefined){
      // console.log("hello")
      container.addEventListener('click',() => this.birdFlying(1))
    }
}

  
}


