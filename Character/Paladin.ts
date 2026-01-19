import { Character } from "./Character.ts";

export class Paladin extends Character {
    constructor(name: string) {
        super(name, 11, 6, 11, 100);
    }
}