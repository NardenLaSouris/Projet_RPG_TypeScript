import { Boss } from "./Boss.ts";

export class Leviathan extends Boss {
    constructor(name: string) {
        super(name, 22, 7, 7, 220);
    }
}