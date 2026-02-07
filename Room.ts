export abstract class Room {
  abstract enter(): Promise<boolean>;
}
