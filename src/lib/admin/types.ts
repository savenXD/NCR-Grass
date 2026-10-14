/** One enquiry from the website quote form (same fields as `quoteSchema`, plus id + time). */
export type Submission = {
  id: string
  name: string
  phone: string
  area: string
  size?: string
  /** Epoch milliseconds, set by the server when the enquiry is saved. */
  createdAt: number
}
