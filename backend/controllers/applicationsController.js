const pool = require('../db/pool');

const getApplications = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY position ASC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createApplication = async (req, res) => {
  const { company, role, job_url, location, salary_min, salary_max, notes, applied_at } = req.body;
  try {
    const posResult = await pool.query(
      'SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM applications WHERE user_id = $1 AND status = $2',
      [req.user.id, 'saved']
    );
    const position = posResult.rows[0].next_pos;

    const result = await pool.query(
      `INSERT INTO applications 
        (user_id, company, role, job_url, location, salary_min, salary_max, notes, applied_at, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [req.user.id, company, role, job_url, location, salary_min, salary_max, notes, applied_at, position]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { company, role, job_url, location, salary_min, salary_max, notes, applied_at, status, position } = req.body;
  try {
    const result = await pool.query(
      `UPDATE applications SET
        company = COALESCE($1, company),
        role = COALESCE($2, role),
        job_url = COALESCE($3, job_url),
        location = COALESCE($4, location),
        salary_min = COALESCE($5, salary_min),
        salary_max = COALESCE($6, salary_max),
        notes = COALESCE($7, notes),
        applied_at = COALESCE($8, applied_at),
        status = COALESCE($9, status),
        position = COALESCE($10, position),
        updated_at = NOW()
       WHERE id = $11 AND user_id = $12
       RETURNING *`,
      [company, role, job_url, location, salary_min, salary_max, notes, applied_at, status, position, id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getApplications, createApplication, updateApplication, deleteApplication };