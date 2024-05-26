export interface ISale {
    id?: number,
    userId: number,
    total: number,
    date: string,
    books?: { bookId: number, quantity: number }[]
}