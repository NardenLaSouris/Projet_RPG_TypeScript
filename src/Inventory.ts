export class Inventory {
  private static instance: Inventory;
  private items = new Map<string, number>();

  private constructor() {
    this.items.set("Potion", 2);
    this.items.set("Ether", 1);
    this.items.set("Star Shard", 1);
    this.items.set("Half Star", 0);
  }

  static getInstance(): Inventory {
    if (!Inventory.instance) Inventory.instance = new Inventory();
    return Inventory.instance;
  }

  add(item: string): void {
    this.items.set(item, (this.items.get(item) ?? 0) + 1);
  }

  getCount(item: string): number {
    return this.items.get(item) ?? 0;
  }

  use(item: string): boolean {
    const count = this.items.get(item) ?? 0;
    if (count <= 0) return false;
    this.items.set(item, count - 1);
    return true;
  }
}
