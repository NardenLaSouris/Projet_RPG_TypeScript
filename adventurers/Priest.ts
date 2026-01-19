import { Character } from "./Character.ts";

export class Priest extends Character {
    constructor(name: string) {
        super(name, 8, 2, 10, 70);
    }
}