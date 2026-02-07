import { Boss } from "./Boss.ts";

export class Behemoth extends Boss {
    constructor(name: string) {
        super(name, 18, 6, 6, 180);
    }
}