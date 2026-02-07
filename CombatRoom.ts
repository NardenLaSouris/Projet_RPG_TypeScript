import { Room } from "./Room.ts";
import { Fight } from "./fight.ts";
import { Goblin } from "./Monster/Goblin.ts";
import { Wolf } from "./Monster/Wolf.ts";
import { Bandit } from "./Monster/Bandit.ts";
import { Chimera } from "./Monster/Chimera.ts";
import { Ahrimann } from "./Monster/Ahrimann.ts";
import { Character } from "./adventurers/Character.ts";

export class CombatRoom extends Room {
  constructor(private team: Character[]) {
    super();
  }

  async enter(): Promise<boolean> {
    const pool: Array<{ label: string; create: (name: string) => Character }> = [
      { label: "Gobelin", create: name => new Goblin(name) },
      { label: "Loup", create: name => new Wolf(name) },
      { label: "Bandit", create: name => new Bandit(name) },
      { label: "Chimere", create: name => new Chimera(name) },
      { label: "Ahrimann", create: name => new Ahrimann(name) },
    ];

    const enemies: Character[] = [];
    for (let i = 0; i < 3; i++) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      enemies.push(pick.create(`${pick.label} ${i + 1}`));
    }

    await new Fight(this.team, enemies).start();
    return this.team.some(c => c.isAlive());
  }
}
