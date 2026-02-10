import { Inventory } from "./Inventory.ts";
import { Character } from "./adventurers/Character.ts";

export class Chest {
  open(opener: Character): void {
    const inventory = Inventory.getInstance();

    if (Math.random() < 0.3) {
      console.log("Trap!");
      opener.takeDamage(10);
      return;
    }

    const loot = ["Potion", "Ether", "Star Shard", "Half Star"];
    for (let i = 0; i < 2; i++) {
      const item = loot[Math.floor(Math.random() * loot.length)];
      inventory.add(item);
      console.log(`Item found: ${item}`);
    }
  }
}
