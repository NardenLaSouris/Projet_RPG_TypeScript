import { Character } from "./Character.ts";

export class Barbarian extends Character {
    constructor (name : string, weapon: string) {
        super(name, 15, 5, 10, 120, weapon);
    }
}