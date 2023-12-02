const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Öğrenci listesini getir
router.get('/students', controller.getStudents);

// Yeni öğrenci ekle
router.post('/students', controller.addStudent);

// Belirli bir öğrenciyi güncelle
router.put('/students/:id', controller.updateStudent);

// Belirli bir öğrenciyi sil
router.delete('/students/:id', controller.deleteStudent);

// Öğrenci arama
router.get('/students/search', controller.searchStudents);

module.exports = router;
