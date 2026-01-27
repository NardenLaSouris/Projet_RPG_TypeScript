import { Character } from "./Character"; 

export class Priest extends Character {
    constructor(name: string, weapon: string) {
        super(name, 8, 4, 14, 70, weapon);
    }
}