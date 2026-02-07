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
            `Tour de ${this.getName()} - Choisis une action:`,
            ["Attaquer", "Voler", "Objet"],
            Menu.COLOR_BLUE,
        );

        while (true) {
            const choice = menu.ask();
            if (choice === 0) {
                const target = this.selectTarget(fight.getOpponents(this), "Choisis une cible:");
                if (!target) return;
                const result = this.attackTarget(target);
                fight.logAttack(this, target, result.damage, result.isCritical, "physique");
                return;
            }

            if (choice === 1) {
                const roll = Math.random() * 100;
                const inventory = Inventory.getInstance();
                if (roll < 40) {
                    fight.logMessage("Vol rate, aucun objet vole.");
                    return;
                }
                if (roll < 70) {
                    inventory.add("Potion");
                    fight.logMessage("Objet vole: Potion");
                    return;
                }
                if (roll < 85) {
                    inventory.add("Morceau d'etoile");
                    fight.logMessage("Objet vole: Morceau d'etoile");
                    return;
                }
                if (roll < 95) {
                    inventory.add("Ether");
                    fight.logMessage("Objet vole: Ether");
                    return;
                }
                inventory.add("Demi-etoile");
                fight.logMessage("Objet vole: Demi-etoile");
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}