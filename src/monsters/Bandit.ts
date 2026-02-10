import { Monster } from "./Monster.ts";

export class Bandit extends Monster {
    constructor(name: string) {
        super(name, 9, 3, 11, 60, "Dagger", "physical");
    }
}