import { Character } from "./adventurers/Character.ts";

export class Fight {
  private static readonly BOX_WIDTH = 60;
  private static readonly BAR_WIDTH = 18;
  private static readonly COLOR_RESET = "\x1b[0m";
  private static readonly COLOR_YELLOW = "\x1b[33m";
  private static readonly COLOR_BLUE = "\x1b[34m";
  private static readonly COLOR_RED = "\x1b[31m";
  private static readonly COLOR_GREEN = "\x1b[32m";
  private static readonly COLOR_CYAN = "\x1b[36m";
  private order: Character[];
  private index = 0;
  private turnCount = 1;

  constructor(private teamA: Character[], private teamB: Character[]) {
    this.order = [...teamA, ...teamB].sort((a, b) => b.getSpeed() - a.getSpeed());
  }

  async start(): Promise<void> {
    this.printBox("Combat", ["Combat begins"], Fight.COLOR_YELLOW);
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
    this.printBox("Combat", ["Combat ends"], Fight.COLOR_YELLOW);
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
    type: "physical" | "magical",
  ): void {
    const critText = isCritical ? " [CRIT]" : "";
    const attackerColor = this.isPlayer(attacker) ? Fight.COLOR_BLUE : Fight.COLOR_RED;
    const targetColor = this.isPlayer(target) ? Fight.COLOR_BLUE : Fight.COLOR_RED;
    const typeColor = type === "magical" ? Fight.COLOR_CYAN : Fight.COLOR_YELLOW;
    const critColor = isCritical ? Fight.COLOR_RED : Fight.COLOR_RESET;
    console.log(
      `> ${attackerColor}${attacker.getName()}${Fight.COLOR_RESET} -> ` +
        `${targetColor}${target.getName()}${Fight.COLOR_RESET} : ` +
        `${damage} damage ${typeColor}${type}${Fight.COLOR_RESET}${critColor}${critText}${Fight.COLOR_RESET}`,
    );
    const koText = target.isAlive() ? "" : " [KO]";
    console.log(
      `  ${targetColor}${target.getName()}${Fight.COLOR_RESET} : ${target.getCurrentHp()} HP${koText}`,
    );
  }

  logHeal(source: string, target: Character, amount: number): void {
    const targetColor = this.isPlayer(target) ? Fight.COLOR_BLUE : Fight.COLOR_RED;
    console.log(
      `> ${Fight.COLOR_GREEN}${source}${Fight.COLOR_RESET} heals ` +
        `${targetColor}${target.getName()}${Fight.COLOR_RESET} for ${amount} HP`,
    );
    console.log(
      `  ${targetColor}${target.getName()}${Fight.COLOR_RESET} : ${target.getCurrentHp()} HP`,
    );
  }

  logMp(target: Character, amount: number): void {
    const targetColor = this.isPlayer(target) ? Fight.COLOR_BLUE : Fight.COLOR_RED;
    console.log(
      `> ${targetColor}${target.getName()}${Fight.COLOR_RESET} recovers ${amount} MP`,
    );
    console.log(
      `  ${targetColor}${target.getName()}${Fight.COLOR_RESET} : ${target.getCurrentMp()} MP`,
    );
  }

  logMessage(message: string): void {
    console.log(`> ${Fight.COLOR_YELLOW}${message}${Fight.COLOR_RESET}`);
  }

  private logTurnStart(actor: Character): void {
    const side = this.teamA.includes(actor) ? "Player" : "Enemy";
    const color = this.teamA.includes(actor) ? Fight.COLOR_BLUE : Fight.COLOR_RED;
    console.log("");
    console.log(color + "-".repeat(Fight.BOX_WIDTH) + Fight.COLOR_RESET);
    console.log(
      color + `Turn ${this.turnCount} : ${actor.getName()} (${side})` + Fight.COLOR_RESET,
    );
    this.turnCount += 1;
  }

  private logTeams(): void {
    const playerLines = this.teamA.map(c => this.formatStatusLine(c));
    const enemyLines = this.teamB.map(c => this.formatStatusLine(c));
    this.printBox("Players", playerLines, Fight.COLOR_BLUE);
    this.printBox("Enemies", enemyLines, Fight.COLOR_RED);
  }

  private announceEnemies(): void {
    const names = this.teamB.map(c => c.getName());
    this.printBox("Encounter", [`Enemies: ${names.join(", ")}`], Fight.COLOR_YELLOW);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private formatStatusLine(c: Character): string {
    const hpBar = this.renderBar(c.getCurrentHp(), c.getMaxHp());
    const hpText = `${c.getCurrentHp()}/${c.getMaxHp()} HP`;
    const mpText = c.getMaxMp() > 0
      ? ` | ${this.renderBar(c.getCurrentMp(), c.getMaxMp())} ${c.getCurrentMp()}/${c.getMaxMp()} MP`
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

  private printBox(title: string, lines: string[], color: string): void {
    const width = Fight.BOX_WIDTH;
    const top = `+${"-".repeat(width - 2)}+`;
    console.log(color + top + Fight.COLOR_RESET);
    const titleLine = this.padLine(` ${title} `, width - 2);
    console.log(color + `|${titleLine}|` + Fight.COLOR_RESET);
    console.log(color + `+${"-".repeat(width - 2)}+` + Fight.COLOR_RESET);
    lines.forEach(line => {
      console.log(color + `|${this.padLine(` ${line}`, width - 2)}|` + Fight.COLOR_RESET);
    });
    console.log(color + top + Fight.COLOR_RESET);
  }

  private padLine(text: string, width: number): string {
    if (text.length >= width) return text.slice(0, width);
    return text + " ".repeat(width - text.length);
  }
}
