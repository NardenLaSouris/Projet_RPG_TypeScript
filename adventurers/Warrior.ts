import { Character } from "./Character.ts";

export class Warrior extends Character {
    constructor(name: string, weapon: string) {
        super(name, 10, 3, 12, 80, weapon);
    }
}