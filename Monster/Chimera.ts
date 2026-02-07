import { Monster } from "./Monster.ts";

export class Chimera extends Monster {
    constructor(name: string) {
        super(name, 13, 4, 8, 90, "Flammes", "magique");
    }
}