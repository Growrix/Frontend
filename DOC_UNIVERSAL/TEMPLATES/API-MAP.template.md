# API-MAP: [PROJECT NAME]

## Purpose

Single reference for server actions, endpoints, and mutation contracts.

## Endpoint Table

| Name | Method/Type | Path Or Action | Auth | Input | Success Output | Error Output | Side Effects |
|---|---|---|---|---|---|---|---|
| create-item | POST | `/api/items` | required | `CreateItemInput` | `ItemDto` | `ApiError` | creates item |
| update-profile | action | `updateProfileAction` | required | `UpdateProfileInput` | `ProfileDto` | `ActionError` | updates profile |

## Rules

- Every new endpoint or mutation must be added here.
- Contract changes must update this file in the same task.
- Error shapes should be explicit and stable.