import { Character } from "../adventurers/Character.ts";

export class Boss {

    protected name: string;
    protected attack: number;
    protected defense: number;
    protected speed: number;
    protected maxHp: number;
    protected currentHp: number;

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
    ) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
    }

    chooseTarget(adventurers: Character[]): Character | null {
        const alive = adventurers.filter(a => a.isAlive());
        if (alive.length === 0) return null;

        const roll = Math.random() * 100;

        if (roll <= 20) {
            return alive.reduce((low, cur) =>
                cur.getCurrentHp() < low.getCurrentHp() ? cur : low
            );
        }

        return alive[Math.floor(Math.random() * alive.length)];
    }
}
