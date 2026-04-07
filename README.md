## Kulgurusp Institute Website (Next.js)

SEO-friendly public website for your institute, connected to your backend APIs.

### Setup

- Create `website/.env.local` manually and add values from `ENV.example`
- Start backend on `http://localhost:5000`
- Start website on `http://localhost:3000`

### Run

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend APIs used

- `GET /api/banners` (homepage carousel)
- `GET /api/programs` and `GET /api/programs/:id`
- `GET /api/settings` (branding/contact)
- `GET /api/notifications` (notices)
- `POST /api/inquiries` (enroll/contact form)

