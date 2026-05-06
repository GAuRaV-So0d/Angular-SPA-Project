# AngularJS + Node.js JWT Authentication System

This is a beginner-friendly secure authentication demo using:

- AngularJS frontend
- Node.js + Express backend
- JWT authentication
- bcryptjs password hashing
- Bootstrap styling

## Folder Structure

```text
auth-system/
  backend/
    package.json
    server.js
    .env.example
  frontend/
    index.html
    app/
      app.js
      routes.js
      services/
        auth.service.js
        auth.interceptor.js
      controllers/
        nav.controller.js
        login.controller.js
        register.controller.js
        dashboard.controller.js
    templates/
      login.html
      register.html
      dashboard.html
    assets/
      css/
        styles.css
```

## Commands To Run

From the project root:

```bash
cd auth-system/backend
npm install
npm start
```

Open:

```text
http://localhost:3000
```

## Sample Test Credentials

```text
Email: demo@example.com
Password: password123
```

You can also register a new user from the Register page.

## API Endpoints

### POST `/api/register`

Request:

```json
{
  "name": "Gaurav",
  "email": "gaurav@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Registration successful.",
  "user": {
    "id": 2,
    "name": "Gaurav",
    "email": "gaurav@example.com"
  }
}
```

### POST `/api/login`

Request:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "demo@example.com"
  }
}
```

### GET `/api/dashboard`

Header:

```text
Authorization: Bearer jwt-token-here
```

Success response:

```json
{
  "success": true,
  "message": "Protected dashboard data loaded.",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "demo@example.com"
  },
  "stats": {
    "courses": 6,
    "attendance": "94%",
    "notifications": 3
  }
}
```

Unauthorized response:

```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

## Important Notes

- The frontend stores the JWT token in `localStorage`.
- `AuthInterceptor` attaches the token to API requests as `Authorization: Bearer <token>`.
- The dashboard route is protected on the frontend with AngularJS route `resolve`.
- The backend protects `/api/dashboard` with JWT verification middleware.
- This demo stores users in memory, so new registered users reset when the server restarts.
- For production, use HTTPS, a database, a strong `JWT_SECRET`, refresh-token strategy, rate limiting, and secure cookie storage where appropriate.
