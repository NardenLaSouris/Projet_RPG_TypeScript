import { Monster } from "./Monster.ts";

export class Wolf extends Monster {
    constructor(name: string) {
        super(name, 8, 2, 12, 55, "Claws", "physical");
    }
}