import { Monster } from "./Monster.ts";

export class Goblin extends Monster {
    constructor(name: string) {
        super(name, 10, 3, 12, 100);
    }
}