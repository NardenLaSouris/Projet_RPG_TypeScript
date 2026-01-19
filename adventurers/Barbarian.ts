import { Character } from "./Character.ts";

export class Barbarian extends Character {
    constructor (name : string) {
        super(name, 30, 5, 10, 150, "axe");
    }
}