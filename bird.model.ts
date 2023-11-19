export class Pillar{
    id : number
    upperPillarId : string | null
    lowerPillarId : string | null
    upperPillarHeight : number | null
    lowerPillarHeight : number | null
    leftPosition : number | null

    constructor(
        id : number,
        upperPillarId : string | null, 
        lowerPillarId : string | null, 
        upperPillarHeight : number | null, 
        lowerPillarHeight : number | null,
        leftPosition : number | null
    ){
        this.id = id
        this.upperPillarId = upperPillarId
        this.lowerPillarId = lowerPillarId
        this.upperPillarHeight = upperPillarHeight
        this.lowerPillarHeight = lowerPillarHeight
        this.leftPosition = leftPosition
    }
}
