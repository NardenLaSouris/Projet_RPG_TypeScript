import { Monster } from "./Monster.ts";

export class Ahrimann extends Monster {
    constructor(name: string) {
        super(name, 12, 4, 7, 85, "Ombres", "magique");
    }
}