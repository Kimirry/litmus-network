const db = require('../db');  // assuming your controller is in controllers/

// GET all packages
exports.getAllPackages = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM packages ORDER BY price ASC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET single package by ID
exports.getPackageById = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM packages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// CREATE a new package
exports.createPackage = async (req, res) => {
  const { name, price, duration_value, duration_unit, description } = req.body;

  if (!name || !price || !duration_value || !duration_unit) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO packages (name, price, duration_value, duration_unit, description) VALUES (?, ?, ?, ?, ?)',
      [name, price, duration_value, duration_unit, description || null]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      price,
      duration_value,
      duration_unit,
      description,
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE package by ID
exports.updatePackage = async (req, res) => {
  const { name, price, duration_value, duration_unit, description } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE packages SET name = ?, price = ?, duration_value = ?, duration_unit = ?, description = ? WHERE id = ?',
      [name, price, duration_value, duration_unit, description || null, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json({ message: 'Package updated successfully' });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE package by ID
exports.deletePackage = async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM packages WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

