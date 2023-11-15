export class Pillar{
    id : number
    upperPillarId : string
    lowerPillarId : string
    upperPillarHeight : number
    lowerPillarHeight : number
    leftPosition : number

    constructor(
        id : number,
        upperPillarId : string, 
        lowerPillarId : string, 
        upperPillarHeight : number, 
        lowerPillarHeight : number,
        leftPosition : number
    ){
        this.id = id
        this.upperPillarId = upperPillarId
        this.lowerPillarId = lowerPillarId
        this.upperPillarHeight = upperPillarHeight
        this.lowerPillarHeight = lowerPillarHeight
        this.leftPosition = leftPosition
    }
}