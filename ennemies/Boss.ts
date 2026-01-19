// Boss.ts
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

    chooseTarget(adventurers: Character[]): Character[] {
        const alive = adventurers.filter(a => a.isAlive());
        if (alive.length === 0) return [];

        const roll = Math.random() * 100;

        if (roll <= 30) {
            // 30% : attaque de zone → tous les vivants
            return alive;
        } else {
            // 70% : attaque normale → cible unique (plus faible en PV)
            const target = alive.reduce((low, cur) =>
                cur.getCurrentHp() < low.getCurrentHp() ? cur : low
            );
            return [target]; // toujours un tableau pour homogénéité
        }
    }

    performAttack(adventurers: Character[]): void {
        const targets = this.chooseTarget(adventurers);

        targets.forEach((target: Character) => {
            const damage = Math.max(this.attack - target.getDefense(), 0); // plus de rouge
            target.setCurrentHp(target.getCurrentHp() - damage); 
            console.log(`${this.name} attacks ${target.getName()} for ${damage} damage!`);
        });
    }

}
