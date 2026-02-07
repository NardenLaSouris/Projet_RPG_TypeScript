import { Character } from "./Character.ts";
import { Menu } from "../Menu.ts";
import type { Fight } from "../fight.ts";

export class Priest extends Character {
    constructor(name: string, weapon: string) {
        super(name, 9, 4, 11, 80, weapon);
    }

    override playTurn(fight: Fight): void {
        const menu = new Menu(
            `Tour de ${this.getName()} - Choisis une action:`,
            ["Attaquer", "Soin", "Objet"],
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
                const ally = this.selectTarget(fight.getAllies(this), "Choisis un allie:");
                if (!ally) return;
                const healed = ally.heal(25);
                fight.logHeal("Soin", ally, healed);
                return;
            }

            if (this.useItemMenu(fight)) return;
        }
    }
}