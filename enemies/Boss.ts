import { Character } from "../adventurers/Character.ts";

export class Monster extends Character {

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
        weapon: string,
    ) {
        super(name, attack, defense, speed, maxHp, weapon);
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
