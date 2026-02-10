import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Mage extends Character {
    constructor(name: string, weapon: string) {
        super(name, 14, 2, 12, 70, weapon, 60);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `${this.getName()}'s turn - Choose an action:`,
            ["Attack", "Magic Spell", "Item"],
            Menu.COLOR_BLUE,
        );

        const magicCost = 10;
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
                const target = this.selectTarget(fight.getOpponents(this), "Choose a target:");
                if (!target) return;
                if (!this.spendMp(magicCost)) {
                    fight.logMessage("Not enough MP.");
                    continue;
                }
                const result = this.attackTargetMagical(target);
                fight.logAttack(this, target, result.damage, false, "magical");
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}