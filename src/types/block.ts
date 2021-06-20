export class Block {
    constructor(
        private readonly timestamp: number,
        private readonly lastHash: string,
        private readonly hash: string,
        private readonly date: number
    ){}
    toString():string {
        return `timestamp: ${this.timestamp} lastHash: ${this.lastHash} hash: ${this.hash} date: ${this.date}`
    }
    static genesis():Block{
        return new this(0, '', 'first hash', 0)
    }
}