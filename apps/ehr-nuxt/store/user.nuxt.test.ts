import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './user' // Path to your store

describe('Pinia User Store', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance and make it active for each test
    setActivePinia(createPinia())
  })

  it('initial state is correct', () => {
    const store = useUserStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.username).toBeNull()
  })

  it('login action updates state correctly', () => {
    const store = useUserStore()
    const testUsername = 'testUser123'
    store.login(testUsername)
    expect(store.isAuthenticated).toBe(true)
    expect(store.username).toBe(testUsername)
  })

  it('logout action updates state correctly', () => {
    const store = useUserStore()
    const testUsername = 'testUser123'

    // First login
    store.login(testUsername)
    expect(store.isAuthenticated).toBe(true)
    expect(store.username).toBe(testUsername)

    // Then logout
    store.logout()
    expect(store.isAuthenticated).toBe(false)
    expect(store.username).toBeNull()
  })

  describe('welcomeMessage getter', () => {
    it('returns "Please log in." when not authenticated', () => {
      const store = useUserStore()
      expect(store.welcomeMessage).toBe('Please log in.')
    })

    it('returns "Hello, [username]!" when authenticated', () => {
      const store = useUserStore()
      const testUsername = 'Alice'
      store.login(testUsername)
      expect(store.welcomeMessage).toBe(`Hello, ${testUsername}!`)
    })

    it('returns "Please log in." after logout', () => {
      const store = useUserStore()
      store.login('Bob')
      store.logout()
      expect(store.welcomeMessage).toBe('Please log in.')
    })
  })
})
