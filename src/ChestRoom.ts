import { Room } from "./Room.ts";
import { Chest } from "./Chest.ts";
import { Character } from "./adventurers/Character.ts";

export class ChestRoom extends Room {
  constructor(private team: Character[]) {
    super();
  }

  enter(): Promise<boolean> {
    const chest = new Chest();
    chest.open(this.team[0]);
    return Promise.resolve(true);
  }
}
