# Vercel Deployment Guide (Umar Madni Portfolio)

Is project me 2 folders hain, aur dono ko Vercel par **alag alag project** ki tarah deploy karna hai:

- `portfolio-backend`  -> API (Express + MongoDB)
- `portfolio-frontend` -> Website (React + Vite)

## 0. Pehle ye zaroor karo (Security)
Purani zip me `.env` file thi jisme MongoDB password aur Gmail App Password likha tha.
Wo ab expose ho chuke hain, isliye:
1. MongoDB Atlas -> Database Access -> user ka **password change** karo.
2. Google Account -> App Passwords -> purana password **delete** karke naya banao.
3. Naya `JWT_SECRET` aur naya `ADMIN_PASSWORD` rakho (kabhi bhi `.env` GitHub par push na karo).

## 1. MongoDB Atlas setting
Atlas -> Network Access -> **Add IP Address -> Allow access from anywhere (0.0.0.0/0)**.
(Vercel ke IPs fixed nahi hote, iske baghair backend connect nahi hoga.)

## 2. GitHub par push
Dono folders ko GitHub par push karo (2 repo ya 1 repo me 2 folders, dono chalega).

## 3. Backend deploy
Vercel -> Add New Project -> repo select -> **Root Directory = `portfolio-backend`** -> Framework: Other.
Environment Variables add karo (`.env.example` dekho):

| Name | Value |
|------|-------|
| MONGODB_URI | Atlas connection string |
| JWT_SECRET | lamba random string |
| ADMIN_EMAIL | admin ka email |
| ADMIN_PASSWORD | admin ka password |
| FRONTEND_URL | (abhi khali chhod do, step 5 me bharenge) |
| EMAIL_USER / EMAIL_PASS | optional (Gmail + App Password) |

Deploy karo. Test: `https://<backend>.vercel.app/api/health` -> `{"status":"OK"}` aana chahiye.

## 4. Frontend deploy
Naya Vercel project -> **Root Directory = `portfolio-frontend`** -> Framework: Vite.
Environment Variable:

| Name | Value |
|------|-------|
| VITE_API_URL | `https://<backend>.vercel.app/api` |

Deploy karo.

## 5. CORS finalize
Backend project -> Settings -> Environment Variables -> `FRONTEND_URL = https://<frontend>.vercel.app`
-> **Redeploy** (Deployments -> ... -> Redeploy).

## 6. Admin login
`https://<frontend>.vercel.app/admin/login` par ADMIN_EMAIL / ADMIN_PASSWORD se login karo.
Pehli request par admin aur 3 starting projects database me khud ban jate hain.

## Code me kya kya badla gaya
**Backend**
- `api/index.js` + `vercel.json` add (Vercel serverless entry).
- `server.js`: `app.listen` sirf local par; app export hoti hai; DB connection cached; CORS multiple URLs support.
- `config/db.js`: serverless-safe cached MongoDB connection (`process.exit` hata diya).
- Image upload: Vercel par disk me file save nahi hoti, isliye images ab MongoDB me save hoti hain
  (`models/Image.js`, `routes/images.js`, `middleware/upload.js`). Limit 4MB per image (Vercel limit).
- `middleware/auth.js`: double-response bug fix, deleted admin ka check.
- Default admin/project seeding `utils/defaultData.js` me; password console me print nahi hota.
- Contact form: optional email notification (`utils/mailer.js`).
- Invalid ID par 500 ki jagah 404.
- `.env` hata di, `.env.example` add. Faltu nested `Projects/` folder aur `uploads/` hata diye.

**Frontend**
- `vercel.json`: React Router refresh/direct link (404) fix.
- `services/api.js`: `VITE_API_URL` support; login galat password par page reload bug fix.
- `services/url.js`: images ka sahi URL (database wali + static wali).
- Purani images `public/uploads/` me (seeded projects ke liye).
- CV file ka naam `Umar-Madni-CV.pdf` kiya (spaces/double .pdf hata diye).
- `favicon` ka broken link fix, `dist/` hata diya (Vercel khud build karta hai).

## Local run
```
cd portfolio-backend && cp .env.example .env && npm install && npm run dev
cd portfolio-frontend && npm install && npm run dev
```
