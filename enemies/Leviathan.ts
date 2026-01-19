import { Boss } from "./Boss.js";

export class Leviathan extends Boss {
    constructor(name: string) {
        super(name, 35, 12, 8, 400);
    }
}