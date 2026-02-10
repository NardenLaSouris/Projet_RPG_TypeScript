export class Menu {
  private static readonly BOX_WIDTH = 50;
  private static readonly COLOR_RESET = "\x1b[0m";
  private static readonly COLOR_YELLOW = "\x1b[33m";
  static readonly COLOR_BLUE = "\x1b[34m";
  constructor(
    private question: string,
    private options: string[],
    private color: string = Menu.COLOR_YELLOW,
  ) {}

  ask(): number {
    const top = `+${"-".repeat(Menu.BOX_WIDTH - 2)}+`;
    console.log("");
    console.log(this.color + top + Menu.COLOR_RESET);
    console.log(
      this.color + `|${this.padLine(` ${this.question}`, Menu.BOX_WIDTH - 2)}|` + Menu.COLOR_RESET,
    );
    console.log(
      this.color + `+${"-".repeat(Menu.BOX_WIDTH - 2)}+` + Menu.COLOR_RESET,
    );
    this.options.forEach((o, i) => {
      const line = `${i + 1}. ${o}`;
      console.log(
        this.color + `|${this.padLine(` ${line}`, Menu.BOX_WIDTH - 2)}|` + Menu.COLOR_RESET,
      );
    });
    console.log(this.color + top + Menu.COLOR_RESET);
    const input = prompt("> ");
    const choice = Number(input) - 1;

    if (isNaN(choice) || choice < 0 || choice >= this.options.length) {
      console.log("Invalid choice");
      return this.ask();
    }
    return choice;
  }

  private padLine(text: string, width: number): string {
    if (text.length >= width) return text.slice(0, width);
    return text + " ".repeat(width - text.length);
  }
}
