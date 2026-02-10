import type { Fight } from "../fight.ts";
import { Inventory } from "../Inventory.ts";
import { Menu } from "../Menu.ts";

export class Character {
    private static readonly CRIT_CHANCE = 0.3;
    private static readonly CRIT_MULTIPLIER = 2;

    protected name: string;
    protected attack: number;
    protected defense: number;
    protected speed: number;
    protected maxHp: number;
    protected currentHp: number;
    protected weapon: string;
    protected maxMp: number;
    protected currentMp: number;

    getCurrentHp(): number {
        return this.currentHp;
    }

    getName(): string {
        return this.name;
    }

    getDefense(): number {
        return this.defense;
    }

    getSpeed(): number {
        return this.speed;
    }

    getMaxHp(): number {
        return this.maxHp;
    }

    getCurrentMp(): number {
        return this.currentMp;
    }

    getMaxMp(): number {
        return this.maxMp;
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
        maxMp = 0,
    ) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
        this.weapon = weapon;
        this.maxMp = maxMp;
        this.currentMp = maxMp;
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

    restoreMp(percent: number): number {
        if (this.maxMp <= 0) return 0;
        const p = Math.max(0, Math.min(percent, 100));
        const restoreAmount = Math.floor(this.maxMp * p / 100);
        const before = this.currentMp;
        this.currentMp = Math.min(this.currentMp + restoreAmount, this.maxMp);
        return this.currentMp - before;
    }

    spendMp(amount: number): boolean {
        if (this.currentMp < amount) return false;
        this.currentMp -= amount;
        return true;
    }

    attackTarget(target: Character): { damage: number; isCritical: boolean } {
        if (!this.isAlive()) {
            return { damage: 0, isCritical: false };
        }
            const baseDamage = this.getPhysicalDamageAgainst(target);
            const isCritical = Math.random() < Character.CRIT_CHANCE;
            const finalDamage = isCritical
                ? baseDamage * Character.CRIT_MULTIPLIER 
                : baseDamage;
            const damageDealt = target.takeDamage(finalDamage);
                return { 
                    damage: damageDealt,
                    isCritical,
                };
    }

    attackTargetMagical(target: Character): { damage: number } {
        if (!this.isAlive()) {
            return { damage: 0 };
        }
        const damageDealt = target.takeDamage(this.attack);
        return { damage: damageDealt };
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

    playTurn(fight: Fight): void {
        const opponents = fight.getOpponents(this);
        if (opponents.length === 0) return;
        const target = opponents[Math.floor(Math.random() * opponents.length)];
        const result = this.attackTarget(target);
        fight.logAttack(this, target, result.damage, result.isCritical, "physical");
    }

    protected getPhysicalDamageAgainst(target: Character): number {
        return Math.max(this.attack - target.getDefense(), 0);
    }

    protected selectTarget(
        list: Character[],
        title: string,
        includeStatus = true,
    ): Character | null {
        if (list.length === 0) return null;
        const options = list.map(c => {
            if (!includeStatus) return c.getName();
            const status = c.isAlive() ? "HP" : "KO";
            const value = c.isAlive() ? c.getCurrentHp() : 0;
            return `${c.getName()} (${status}: ${value})`;
        });
        const index = new Menu(title, options, Menu.COLOR_BLUE).ask();
        return list[index] ?? null;
    }

    protected useItemMenu(fight: Fight): boolean {
        const inventory = Inventory.getInstance();
        const items = [
            "Potion",
            "Star Shard",
            "Half Star",
            "Ether",
        ];
        const available = items.filter(item => inventory.getCount(item) > 0);

        if (available.length === 0) {
            fight.logMessage("No items available.");
            return false;
        }

        const options = available.map(item => `${item} x${inventory.getCount(item)}`);
        options.push("Retour");
        const choice = new Menu("Choose an item:", options, Menu.COLOR_BLUE).ask();
        if (choice === options.length - 1) return false;

        const item = available[choice];
        if (item === "Ether") {
            const allies = fight.getAllies(this);
            const target = this.selectTarget(allies, "Choose a target:");
            if (!target) return false;
            if (target.getMaxMp() <= 0) {
                fight.logMessage("No MP to restore.");
                return false;
            }
            inventory.use(item);
            const restored = target.restoreMp(30);
            fight.logMp(target, restored);
            return true;
        }

        const allies = fight.getAllies(this);
        const target = this.selectTarget(allies, "Choose a target:");
        if (!target) return false;

        inventory.use(item);
        if (item === "Potion") {
            const healed = target.heal(50);
            fight.logHeal("Potion", target, healed);
            return true;
        }

        if (item === "Star Shard") {
            const amount = target.isAlive()
                ? target.heal(50)
                : target.resurrect(20);
            fight.logHeal("Star Shard", target, amount);
            return true;
        }

        if (item === "Half Star") {
            const amount = target.isAlive()
                ? target.heal(100)
                : target.resurrect(100);
            fight.logHeal("Half Star", target, amount);
            return true;
        }

        return false;
    }
}
