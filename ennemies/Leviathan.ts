import { Boss } from "./Boss.ts";

export class Leviathan extends Boss {
    constructor(name: string, weapon: string) {
        super(name, 35, 12, 8, 400, weapon);
    }
}