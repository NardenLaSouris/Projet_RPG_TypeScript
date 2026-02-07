import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Mage extends Character {
    constructor(name: string, weapon: string) {
        super(name, 14, 2, 12, 70, weapon, 60);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(`Tour de ${this.getName()} - Choisis une action:`, [
            "Attaquer",
            "Sort magique",
            "Objet",
        ]);

        const magicCost = 10;
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
                const target = this.selectTarget(fight.getOpponents(this), "Choisis une cible:");
                if (!target) return;
                if (!this.spendMp(magicCost)) {
                    fight.logMessage("Pas assez de PM.");
                    continue;
                }
                const result = this.attackTargetMagical(target);
                fight.logAttack(this, target, result.damage, false, "magique");
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}