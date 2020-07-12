export class NotFoundException implements Error {
  public name = 'Not Found Exception'

  constructor(public message: string) {
    if (typeof console !== 'undefined') {
      console.log(`name: ${this.name}, message: ${this.message}`);
    }
  }
}
