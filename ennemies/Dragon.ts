import { Boss } from "./Boss.ts";

export class Dragon extends Boss {
    constructor(name: string) {
        super(name, 20, 5, 9, 160);
    }
}