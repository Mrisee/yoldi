export const api = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`https://frontend-test-api.yoldi.agency${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Ошибка запроса')
  }

  return res.json()
}