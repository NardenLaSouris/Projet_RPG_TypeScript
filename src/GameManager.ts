import { Warrior } from "./adventurers/Warrior.ts";
import { Barbarian } from "./adventurers/Barbarian.ts";
import { Paladin } from "./adventurers/Paladin.ts";
import { Mage } from "./adventurers/Mage.ts";
import { Priest } from "./adventurers/Priest.ts";
import { Thief } from "./adventurers/Thief.ts";
import { CombatRoom } from "./CombatRoom.ts";
import { ChestRoom } from "./ChestRoom.ts";
import { Boss } from "./enemies/Boss.ts";
import { Fight } from "./fight.ts";
import { Menu } from "./Menu.ts";
import { Character } from "./adventurers/Character.ts";

export class GameManager {
  async start(): Promise<void> {
    console.log("+--------------------------------------------+");
    console.log("|                 DONJON RPG                |");
    console.log("+--------------------------------------------+");
    const team = this.buildTeam();

    const rooms = [
      new CombatRoom(team),
      new ChestRoom(team),
      new CombatRoom(team),
      new ChestRoom(team),
    ];

    for (const room of rooms) {
      if (!await room.enter()) {
        console.log("Game Over");
        return;
      }
    }

    console.log("+--------------------------------------------+");
    console.log("|                 BOSS FINAL                |");
    console.log("+--------------------------------------------+");
    const boss = new Boss("Seigneur vampire", 20, 10, 15, 200, "Morsure");
    await new Fight(team, [boss]).start();

    if (team.some(c => c.isAlive())) {
      console.log("Victoire !");
    } else {
      console.log("Game Over");
    }
  }

  private buildTeam(): Character[] {
    const roster: Array<{ label: string; create: (name: string, weapon: string) => Character }> = [
      { label: "Guerrier", create: (name, weapon) => new Warrior(name, weapon) },
      { label: "Mage", create: (name, weapon) => new Mage(name, weapon) },
      { label: "Paladin", create: (name, weapon) => new Paladin(name, weapon) },
      { label: "Barbare", create: (name, weapon) => new Barbarian(name, weapon) },
      { label: "Pretre", create: (name, weapon) => new Priest(name, weapon) },
      { label: "Voleur", create: (name, weapon) => new Thief(name, weapon) },
    ];

    const team: Character[] = [];
    for (let i = 0; i < 3; i++) {
      const menu = new Menu(`Choisis l'aventurier #${i + 1}:`, roster.map(r => r.label));
      const index = menu.ask();
      const pick = roster.splice(index, 1)[0];
      const nameInput = prompt("Nom du personnage:");
      const weaponInput = prompt("Arme du personnage:");
      const name = nameInput && nameInput.trim().length > 0 ? nameInput.trim() : pick.label;
      const weapon = weaponInput && weaponInput.trim().length > 0 ? weaponInput.trim() : "Arme";
      team.push(pick.create(name, weapon));
    }

    console.log("+--------------------------------------------+");
    console.log("|              EQUIPE CHOISIE              |");
    console.log("+--------------------------------------------+");
    team.forEach(member => {
      console.log(`\x1b[34m- ${member.getName()}\x1b[0m`);
    });

    return team;
  }
}
