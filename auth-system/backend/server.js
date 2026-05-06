const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// In production, always set JWT_SECRET in your environment.
const JWT_SECRET = process.env.JWT_SECRET || 'beginner-demo-secret-change-me';
const TOKEN_EXPIRES_IN = '1h';

// This demo uses an in-memory array to keep the code beginner-friendly.
// For real apps, store users in a database.
const users = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

// Middleware that protects private routes by verifying the JWT.
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = users.some((user) => user.email === normalizedEmail);

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    // bcrypt hashes the password so the plain password is never stored.
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash
    };

    users.push(user);

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.'
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find((item) => item.email === normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = createToken(user);

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login.'
    });
  }
});

app.get('/api/dashboard', verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: 'Protected dashboard data loaded.',
    user: req.user,
    stats: {
      courses: 6,
      attendance: '94%',
      notifications: 3
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running.' });
});

async function seedDemoUser() {
  const passwordHash = await bcrypt.hash('password123', 10);

  users.push({
    id: 1,
    name: 'Demo Student',
    email: 'demo@example.com',
    passwordHash
  });
}

seedDemoUser().then(() => {
  app.listen(PORT, () => {
    console.log(`Auth system running at http://localhost:${PORT}`);
    console.log('Sample login: demo@example.com / password123');
  });
});
