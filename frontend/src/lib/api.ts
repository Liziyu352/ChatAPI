export async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const fallback =
      body?.error?.message ?? body?.error ?? body?.message ?? '请求失败'
    throw new Error(typeof fallback === 'string' ? fallback : '请求失败')
  }
  return body as T
}
