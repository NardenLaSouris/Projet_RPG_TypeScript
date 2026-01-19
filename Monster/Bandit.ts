import { Monster } from "./Monster.ts";

export class Bandit extends Monster {
    constructor(name: string) {
        super(name, 15, 5, 8, 120);
    }
}