import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Barbarian extends Character {
    constructor (name : string, weapon: string) {
        super(name, 16, 3, 9, 120, weapon);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `${this.getName()}'s turn - Choose an action:`,
            ["Attack", "Berserk", "Item"],
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
                if (opponents.length === 0) return;
                const target = opponents[Math.floor(Math.random() * opponents.length)];
                const baseDamage = this.getPhysicalDamageAgainst(target);
                const damage = Math.floor(baseDamage * 1.3);
                const dealt = target.takeDamage(damage);
                fight.logAttack(this, target, dealt, false, "physical");
                const selfDamage = Math.floor(this.getMaxHp() * 0.2);
                this.takeDamage(selfDamage);
                fight.logMessage(`${this.getName()} hurts themselves for ${selfDamage} HP`);
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}