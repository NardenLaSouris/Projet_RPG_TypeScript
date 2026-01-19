import { Monster } from "./Monster.ts";

export class Ahrimann extends Monster {
    constructor(name: string) {
        super(name, 20, 7, 6, 150);
    }
}