import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { cacheService } from './cacheService'

function createLocalStorageMock() {
  let store = {}
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
  }
}

describe('cacheService', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('stores and retrieves a value', () => {
    cacheService.set('key1', { name: 'test' })
    const result = cacheService.get('key1')
    expect(result).toEqual({ name: 'test' })
  })

  it('returns null for a key that does not exist', () => {
    const result = cacheService.get('nonexistent')
    expect(result).toBeNull()
  })

  it('returns the value when TTL has not expired', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T10:00:00'))

    cacheService.set('key2', [1, 2, 3])

    vi.setSystemTime(new Date('2024-01-01T10:59:00'))
    const result = cacheService.get('key2')

    expect(result).toEqual([1, 2, 3])
  })

  it('returns null and removes the item when TTL has expired', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T10:00:00'))

    cacheService.set('key3', 'value')

    vi.setSystemTime(new Date('2024-01-01T11:01:00'))
    const result = cacheService.get('key3')

    expect(result).toBeNull()
    expect(localStorage.getItem('key3')).toBeNull()
  })

  it('overwrites an existing value', () => {
    cacheService.set('key4', 'first')
    cacheService.set('key4', 'second')
    expect(cacheService.get('key4')).toBe('second')
  })
})
