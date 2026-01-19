import { Character } from "./Character.ts";

export class Thief extends Character {
    constructor(name: string) {
        super(name, 12, 4, 15, 90);
    }
}