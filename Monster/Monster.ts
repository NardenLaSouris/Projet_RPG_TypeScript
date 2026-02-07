import { Character } from "../adventurers/Character.ts";
import type { Fight } from "../fight.ts";

export class Monster extends Character {
    private attackType: "physique" | "magique";

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
        weapon = "Claws",
        attackType: "physique" | "magique" = "physique",
    ) {
        super(name, attack, defense, speed, maxHp, weapon);
        this.attackType = attackType;
    }

    override isAlive(): boolean {
        if (this.currentHp <= 0) {
            console.error(`${this.name} died in atrocious suffering, his guts emptying on the ground!`);
        }    
        return this.currentHp > 0;
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

    override playTurn(fight: Fight): void {
        const opponents = fight.getOpponents(this);
        const target = this.chooseTarget(opponents);
        if (!target) return;

        if (this.attackType === "magique") {
            const result = this.attackTargetMagical(target);
            fight.logAttack(this, target, result.damage, false, "magique");
            return;
        }

        const result = this.attackTarget(target);
        fight.logAttack(this, target, result.damage, result.isCritical, "physique");
    }
}
