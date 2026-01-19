import { Character } from "../adventurers/Character.js";

export class Boss extends Character {

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number
    ) {
        super(name, attack, defense, speed, maxHp);
    }

    chooseTarget(adventurers: Character[]): Character | null {
        const alive = adventurers.filter(a => a.isAlive());
        if (alive.length === 0) return null;

        const roll = Math.random() * 100;

        if (roll <= 20) {
            return alive.reduce((low, cur) =>
                cur.currentHp < low.currentHp ? cur : low
            );
        }

        return alive[Math.floor(Math.random() * alive.length)];
    }
}
