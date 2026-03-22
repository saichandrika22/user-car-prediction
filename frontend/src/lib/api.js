const DEFAULT_API_URL = 'http://127.0.0.1:8000'

export function getApiUrl() {
  const url = import.meta.env.VITE_API_URL || DEFAULT_API_URL
  return url.replace(/\/+$/, '')
}

export async function predictPrice(payload, { signal } = {}) {
  const res = await fetch(`${getApiUrl()}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) message = typeof data.detail === 'string' ? data.detail : message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return await res.json()
}

export async function sendContactMessage(payload, { signal } = {}) {
  const res = await fetch(`${getApiUrl()}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) message = typeof data.detail === 'string' ? data.detail : message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return await res.json()
}

export async function fetchCars({ query = '', brand = '', limit = 24, signal } = {}) {
  const params = new URLSearchParams()
  if (query) params.set('query', query)
  if (brand) params.set('brand', brand)
  params.set('limit', String(limit))

  const res = await fetch(`${getApiUrl()}/cars?${params.toString()}`, {
    method: 'GET',
    signal,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) message = typeof data.detail === 'string' ? data.detail : message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return await res.json()
}

export async function fetchBrands({ query = '', signal } = {}) {
  const params = new URLSearchParams()
  if (query) params.set('query', query)

  const res = await fetch(`${getApiUrl()}/brands?${params.toString()}`, {
    method: 'GET',
    signal,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) message = typeof data.detail === 'string' ? data.detail : message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return await res.json()
}

export async function fetchBrandAveragePrice(brand, { signal } = {}) {
  const res = await fetch(`${getApiUrl()}/brand-average-price?brand=${encodeURIComponent(brand)}`, {
    method: 'GET',
    signal,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) message = typeof data.detail === 'string' ? data.detail : message
    } catch {
      // ignore
    }
    throw new Error(message)
  }

  return await res.json()
}

