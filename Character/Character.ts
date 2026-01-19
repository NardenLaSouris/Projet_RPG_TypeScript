export class Character {
    protected name : string;
    attack : number; 
    defense : number;
    protected speed : number;
    protected currentHp : number;
    private maxHp : number; 

    constructor(
        name : string,
        attack : number,
        defense: number,
        speed : number,
        currentHp : number,
        maxHp : number,
    ){
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.currentHp = currentHp;
        this.maxHp = maxHp;
    }
}