const pool = require('./db'); // PostgreSQL bağlantısı için db.js dosyasını içeri aktarın

const getStudents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    const students = result.rows;
    res.json({ success: true, students });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email, age, dob } = req.body;
    // E-postanın veritabanında var olup olmadığını kontrol et
    const emailCheckResult = await pool.query('SELECT * FROM students WHERE email = $1', [email]);

    if (emailCheckResult.rows.length > 0) {
      // Eğer e-posta zaten varsa hata döndür
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    const result = await pool.query(
      'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, age, dob]
    );
    const insertedStudent = result.rows[0];
    res.status(201).json({ success: true, student: insertedStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, age, dob } = req.body;
    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5 RETURNING *',
      [name, email, age, dob, id]
    );
    const updatedStudent = result.rows[0];
    res.json({ success: true, student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    const deletedStudent = result.rows[0];
    res.json({ success: true, student: deletedStudent });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const searchStudents = async (req, res) => {
    try {
      const { id, name, email, age, dob } = req.query;
  
      let queryString = 'SELECT * FROM students WHERE 1=1';
      const queryParams = [];
  
      // Filtreleme koşullarını oluştur
      if (id) {
        queryString += ' AND id = $1';
        queryParams.push(id);
      }
      if (name) {
        queryString += ' AND name ILIKE $2';
        queryParams.push(`%${name}%`);
      }
      if (email) {
        queryString += ' AND email ILIKE $3';
        queryParams.push(`%${email}%`);
      }
      if (age) {
        queryString += ' AND age = $4';
        queryParams.push(age);
      }
      if (dob) {
        queryString += ' AND dob = $5';
        queryParams.push(dob);
      }

      console.log('SQL Query:', queryString, 'Params:', queryParams);
  
      // Sorguyu çalıştır
      const result = await pool.query(queryString, queryParams);
  
      res.status(200).json({ success: true, students: result.rows });
    } catch (error) {
      console.error('Error searching students:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
};
