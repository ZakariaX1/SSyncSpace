# 5. Connecting Frontend & Backend

---

## ✨ Goal
Fetch backend data in frontend pages using `fetch` or `axios`.

---

### ⚙️ Example: Fetch Users
```tsx
'use client'
import { useEffect, useState } from 'react'

interface User {
  id: number
  username: string
  role: string
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.username} ({u.role})</li>)}
    </ul>
  )
}
```

---

### 🧩 Reference
| Concept | Notes |
|---------|-------|
| fetch | Built-in browser method |
| SWR | Optional for caching & revalidation |
| Environment vars | Use `.env.local` in Next.js for API URLs |
