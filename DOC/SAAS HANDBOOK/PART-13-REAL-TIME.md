# PART 13 — Real-Time & Collaboration

> **Scope**: Real-time transport selection, connection lifecycle, presence, live updates, and conflict resolution for collaborative features.
>
> **Not covered here**: In-app notification delivery mechanism (see PART-07 §7.3), general state management (see STACK_PROFILES/architecture/frontend-architecture), WebSocket security (see STACK_PROFILES/security/api-security).
>
> **Note**: This chapter applies only when your product needs real-time features (collaborative editing, live dashboards, presence indicators, chat). If your product is request-response only, skip this chapter.

---

## 13.1 Real-Time Transport

### Purpose

Real-time features require a persistent connection between client and server. The transport choice determines latency, complexity, scalability, and infrastructure cost.

### MUST Rules

1. **MUST choose transport based on actual requirements, not hype.**

| Transport | Latency | Direction | Complexity | Best For |
|---|---|---|---|---|
| **Polling** | High (interval-dependent) | Client → Server | Lowest | Low-frequency updates (notification counts, status checks). Start here. |
| **Long Polling** | Medium | Server → Client (initiated by client) | Low | Bridge: better than polling, simpler than SSE/WS |
| **Server-Sent Events (SSE)** | Low | Server → Client only | Medium | Live feeds, dashboard updates, notification streams |
| **WebSocket** | Lowest | Bidirectional | Highest | Chat, collaborative editing, interactive features |

**Decision heuristic:**
- Do you need updates less than every 30 seconds? → **Polling**
- Do you need server-push but not client-to-server? → **SSE**
- Do you need bidirectional real-time? → **WebSocket**

2. **MUST authenticate persistent connections.** WebSocket and SSE connections must authenticate on handshake. Do not allow unauthenticated persistent connections.

```typescript
// WebSocket authentication on connection
wss.on("connection", async (ws, req) => {
  const token = extractToken(req);  // from query param or cookie
  const user = await verifyToken(token);
  if (!user) {
    ws.close(4001, "Unauthorized");
    return;
  }
  ws.userId = user.id;
  ws.tenantId = user.tenantId;
});
```

3. **MUST implement connection lifecycle management.**

| Event | Handling |
|---|---|
| **Connect** | Authenticate, register in connection registry, send initial state |
| **Disconnect** | Clean up connection registry, update presence (if used) |
| **Reconnect** | Client auto-reconnects with exponential backoff; server sends missed events since last known event ID |
| **Heartbeat** | Client sends ping every 30 seconds; server responds with pong; close stale connections after 90 seconds of no heartbeat |

4. **MUST scope real-time channels by tenant.** A user in Tenant A must never receive events from Tenant B's channels.

```typescript
// Channel naming: always includes tenantId
const channel = `tenant:${tenantId}:project:${projectId}`;
```

5. **MUST support graceful degradation.** If the real-time connection fails, the UI must still work — it falls back to polling or shows a "live updates paused" indicator.

### MUST NOT Rules

1. **MUST NOT use WebSocket when SSE or polling suffices.** WebSocket adds operational complexity (sticky sessions, connection management, scale-out coordination). Use it only when you need bidirectional communication.
2. **MUST NOT send sensitive data over real-time channels without checking authorization.** Per-message authorization may be needed if channel membership changes dynamically.
3. **MUST NOT keep connections alive indefinitely without heartbeat.** Stale connections consume server resources.

### Scaling Considerations

| Scale | Approach |
|---|---|
| < 1,000 concurrent connections | Single server; in-memory connection registry |
| 1,000 - 50,000 | Redis Pub/Sub for cross-server event distribution |
| > 50,000 | Dedicated real-time infrastructure (Ably, Pusher, Liveblocks) or custom sharded WebSocket servers |

**Default recommendation**: Start with the simplest transport that works. Adopt a managed real-time service when you hit scaling limits rather than building custom infrastructure.

### Checklist

- [ ] Transport chosen based on actual requirements (not over-engineered)
- [ ] Connections authenticated on handshake
- [ ] Connection lifecycle: connect, disconnect, reconnect, heartbeat
- [ ] Channels scoped by tenantId
- [ ] Graceful degradation when connection fails
- [ ] Heartbeat interval set (30 seconds) with stale connection cleanup
- [ ] Scaling strategy documented for current and next growth stage

---

## 13.2 Presence & Live Updates

### Purpose

Presence shows who is currently active ("3 users viewing this document"). Live updates push data changes to all viewers in real-time. Both require careful design to avoid performance problems and data inconsistency.

### Presence

#### MUST Rules

1. **MUST model presence as a transient, server-managed state.** Presence is not stored in the primary database. It lives in-memory or in Redis with short TTL.

```typescript
interface PresenceEntry {
  userId: string;
  tenantId: string;
  resourceType: string;     // e.g., "project", "document"
  resourceId: string;
  status: "active" | "idle";
  lastSeenAt: string;        // ISO 8601
  // TTL: 60 seconds (auto-expire if no heartbeat)
}
```

2. **MUST update presence on heartbeat, not on every action.** Client sends presence heartbeat every 30 seconds. Server updates `lastSeenAt` and resets TTL.
3. **MUST remove presence on disconnect.** When a connection closes, immediately remove the user from presence for that resource.
4. **MUST handle "ghost presence" (stale entries).** If a heartbeat is missed (browser crash, network drop), the TTL expiration auto-cleans the entry. Max ghost duration: 60 seconds.

### Live Data Updates

#### MUST Rules

1. **MUST use the optimistic update → server confirmation pattern for user-initiated changes.**

```
User edits a field
  → UI updates immediately (optimistic)
    → Client sends update to server
      → Server validates and persists
        → Server broadcasts the change to all connected viewers
          → Other viewers update their UI
            → If server rejects: originator's UI rolls back
```

2. **MUST include a version or timestamp on every update to detect conflicts.**
3. **MUST define a conflict resolution strategy.**

| Strategy | How It Works | Best For |
|---|---|---|
| **Last-write-wins** | Most recent timestamp wins | Simple fields (name, status); low conflict risk |
| **Server-arbitrated merge** | Server compares both changes and merges non-conflicting fields | Form-like data with independent fields |
| **Operational Transform (OT)** | Transform concurrent operations to converge | Rich text, collaborative editors |
| **CRDT** | Conflict-free data types that merge automatically | Distributed systems, offline-capable apps |

**Default recommendation**: Last-write-wins for simple fields. Server-arbitrated merge for structured data. OT or CRDT only if you are building a collaborative editor.

4. **MUST rate-limit broadcast events.** If a user types quickly, don't broadcast every keystroke. Debounce or throttle broadcasts (e.g., max 10 updates/second per channel).

### MUST NOT Rules

1. **MUST NOT store presence in the primary database.** It's high-frequency, transient data; it will bloat your DB and slow queries.
2. **MUST NOT broadcast full entity on every change.** Send only the changed fields (delta) and the version.
3. **MUST NOT assume all clients are in sync.** Always include enough context (resource ID, version) for a client to reconcile.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Polling for presence** | High latency, high server load, bad UX |
| **Presence in PostgreSQL** | Write amplification, lock contention, wasted I/O |
| **Full entity on every broadcast** | Bandwidth waste, flickering UIs, merge complexity |
| **No conflict resolution** | Last write silently overwrites; users lose work |
| **Unbounded broadcast rate** | Network saturation; client render stalls |

### Checklist

- [ ] Presence stored in Redis/memory (not primary DB)
- [ ] Presence updates on heartbeat (30-second interval)
- [ ] Presence removed on disconnect
- [ ] Ghost presence auto-expires (60-second TTL)
- [ ] Optimistic update with server confirmation
- [ ] Conflict resolution strategy chosen and documented
- [ ] Broadcast events rate-limited/debounced
- [ ] Delta updates (not full entity) on broadcasts
