import { Monster } from "./Monster.ts";

export class Goblin extends Monster {
    constructor(name: string) {
        super(name, 6, 2, 10, 45, "Claws", "physical");
    }
}