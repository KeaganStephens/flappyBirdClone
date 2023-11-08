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
      if(this.start != undefined && this.bird != undefined){
        console.log(this.start)
        this.start += 50 
        this.bird.style.top = (this.start + 50) + 'px'
        if(this.start <= lowestPoint - this.birdHeight){
          this.birdFalling(1, lowestPoint)
        }
      }else{
        console.log('umm')
      }
    }
      ,1000 * adjust)
  }


  ngOnInit(){
    this.birdFalling(1, this.viewportHeight)
    console.log(this.viewportHeight)
    
}

  
}
