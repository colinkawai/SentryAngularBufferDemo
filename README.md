# Sentry Replay with Custom Feedback Form

Demonstrates implementing a custom feedback form with Sentry Session Replay in buffer mode.

## Quick Start

```bash
cd sentry-replay-demo
npm start
```

Open at `http://localhost:4200`

## Implementation

### 1. Initialize Sentry (src/main.ts)
```typescript
Sentry.init({
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});
```

### 2. Start Buffer on Page Load (src/app/app.ts)
```typescript
ngOnInit() {
  const replay = Sentry.getClient()?.getIntegrationByName('Replay');
  replay?.startBuffering();
}
```

### 3. Handle Feedback Submission (src/app/app.ts)
```typescript
async handleCustomFeedback() {
  await replay?.flush();
  Sentry.captureFeedback({
    message: this.customFeedbackMessage,
    name: 'Demo User',
    email: 'user@example.com',
  });
}
```

## How It Works

1. Buffer starts on page load
2. User actions recorded to memory
3. User submits feedback → Buffer flushed to Sentry
4. Sentry auto-attaches replay to feedback
5. Buffer continues for next feedback/error

## Viewing Results

Go to Sentry Dashboard:
- **User Feedback** → See feedback with attached replay
- **Replays** → See session by Session ID

## Notes

- Buffer runs continuously until page navigation
- Multiple feedbacks = one continuous replay session
- Errors also flush the same buffer (replaysOnErrorSampleRate: 1.0)
- Session stops when user leaves page

## Files

- `src/main.ts` - Sentry config
- `src/app/app.ts` - Implementation
- `src/app/app.html` - UI
