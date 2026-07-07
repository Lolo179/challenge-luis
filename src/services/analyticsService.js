// src/services/analyticsService.js
// Event tracking and tracing service for debugging and analytics

const SESSION_ID = crypto.randomUUID()
let events = []

export const analyticsService = {
  // Track a user action or system event
  track: (action, metadata = {}, options = {}) => {
    const event = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      action,
      component: options.component || 'Unknown',
      status: options.status || 'success',
      duration: options.duration || 0,
      data: metadata,
      error: options.error || null,
      url: window.location.pathname,
      userAgent: navigator.userAgent
    }

    events.push(event)

    // Console output in development
    if (import.meta.env.DEV) {
      const style = event.status === 'error' ? 'color: #ff6b6b; font-weight: bold;' : 'color: #51cf66; font-weight: bold;'
      console.log(
        `%c[${event.action}]%c ${event.duration > 0 ? `(${event.duration}ms)` : ''}`,
        style,
        'color: #666;'
      )
      if (Object.keys(metadata).length > 0) {
        console.table(metadata)
      }
    }

    // Send to backend in production
    if (import.meta.env.PROD) {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {}) // Fail silently
    }

    return event.id
  },

  // Track an error with context
  trackError: (action, error, context = {}) => {
    const errorEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      action: `${action}_error`,
      component: context.component || 'Unknown',
      status: 'error',
      data: context,
      error: {
        message: error.message || String(error),
        code: error.code || 'UNKNOWN',
        stack: error.stack || '',
        name: error.name || 'Error'
      },
      url: window.location.pathname
    }

    events.push(errorEvent)

    // Always log errors in console
    console.error(`%c[ERROR] ${action}`, 'color: #ff6b6b; font-weight: bold;', errorEvent)

    if (import.meta.env.PROD) {
      fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(errorEvent),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {})
    }

    return errorEvent.id
  },

  // Measure execution time of async operations
  measureAsync: async (action, asyncFn, metadata = {}) => {
    const startTime = performance.now()

    try {
      const result = await asyncFn()
      const duration = Math.round(performance.now() - startTime)

      analyticsService.track(`${action}_success`, metadata, {
        status: 'success',
        duration,
        component: metadata.component || 'Unknown'
      })

      return result
    } catch (error) {
      const duration = Math.round(performance.now() - startTime)
      analyticsService.trackError(action, error, {
        ...metadata,
        duration,
        component: metadata.component || 'Unknown'
      })
      throw error
    }
  },

  // Get all events (dev only)
  getEvents: () => {
    if (import.meta.env.DEV) {
      return events
    }
    return []
  },

  // Get events filtered by action
  getEventsByAction: (action) => {
    return events.filter(e => e.action.includes(action))
  },

  // Get slow events (duration > threshold)
  getSlowEvents: (thresholdMs = 500) => {
    return events.filter(e => e.duration > thresholdMs)
  },

  // Get error events
  getErrors: () => {
    return events.filter(e => e.status === 'error')
  },

  // Clear all events
  clearEvents: () => {
    events = []
  },

  // Get session ID
  getSessionId: () => SESSION_ID,

  // Export events as JSON for analysis
  exportEvents: () => {
    return JSON.stringify(events, null, 2)
  }
}

// Expose to window for console debugging
if (import.meta.env.DEV) {
  window.__analytics = analyticsService
  console.log('%c[ANALYTICS] Debug panel ready. Use window.__analytics in console', 'color: #51cf66; font-weight: bold;')
  console.log('Commands:')
  console.log('  window.__analytics.getEvents()           // All events')
  console.log('  window.__analytics.getErrors()           // Only errors')
  console.log('  window.__analytics.getSlowEvents(500)    // API calls > 500ms')
  console.log('  window.__analytics.getEventsByAction("add_to_cart")')
  console.log('  console.table(window.__analytics.getEvents())')
}
