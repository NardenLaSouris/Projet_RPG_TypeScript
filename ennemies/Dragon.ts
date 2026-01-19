import { Boss } from "./Boss.ts";

export class Dragon extends Boss {
    constructor(name: string) {
        super(name, 30, 8, 10, 250);
    }
}