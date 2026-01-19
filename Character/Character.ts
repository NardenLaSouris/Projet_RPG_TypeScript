export class Character {
    protected name: string;
    protected attack: number;
    protected defense: number;
    protected speed: number;
    protected maxHp: number;
    protected currentHp: number;

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
        ) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
    }

    isAlive(): boolean {
        if (this.currentHp <= 0) {
            console.log(`${this.name} died.`);
        }
        return this.currentHp > 0;
    }

    attackTarget(target: Character): void {
        if (!this.isAlive()) return;

        const damage = Math.max(this.attack - target.defense, 0);
        target.currentHp = Math.max(target.currentHp - damage, 0);
    }

    heal(percent: number): void {
        if (!this.isAlive()) return;

        const healAmount = Math.floor(this.maxHp * percent / 100);
        this.currentHp = Math.min(this.currentHp + healAmount, this.maxHp);
    }

    resurrect(percent: number): void {
        if (this.isAlive()) return;

        const resurrectHp = Math.floor(this.maxHp * percent / 100);
        this.currentHp = Math.min(resurrectHp, this.maxHp);
    }
}
