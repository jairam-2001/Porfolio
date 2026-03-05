
# Portfolio (Frontend + Backend Contact API)

This project now has:
- `Vite + React` frontend
- `Express` backend API for contact form email delivery to Gmail

## 1. Setup

1. Install dependencies:
```bash
npm install
```
2. Create your env file:
```bash
cp .env.example .env
```
3. Update Gmail credentials in `server/index.cjs`:
- `user: "yourgmail@gmail.com"`
- `pass: "your_app_password"`
- `to: "yourgmail@gmail.com"`

## 2. Run Locally

Run frontend + backend together:
```bash
npm run dev:full
```

Or run separately:
```bash
npm run dev:web
npm run dev:api
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## 3. Contact API

Endpoint:
```http
POST /send-mail
Content-Type: application/json
```

Body:
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "message": "Hello!"
}
```
## 4. Push Full Project To GitHub

If this folder is not a git repo yet:
```bash
git init
git add .
git commit -m "Add backend email API and contact form integration"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If repo already exists:
```bash
git add .
git commit -m "Add backend email API and contact form integration"
git push
```
  
