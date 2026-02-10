import { Character } from "./Character.ts";
import { Inventory } from "../Inventory.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Thief extends Character {
    constructor(name: string, weapon: string) {
        super(name, 11, 3, 16, 85, weapon);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `${this.getName()}'s turn - Choose an action:`,
            ["Attack", "Steal", "Item"],
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
                const roll = Math.random() * 100;
                const inventory = Inventory.getInstance();
                if (roll < 40) {
                    fight.logMessage("Steal failed, no item stolen.");
                    return;
                }
                if (roll < 70) {
                    inventory.add("Potion");
                    fight.logMessage("Stolen item: Potion");
                    return;
                }
                if (roll < 85) {
                    inventory.add("Star Shard");
                    fight.logMessage("Stolen item: Star Shard");
                    return;
                }
                if (roll < 95) {
                    inventory.add("Ether");
                    fight.logMessage("Stolen item: Ether");
                    return;
                }
                inventory.add("Half Star");
                fight.logMessage("Stolen item: Half Star");
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}