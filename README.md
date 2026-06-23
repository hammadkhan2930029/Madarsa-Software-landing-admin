# Madarsa Landing Backend

Express + MySQL CMS backend for the Madarsa landing page.

## Setup

1. Create a MySQL database:

```sql
CREATE DATABASE madarsa_landing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Configure `.env`.

3. Create tables:

```bash
npm run schema
```

4. Seed default admin and content:

```bash
npm run seed
```

Default admin:

```txt
email: admin@madarsa.com
password: 12345678
```

5. Start server:

```bash
npm run dev
```

## API

Public:

```txt
GET  /api/public/landing
POST /api/public/demo-requests
```

Auth:

```txt
POST /api/admin/auth/login
GET  /api/admin/auth/me
POST /api/admin/auth/logout
```

Protected CRUD:

```txt
/api/admin/hero
/api/admin/hero-images
/api/admin/nav-links
/api/admin/stats
/api/admin/slider-modules
/api/admin/features
/api/admin/demo-section
/api/admin/demo-requests
/api/admin/footer
/api/admin/contact-items
/api/admin/media
/api/admin/settings
```
