import wretch from 'wretch'

export const api =
  wretch("/api", { mode: "cors" })
    .errorType("json")
    .resolve(r => r.json())