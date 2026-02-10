import { Character } from "../adventurers/Character.ts";
import type { Fight } from "../fight.ts";

export class Monster extends Character {
    private attackType: "physical" | "magical";

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
        weapon = "Claws",
        attackType: "physical" | "magical" = "physical",
    ) {
        super(name, attack, defense, speed, maxHp, weapon);
        this.attackType = attackType;
    }

    override isAlive(): boolean {
        if (this.currentHp <= 0) {
            console.error(`${this.name} has been defeated.`);
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

        if (this.attackType === "magical") {
            const result = this.attackTargetMagical(target);
            fight.logAttack(this, target, result.damage, false, "magical");
            return;
        }

        const result = this.attackTarget(target);
        fight.logAttack(this, target, result.damage, result.isCritical, "physical");
    }
}
