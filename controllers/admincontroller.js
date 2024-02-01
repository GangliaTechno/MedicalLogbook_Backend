// adminController.js
import Admin from '../models/admin.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Received credentials:', { email, password });

  try {
    // Find the admin with the provided email
    const admin = await Admin.findOne({ email });
    console.log(admin);

    if (admin && admin.comparePassword(password)) {
      // Passwords match, send a success message
      console.log('Admin successfully logged in');
      res.json({ message: 'Successfully logged in!' });
    } else {
      // Invalid credentials
      console.log('Invalid credentials:', { email, password });
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

