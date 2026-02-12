# ApiAuth - Frontend Developer Task Submission

This project is a strict implementation of the **API Integration & Authentication BRD**, submitted for the Full Stack Developer position. It simulates a secure, production-grade frontend application using React and public APIs.

## 🚀 Live Demo & Credentials
**[View on Vercel](#)** *[(https://api-integration-authentication-flow-mocked-nbd93fhme.vercel.app/)]*

| Role | Email | Password |
|---|---|---|
| **Demo User** | `summitkumawat888@gmail.com` | `Sumit@123` |

---

## 📋 BRD Coverage Matrix

This project fulfills **100% of the Functional & Non-Functional Requirements** specified in the task brief.

### 1. Functional Requirements
| ID | Requirement | Status | Implementation Details |
|---|---|---|---|
| **2.1** | **Login Screen** | Done | Custom UI with email/password validation. |
|  | *Authenticate using API* | Done | Integrated with `ReqRes` API (`/api/login`). |
|  | *Store Token* | Done | JWT stored in `localStorage` for session persistence. |
| **2.2** | **Protected Dashboard** | Done | Auto-redirects after login. |
|  | *Fetch Public API Data* | Done | Fetches User List from `JSONPlaceholder`. |
| **2.3** | **Route Protection** | Done | Higher-Order Component (`ProtectedRoute`) prevents unauthorized access. |
|  | *Unauth Redirect* | Done | Unauthenticated users are kicked to `/login`. |
| **2.4** | **Logout** | Done | Clears local storage & redirects to Login immediately. |

### 2. Error & Loading Handling (Section 3)
- **Loader**: Custom spinner displayed during all API network requests.
- **Error Handling**: Graceful UI for failures (e.g., "Network Error", "Invalid Credentials").
- **Retry Option**: "Try Again" button implemented on Dashboard for failed fetches.
- **User Messages**: Friendly toast/text messages for all user interactions.

### 3. Non-Functional Requirements (Section 4)
- **Separation of Concerns**: Architecture split into `pages/`, `components/`, `services/`, and `context/`.
- **Predictable State**: Managed via React Context API (`AuthContext`) for global truth.
- **Tech Stack**: React + Vite + Axios (as per constraints).

### 4. Bonus Features (Section 7)
- **Axios Interceptors**: Implemented for auto-injecting `Bearer` tokens & handling 401s.
- **Environment Config**: API URLs configured via `.env` (`VITE_AUTH_API_URL`).
- **Token Expiry**: Basic handling via interceptors (redirects to login on 401).

---

## 🛠 Project Architecture

```
src/
├── components/       # Reusable UI (Layout, Loader, Button, Input)
├── context/         # AuthContext (Global User State)
├── services/        # Centralized Axios Instance with Interceptors
├── pages/           # Login & Dashboard Views
├── routes/          # Protected Route Guards
└── index.css        # Modern CSS (Glassmorphism, Grid, Variables)
```

---

## 🏃‍♂️ How to Run Locally

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd api-integration-app
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root:
   ```env
   VITE_AUTH_API_URL=https://reqres.in/api
   VITE_DATA_API_URL=https://jsonplaceholder.typicode.com
   ```

3. **Start App**
   ```bash
   npm run dev
   ```

---

## 👨‍� Developer Notes
- **Design Philosophy**: Used a "Glassmorphism" aesthetic to demonstrate modern UI capabilities while keeping the layout responsive and accessible.
- **Realistic Data Layer**: While using `JSONPlaceholder` (which provides dummy data), I added a transformation layer to display **realistic Indian profiles** (Names, Companies, Cities) to make the dashboard feel like a real production app.

**Submitted by Sumit Kumawat**
