import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Paladin extends Character {
    constructor(name: string, weapon: string) {
        super(name, 11, 7, 8, 110, weapon);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `${this.getName()}'s turn - Choose an action:`,
            ["Attack", "Holy Attack (AoE)", "Item"],
            Menu.COLOR_BLUE,
        );

        while (true) {
            const choice = menu.ask();
            if (choice === 0) {
                const target = this.selectTarget(fight.getOpponents(this), "Choose a target:");
                if (!target) return;
                const result = this.attackTarget(target);
                fight.logAttack(this, target, result.damage, result.isCritical, "physical");
                return;
            }

            if (choice === 1) {
                const opponents = fight.getOpponents(this);
                opponents.forEach(target => {
                    const baseDamage = this.getPhysicalDamageAgainst(target);
                    const damage = Math.floor(baseDamage * 0.4);
                    const dealt = target.takeDamage(damage);
                    fight.logAttack(this, target, dealt, false, "physical");
                });
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}