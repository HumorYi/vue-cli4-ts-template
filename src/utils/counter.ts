export default class Counter {
  count: number
  startCount: number

  constructor(count: number = 0) {
    this.startCount = count
    this.count = count
  }

  increase(): void {
    this.count++
  }

  decrease(): void {
    this.count--
  }

  isFinished(): boolean {
    return this.count === this.startCount
  }
}
