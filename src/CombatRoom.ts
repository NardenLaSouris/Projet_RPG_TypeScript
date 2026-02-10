import { Room } from "./Room.ts";
import { Fight } from "./fight.ts";
import { Goblin } from "./monsters/Goblin.ts";
import { Wolf } from "./monsters/Wolf.ts";
import { Bandit } from "./monsters/Bandit.ts";
import { Chimera } from "./monsters/Chimera.ts";
import { Ahrimann } from "./monsters/Ahrimann.ts";
import { Character } from "./adventurers/Character.ts";

export class CombatRoom extends Room {
  constructor(private team: Character[]) {
    super();
  }

  async enter(): Promise<boolean> {
    const pool: Array<{ label: string; create: (name: string) => Character }> = [
      { label: "Goblin", create: name => new Goblin(name) },
      { label: "Wolf", create: name => new Wolf(name) },
      { label: "Bandit", create: name => new Bandit(name) },
      { label: "Chimera", create: name => new Chimera(name) },
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
