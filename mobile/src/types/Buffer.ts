export class Buffer {
  cursor = 0;
  size = 0;

  constructor(public data: Uint8Array) {}

  isFinished() {
    return this.cursor >= this.size;
  }

  getByte() {
    return this.data[this.cursor++];
  }

  move(length: number) {
    let start = this.cursor;
    this.cursor = this.cursor + length > this.size ? this.size : this.cursor + length;
    let end = this.cursor;
    return end - start;
  }

  setData(data: Uint8Array) {
    this.size = data.length;
    this.data = data;
    this.cursor = 0;
  }
}
