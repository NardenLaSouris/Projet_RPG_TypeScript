export class Menu {
  private static readonly BOX_WIDTH = 50;
  constructor(private question: string, private options: string[]) {}

  ask(): number {
    const top = `+${"-".repeat(Menu.BOX_WIDTH - 2)}+`;
    console.log("");
    console.log(top);
    console.log(`|${this.padLine(` ${this.question}`, Menu.BOX_WIDTH - 2)}|`);
    console.log(`+${"-".repeat(Menu.BOX_WIDTH - 2)}+`);
    this.options.forEach((o, i) => {
      const line = `${i + 1}. ${o}`;
      console.log(`|${this.padLine(` ${line}`, Menu.BOX_WIDTH - 2)}|`);
    });
    console.log(top);
    const input = prompt("> ");
    const choice = Number(input) - 1;

    if (isNaN(choice) || choice < 0 || choice >= this.options.length) {
      console.log("Choix invalide");
      return this.ask();
    }
    return choice;
  }

  private padLine(text: string, width: number): string {
    if (text.length >= width) return text.slice(0, width);
    return text + " ".repeat(width - text.length);
  }
}
