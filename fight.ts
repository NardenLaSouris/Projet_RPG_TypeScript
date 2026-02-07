import { Character } from "./adventurers/Character.ts";

export class Fight {
  private static readonly BOX_WIDTH = 60;
  private static readonly BAR_WIDTH = 18;
  private order: Character[];
  private index = 0;
  private turnCount = 1;

  constructor(private teamA: Character[], private teamB: Character[]) {
    this.order = [...teamA, ...teamB].sort((a, b) => b.getSpeed() - a.getSpeed());
  }

  async start(): Promise<void> {
    this.printBox("Combat", ["Debut du combat"]);
    this.announceEnemies();
    this.logTeams();
    while (!this.isOver()) {
      const actor = this.order[this.index];
      if (actor.isAlive()) {
        this.logTurnStart(actor);
        await actor.playTurn(this);
        if (!this.isPlayer(actor)) {
          await this.delay(1000);
        }
        this.logTeams();
      }
      this.index = (this.index + 1) % this.order.length;
    }
    this.printBox("Combat", ["Combat termine"]);
  }

  isOver(): boolean {
    return (
      this.teamA.every(c => !c.isAlive()) ||
      this.teamB.every(c => !c.isAlive())
    );
  }

  getOpponents(c: Character): Character[] {
    return this.isPlayer(c)
      ? this.teamB.filter(x => x.isAlive())
      : this.teamA.filter(x => x.isAlive());
  }

  getAllies(c: Character): Character[] {
    return this.isPlayer(c)
      ? this.teamA.filter(x => x.isAlive())
      : this.teamB.filter(x => x.isAlive());
  }

  isPlayer(c: Character): boolean {
    return this.teamA.includes(c);
  }

  logAttack(
    attacker: Character,
    target: Character,
    damage: number,
    isCritical: boolean,
    type: "physique" | "magique",
  ): void {
    const critText = isCritical ? " [CRIT]" : "";
    console.log(
      `> ${attacker.getName()} -> ${target.getName()} : ${damage} degats ${type}${critText}`,
    );
    const koText = target.isAlive() ? "" : " [KO]";
    console.log(`  ${target.getName()} : ${target.getCurrentHp()} PV${koText}`);
  }

  logHeal(source: string, target: Character, amount: number): void {
    console.log(`> ${source} soigne ${target.getName()} de ${amount} PV`);
    console.log(`  ${target.getName()} : ${target.getCurrentHp()} PV`);
  }

  logMp(target: Character, amount: number): void {
    console.log(`> ${target.getName()} recupere ${amount} PM`);
    console.log(`  ${target.getName()} : ${target.getCurrentMp()} PM`);
  }

  logMessage(message: string): void {
    console.log(`> ${message}`);
  }

  private logTurnStart(actor: Character): void {
    const side = this.teamA.includes(actor) ? "Joueur" : "Ennemi";
    console.log("");
    console.log("-".repeat(Fight.BOX_WIDTH));
    console.log(`Tour ${this.turnCount} : ${actor.getName()} (${side})`);
    this.turnCount += 1;
  }

  private logTeams(): void {
    const playerLines = this.teamA.map(c => this.formatStatusLine(c));
    const enemyLines = this.teamB.map(c => this.formatStatusLine(c));
    this.printBox("Joueurs", playerLines);
    this.printBox("Ennemis", enemyLines);
  }

  private announceEnemies(): void {
    const names = this.teamB.map(c => c.getName());
    this.printBox("Rencontre", [`Ennemis: ${names.join(", ")}`]);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private formatStatusLine(c: Character): string {
    const hpBar = this.renderBar(c.getCurrentHp(), c.getMaxHp());
    const hpText = `${c.getCurrentHp()}/${c.getMaxHp()} PV`;
    const mpText = c.getMaxMp() > 0
      ? ` | ${this.renderBar(c.getCurrentMp(), c.getMaxMp())} ${c.getCurrentMp()}/${c.getMaxMp()} PM`
      : "";
    const status = c.isAlive() ? "" : " [KO]";
    return `${c.getName()} ${hpBar} ${hpText}${mpText}${status}`;
  }

  private renderBar(current: number, max: number): string {
    if (max <= 0) return "[------------------]";
    const ratio = Math.max(0, Math.min(1, current / max));
    const filled = Math.round(ratio * Fight.BAR_WIDTH);
    const empty = Fight.BAR_WIDTH - filled;
    return `[${"#".repeat(filled)}${"-".repeat(empty)}]`;
  }

  private printBox(title: string, lines: string[]): void {
    const width = Fight.BOX_WIDTH;
    const top = `+${"-".repeat(width - 2)}+`;
    console.log(top);
    const titleLine = this.padLine(` ${title} `, width - 2);
    console.log(`|${titleLine}|`);
    console.log(`+${"-".repeat(width - 2)}+`);
    lines.forEach(line => {
      console.log(`|${this.padLine(` ${line}`, width - 2)}|`);
    });
    console.log(top);
  }

  private padLine(text: string, width: number): string {
    if (text.length >= width) return text.slice(0, width);
    return text + " ".repeat(width - text.length);
  }
}
