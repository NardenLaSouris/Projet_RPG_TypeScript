export class Character {
    protected name: string;
    protected attack: number;
    protected defense: number;
    protected speed: number;
    protected maxHp: number;
    protected currentHp: number;
    protected weapon: string;

    getCurrentHp(): number {
        return this.currentHp;
    }

    getName(): string {
        return this.name;
    }

    getDefense(): number {
        return this.defense;
    }

    setCurrentHp(value: number) {
        this.currentHp = value;
    }

    constructor(
        name: string,
        attack: number,
        defense: number,
        speed: number,
        maxHp: number,
        weapon: string,
    ) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
        this.weapon = weapon;
    }

    isAlive(): boolean {
            return this.currentHp > 0;
    }


    takeDamage(amount: number): number {
        const dmg = Math.max(0, Math.floor(amount));
        const before = this.currentHp;
            this.currentHp = Math.max(0, this.currentHp - dmg);
            return before - this.currentHp;
    }
    attackTarget(target: Character): number {
        if (!this.isAlive()) return 0;
            const raw = this.attack - target.defense;
                return target.takeDamage(raw);
    }

    heal(percent: number): number {
        if (!this.isAlive()) return 0;
            const p = Math.max(0, Math.min(percent, 100));
            const healAmount = Math.floor(this.maxHp * p / 100);
            const before = this.currentHp;
                this.currentHp = Math.min(this.currentHp + healAmount, this.maxHp);
                    return this.currentHp - before;
    }

    resurrect(percent: number): number {
        if (this.isAlive()) return 0;
            const p = Math.max(0, Math.min(percent, 100));
            const resurrectHp = Math.floor(this.maxHp * p / 100);
                this.currentHp = Math.min(Math.max(1, resurrectHp), this.maxHp);
                     return this.currentHp;
    }
}
