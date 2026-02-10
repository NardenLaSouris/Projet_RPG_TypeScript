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
    console.log("|                DUNGEON RPG                |");
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
    console.log("|                FINAL BOSS                 |");
    console.log("+--------------------------------------------+");
    const boss = new Boss("Vampire Lord", 20, 10, 15, 200, "Bite");
    await new Fight(team, [boss]).start();

    if (team.some(c => c.isAlive())) {
      console.log("Victory!");
    } else {
      console.log("Game Over");
    }
  }

  private buildTeam(): Character[] {
    const roster: Array<{ label: string; create: (name: string, weapon: string) => Character }> = [
      { label: "Warrior", create: (name, weapon) => new Warrior(name, weapon) },
      { label: "Mage", create: (name, weapon) => new Mage(name, weapon) },
      { label: "Paladin", create: (name, weapon) => new Paladin(name, weapon) },
      { label: "Barbarian", create: (name, weapon) => new Barbarian(name, weapon) },
      { label: "Priest", create: (name, weapon) => new Priest(name, weapon) },
      { label: "Thief", create: (name, weapon) => new Thief(name, weapon) },
    ];

    const team: Character[] = [];
    for (let i = 0; i < 3; i++) {
      const menu = new Menu(`Choose adventurer #${i + 1}:`, roster.map(r => r.label));
      const index = menu.ask();
      const pick = roster.splice(index, 1)[0];
      const nameInput = prompt("Character name:");
      const weaponInput = prompt("Character weapon:");
      const name = nameInput && nameInput.trim().length > 0 ? nameInput.trim() : pick.label;
      const weapon = weaponInput && weaponInput.trim().length > 0 ? weaponInput.trim() : "Weapon";
      team.push(pick.create(name, weapon));
    }

    console.log("+--------------------------------------------+");
    console.log("|               TEAM SELECTED              |");
    console.log("+--------------------------------------------+");
    team.forEach(member => {
      console.log(`\x1b[34m- ${member.getName()}\x1b[0m`);
    });

    return team;
  }
}
