import { Monster } from "./Monster.ts";

export class Chimera extends Monster {
    constructor(name: string) {
        super(name, 25, 10, 7, 180);
    }
}