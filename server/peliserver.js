require('dotenv').config()
const axios = require('axios');

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: "uploads/" });

var express = require('express');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: false,
    timezone: '+00:00'
}


app.get('/subjects', async (req, res) => {
    try {
        const connection = await mysql.createConnection(conf);

        const result = await connection.execute("SELECT DISTINCT question_subject as questionSubject FROM question");

        res.json(result[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/questions/:questionSubject', async (req, res) => {
    const { questionSubject } = req.params;

    try {
        const connection = await mysql.createConnection(conf);

        let result;

        if (questionSubject) {
            // Hakee kysymykset tietylle aiheelle
            result = await connection.execute("SELECT id questionId, question_subject questionSubject, question_text questionText, question_answer questionAnswer FROM question WHERE question_subject = ?", [questionSubject]);

            // Tarkista löytyykö kysymyksiä
            if (result[0].length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'No questions found for the selected subject.' });
            }
        } else {
            // Hakee kaikki kysymykset jos aihe ei löydy
            result = await connection.execute("SELECT id questionId, question_subject questionSubject, question_text questionText, question_answer questionAnswer FROM question");
            res.json(result[0]);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
