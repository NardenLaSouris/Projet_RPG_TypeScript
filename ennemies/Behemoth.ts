import { Boss } from "./Boss.ts";

export class Behemoth extends Boss {
    constructor(name: string) {
        super(name, 25, 10, 5, 300);
    }
}