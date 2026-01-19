import { Character } from "./Character.ts";

export class Thief extends Character {
    constructor(name: string, weapon: string) {
        super(name, 12, 4, 15, 90, weapon);
    }
}