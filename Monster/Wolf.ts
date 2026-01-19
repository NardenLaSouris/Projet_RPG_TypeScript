import { Monster } from "./Monster.ts";

export class Wolf extends Monster {
    constructor(name: string) {
        super(name, 12, 4, 10, 110);
    }
}