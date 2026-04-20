# SSyncSpace Implementation Guide: Learning Path

This guide maps out the high-priority fixes you should implement yourself. Each section has hints left in the code; search for `TODO:` comments.

## Routing Baseline (Locked In)

- Root space host: `yourapp.com` (no `root.` subdomain)
- Discord space host: `discord.yourapp.com`
- Islam space host: `islam.yourapp.com`
- API shape for all spaces: `/api/...`
- Space is inferred from host, so do not duplicate it in the path (`/api/discord/...` is omitted).

---

## Phase 1: Authentication Security (Highest Priority)

### 1.1 OAuth State Parameter (CSRF Protection)
**Goal**: Prevent login CSRF attacks by validating OAuth state round-trip.

**Files with hints**:
- `frontend/src/spaces/discord/pages/Login.tsx` — Generate and store state
- `frontend/src/spaces/discord/pages/OAUTH2Callback.tsx` — Validate state matches

**What to learn**:
- Random string generation (crypto.getRandomValues)
- SessionStorage for temporary client-side state
- URL parameter parsing (URLSearchParams)

**Why it matters**: Without state, a malicious link can trick you into logging into an attacker's account.

---

### 1.2 Refresh Token Architecture (Cookie-Based)
**Goal**: Fix refresh token flow to use HttpOnly cookies safely.

**Files with hints**:
- `backend/src/spaces/discord/routes.ts` — lines ~136 onwards

**What to learn**:
- Why HttpOnly cookies are safer than body tokens
- How Express/browser handle cookies automatically
- Difference between access token (short-lived) and refresh token (long-lived)

**Current broken design**:
```
Backend sets: HttpOnly refresh cookie (browser can't read JS)
Frontend tries: Sending refreshToken in request body
Reality: Frontend can't pass body token because browser secure-locked it
Result: Refresh endpoint unused, tokens expire silently
```

**New design**:
```
Frontend calls: POST /auth/refresh (no body)
Browser auto-sends: HttpOnly refresh cookie
Backend validates: JWT signature + checks rotation table
Backend returns: New access + refresh tokens as HttpOnly cookies
```

**Why it matters**: Session management is the root of auth security.

---

### 1.3 Token Rotation + Reuse Detection
**Goal**: Detect and block stolen refresh tokens.

**Files with hints**:
- `backend/src/spaces/discord/routes.ts` — line ~206 TODO

**What to learn**:
- JWT claims (jti = unique token ID)
- Token families (grouping rotated tokens from same login)
- Breach detection logic (if old family token reused, revoke all)

**Design**:
- Add table: `RefreshTokenRotation { jti, family, userId, issuedAt, expiresAt, revokedAt }`
- On refresh: mark old jti as revoked, issue new jti under same family
- On reuse attempt: detect old family ID is invalid, revoke entire family

**Why it matters**: If an attacker steals yesterday's token, you want to know immediately when they try to use it.

---

## Phase 2: Data Contracts (Medium Priority)

### 2.1 DTO Pattern: Event Status
**Goal**: Normalize event status between database (enum) and frontend (string).

**Files with hints**:
- `frontend/src/spaces/discord/types/events.ts` — full explanation
- `backend/src/spaces/discord/routes.ts` — needs mapper function

**What to learn**:
- Why databases use enums (strict, small storage)
- Why frontends use string unions (flexibility, serialization)
- Mapper function pattern (Prisma model → JSON DTO)

**Problem**:
```
Prisma: enum EventStatus { PERMISSION_PENDING, SCHEDULED, ONGOING, COMPLETED, CANCELLED }
Frontend expects: { status: 'pending' | 'scheduled' | ... }
UI code: event.status === 'scheduled' (works if you return uppercase SCHEDULED)
```

**Solution**:
```typescript
// Backend: Create mapper
function eventToDTO(event: DiscordEvents): EventDTO {
  return {
    ...event,
    date: event.scheduledFor.toISOString(),
    status: event.status.toLowerCase() // SCHEDULED → scheduled
  };
}

// API endpoint: Return DTO, not model
app.get('/events/:id', (req, res) => {
  const event = await prisma.discordEvents.findUnique(...);
  res.json(eventToDTO(event));  // ← Always use mapper
});
```

**Why it matters**: Prevents bugs where UI assumes lowercase but DB sends uppercase.

---

### 2.2 Handle Discord-Only Users (Null globalName)
**Goal**: Gracefully handle users who never set a display name.

**Files with hints**:
- `backend/src/spaces/discord/routes.ts` — lines ~68 and ~190

**What to learn**:
- Nullable fields in APIs (optional vs required)
- Fallback logic (if primary not available, use secondary)

**Problem**:
```
Prisma schema: globalName String (NOT NULL)
Discord API might return: { ..., global_name: null, username: "zakariax" }
Result: upsert fails trying to insert null into non-null field
```

**Solution**:
```typescript
// Always provide a fallback
globalName: discordUserData.global_name || discordUserData.username || `User-${discordUserData.id.slice(-4)}`
```

**Why it matters**: Prevents crashes on edge cases in third-party APIs.

---

## Phase 3: Frontend Quality (Medium Priority)

### 3.1 Fix React Hooks Violation
**Goal**: Move hook to unconditional position.

**Files with hints**:
- `frontend/src/spaces/discord/pages/Guild/Events.tsx` — top of file

**What to learn**:
- Rules of Hooks (always call in same order)
- Why early returns are OK, but conditional hook calls are not

**Problem**:
```typescript
function Events() {
  const { guildId } = useParams();
  if (!guildId) return <div>...</div>;  // ← Early return
  
  const { data } = useApi(...);  // ← Hook AFTER return: violates rules!
}
```

**Solution**:
```typescript
function Events() {
  const { guildId } = useParams();
  
  const { data } = useApi(...);  // ← ALWAYS called (before any returns)
  
  if (!guildId) return <div>...</div>;  // ← Early return happens after hook
}
```

**Why it matters**: React relies on hook call order; violating it causes memory leaks and state corruption.

---

### 3.2 Remove Console Logging of Identity Data
**Goal**: Clean up debug logs from production paths.

**Files with hints**:
- `frontend/src/spaces/discord/context/UserContext.tsx` — line ~22

**What to learn**:
- Why logged user data can leak in production
- When/where logging is safe (errors.ts for audit trail, not identity)

---

## Phase 4: Authorization (Lower Priority, But Important)

### 4.1 Implement Role-Based Access Control
**Goal**: Enforce guild member roles before sensitive operations.

**Files with hints**:
- `backend/src/middleware/roleMiddleware.ts` — empty file with full spec

**What to learn**:
- Express middleware pattern (req, res, next)
- Role hierarchy (MEMBER < EVENT_TEAM < EVENT_LEAD < ADMIN)
- Database query to fetch user's guild roles

**Endpoints to protect**:
- `POST /api/guilds/:guildId/events` → requires EVENT_TEAM
- `PUT /api/events/:eventId` → requires EVENT_LEAD
- `DELETE /api/events/:eventId` → requires ADMIN

---

## Implementation Order (Recommended)

1. **Start with OAuth state** (1.1) — ~1 hour, high security gain, smallest scope
2. **Fix Events hook** (3.1) — ~30 min, unblocks other component work
3. **Implement event DTO mapper** (2.1) — ~2 hours, touches backend + tests
4. **Discord-only users fallback** (2.2) — ~1 hour, small but critical
5. **Remove console logs** (3.2) — ~15 min, cleanup
6. **Redesign refresh flow** (1.2) — ~3 hours, medium complexity, essential for production
7. **Add token rotation** (1.3) — ~4 hours, complex but highest security ROI
8. **Implement role middleware** (4.1) — ~3 hours, needed for feature launch

---

## Checking Your Work

After each phase, verify:
1. **Lint passes**: `npm run lint` in frontend
2. **Types check**: `npm run build` in backend + frontend
3. **Tests cover new logic**: add tests for auth flows, DTO mappers
4. **No TODO comments remain** in the specific functionality area

---

## Key Patterns to Internalize

### DTO (Data Transfer Object)
```typescript
// Database layer (Prisma)
model Event {
  scheduledFor: DateTime
  approvalStatus: ApprovalStatus
}

// Transfer layer (API endpoint)
interface EventDTO {
  date: string
  approvalStatus: 'pending' | 'approved' | 'denied'
}

// Frontend layer (React component)
const event: EventDTO = await fetch('/api/event');
```

### Token Flow (Secure Version)
```
1. User logs in → Backend generates access + refresh token pair
2. Backend sets refresh token as HttpOnly cookie (JS can't access)
3. Frontend stores access token in memory or sessionStorage (for convenience)
4. On API call: send access token in Authorization header
5. When access expires: browser auto-sends refresh cookie, gets new pair
6. On new pair: old refresh token marked as used, new one issued (rotation)
```

### Middleware Pattern
```typescript
export function requireRole(minRole: string) {
  return async (req: AuthenticatedRequest, res, next) => {
    // 1. Extract info from req (user ID from JWT, guild ID from params)
    // 2. Query database (user's roles in this guild)
    // 3. Compare (user role >= minRole?)
    // 4. Call next() if allowed, or res.status(403).json(...) if denied
  };
}

// Usage:
app.delete('/events/:eventId', requireRole('EVENT_LEAD'), deleteEventHandler);
```

---

Good luck! These are real production patterns. Implementing them yourself means you'll truly understand auth, data contracts, and middleware — foundation skills for any backend/full-stack engineer.
