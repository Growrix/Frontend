# PART 8 — File Storage & Media

> **Scope**: Upload architecture, storage organization, access control for files, and processing pipelines.
>
> **Not covered here**: CDN configuration for static app assets (see STACK_PROFILES/devops/deployment-guidelines), image optimization for UI (see HandBook_Frontend responsive/images), general security headers (see STACK_PROFILES/security).

---

## 8.1 Upload Architecture

### Purpose

File uploads are one of the most common attack vectors and performance bottlenecks. A proper upload architecture keeps files off your application server and directly streams them to object storage.

### MUST Rules

1. **MUST use direct-to-storage uploads (presigned URL pattern).** The server generates a presigned upload URL; the client uploads directly to the bucket. Your server never proxies the file body.

```
Client                    Server                       Object Storage
  │                         │                               │
  │ ── Request upload URL ─▶│                               │
  │                         │ ── Generate presigned URL ───▶│
  │                         │◀── Return presigned URL ──── │
  │◀── Presigned URL ───── │                               │
  │                         │                               │
  │ ── PUT file directly ──────────────────────────────────▶│
  │◀── 200 OK ─────────────────────────────────────────────│
  │                         │                               │
  │ ── Confirm upload ────▶ │                               │
  │                         │ ── Verify file exists ───────▶│
  │                         │ ── Create file metadata ──── │(local DB)
  │◀── File record ─────── │                               │
```

2. **MUST enforce upload size limits.** Set a maximum file size per upload type in the presigned URL policy.

| Upload Type | Default Max Size |
|---|---|
| Avatar/profile image | 5 MB |
| Document attachment | 25 MB |
| Data import (CSV, JSON) | 50 MB |
| General file upload | 100 MB |

3. **MUST restrict allowed MIME types.** Only allow known-safe file types. Reject everything else at the presigned URL level and again at the confirmation step.

```typescript
const ALLOWED_TYPES: Record<string, string[]> = {
  avatar: ["image/jpeg", "image/png", "image/webp"],
  document: ["application/pdf", "image/jpeg", "image/png"],
  import: ["text/csv", "application/json"],
};
```

4. **MUST validate file content, not just the extension or declared MIME type.** After upload, verify the file's magic bytes match the declared type. Attackers rename `.exe` to `.jpg`.
5. **MUST implement virus/malware scanning for user-uploaded files.** Use a scanning service (ClamAV, or a cloud-native scanning service) on uploaded files before they become accessible. Quarantine files that fail scanning.
6. **MUST track upload progress on the client side.** Use `XMLHttpRequest.upload.onprogress` or equivalent for the direct PUT to show the user a progress indicator.

### MUST NOT Rules

1. **MUST NOT proxy file uploads through your application server.** This wastes memory, CPU, and creates a DoS vector.
2. **MUST NOT trust client-reported file metadata.** Always verify size, type, and content server-side.
3. **MUST NOT store uploaded files on the application server's local filesystem.** Use object storage (S3, R2, GCS).
4. **MUST NOT allow uploads without authentication.** Presigned URLs are generated only for authenticated users with the `tenantId` embedded in the upload path.

### Anti-Patterns

| Anti-Pattern | Why It Fails |
|---|---|
| **Server proxies file body** | Memory exhaustion on large files; blocks request capacity |
| **No size limit** | Users/attackers upload multi-GB files; storage costs explode |
| **Extension-only validation** | Attackers rename malicious files; security bypass |
| **Files on local disk** | Lost on redeploy; can't scale horizontally; no durability |

### Checklist

- [ ] Presigned URL upload pattern implemented
- [ ] Size limits enforced per upload type
- [ ] MIME type restrictions at presigned URL and confirmation
- [ ] Content validation (magic bytes) after upload
- [ ] Malware scanning before file is accessible
- [ ] Upload progress shown in client
- [ ] No server-side proxying of file bodies
- [ ] All uploads require authentication

---

## 8.2 Storage Organization

### Purpose

Files need a predictable, tenant-isolated path structure in object storage. Without it, you get filename collisions, cross-tenant access bugs, and expensive migrations.

### MUST Rules

1. **MUST organize files by tenant.** Every file path includes the tenant ID. No shared global directory.

```
{bucket}/
  {tenantId}/
    avatars/
      {userId}/{fileId}.{ext}
    documents/
      {projectId}/{fileId}.{ext}
    imports/
      {importId}/{fileId}.{ext}
    exports/
      {exportId}/{fileId}.{ext}
    temp/
      {fileId}.{ext}
```

2. **MUST generate unique file IDs.** Never use the original filename as the storage key. Generate a UUID or hash-based key. Store the original filename as metadata.
3. **MUST store file metadata in the database.**

```typescript
interface FileRecord {
  id: string;              // UUID
  tenantId: string;
  ownerId: string;         // User who uploaded
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;     // Full path in bucket
  accessLevel: "private" | "org" | "public";
  uploadedAt: string;
  scannedAt?: string;      // Virus scan timestamp
  scanResult?: "clean" | "quarantined";
}
```

4. **MUST implement lifecycle policies.**

| File Category | Lifecycle Rule |
|---|---|
| Temporary uploads (not confirmed within 24h) | Auto-delete after 24 hours |
| Exports (data export downloads) | Auto-delete after 7 days |
| Archived project files | Move to cold storage after 90 days |
| Deleted org files | Hard-delete after org grace period ends (see PART-03) |

### MUST NOT Rules

1. **MUST NOT use original filenames as storage keys.** Collisions, path traversal attacks, and encoding issues.
2. **MUST NOT store files for different tenants in the same directory prefix.** Tenant isolation in the path structure is defense-in-depth.

### Checklist

- [ ] All file paths include tenantId
- [ ] Unique file IDs (UUID) used as storage keys
- [ ] Original filename stored as metadata, not as storage key
- [ ] File metadata in database with all required fields
- [ ] Lifecycle policies for temp, export, archive, and deleted files

---

## 8.3 Access Control

### Purpose

Files often contain sensitive data. Access control determines who can read, download, or share files.

### MUST Rules

1. **MUST use signed URLs for private file access.** Never expose raw bucket URLs. Generate a signed URL with a short expiration for each access.

| Access Scenario | URL Expiration |
|---|---|
| Inline image display | 1 hour |
| Document download | 15 minutes |
| Export file download | 24 hours |

2. **MUST scope signed URLs to the requesting user's tenant.** Before generating a signed URL, verify the file belongs to the user's tenant.
3. **MUST separate public and private buckets.** Public assets (marketing images, public avatars) live in a public bucket with CDN. Private documents live in a private bucket with signed-URL-only access.
4. **MUST integrate CDN for public assets.** Serve public files through a CDN (CloudFront, Cloudflare) with appropriate cache headers.

### MUST NOT Rules

1. **MUST NOT generate signed URLs without tenant ownership verification.** A signed URL bypasses bucket-level auth; the verification must happen before generation.
2. **MUST NOT set long expirations on signed URLs for sensitive files.** Shorter = safer. Default: 15 minutes.
3. **MUST NOT expose bucket names or storage paths to clients.** The API returns signed URLs, not internal paths.

### Checklist

- [ ] Signed URLs used for all private file access
- [ ] Expiration set per access scenario
- [ ] Tenant ownership verified before URL generation
- [ ] Public and private buckets separated
- [ ] CDN serves public assets
- [ ] No bucket names or internal paths exposed to clients

---

## 8.4 Processing Pipelines

### Purpose

Uploaded files often need transformation: image resizing, thumbnail generation, document parsing, format conversion. This work must happen asynchronously.

### MUST Rules

1. **MUST process files asynchronously via job queue.** Upload → confirm → enqueue processing job → job transforms file → update metadata.
2. **MUST generate thumbnails for image uploads.** Standard sizes: 64px, 256px, 512px (adjust per product needs). Store thumbnails alongside the original.
3. **MUST implement processing failure handling.** If the processing job fails: retry (see PART-04), then mark the file as "processing_failed" and notify the user.
4. **MUST validate file content after processing.** Ensure the output file is valid (not corrupted, correct format, within size bounds).

### MUST NOT Rules

1. **MUST NOT process files synchronously in the upload flow.** Processing is slow and unpredictable; it blocks the user.
2. **MUST NOT delete the original file after processing.** Keep the original as source of truth; derived files (thumbnails, converted formats) are regenerable.

### Default Processing Flow

```
Upload confirmed
  → Enqueue ProcessFileJob(fileId, tenantId, processingType)
    → Job: Download file from storage
      → Apply transformation (resize, convert, parse)
        → Upload result(s) to storage
          → Update file metadata (processing status, thumbnail paths)
            → On failure: retry, then mark "processing_failed"
```

### Checklist

- [ ] File processing runs as background job
- [ ] Thumbnails generated for image uploads
- [ ] Processing failure handled (retry + user notification)
- [ ] Output validated after processing
- [ ] Original file preserved
