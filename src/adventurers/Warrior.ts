import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Warrior extends Character {
    constructor(name: string, weapon: string) {
        super(name, 12, 5, 10, 90, weapon);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `${this.getName()}'s turn - Choose an action:`,
            ["Attack", "Item"],
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

            if (this.useItemMenu(fight)) return;
        }
    }
}