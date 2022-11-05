const express = require('express');
const bodyParser = require('body-parser');

const { readFileSync, writeFileSync } = require('fs');

const { resolve } = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 跨域设置
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});

const duration = JSON.parse(readFileSync(resolve(__dirname, 'data/duration.json'), 'utf8'));
const teacher = JSON.parse(readFileSync(resolve(__dirname, 'data/teacher.json'), 'utf8'));
const course = JSON.parse(readFileSync(resolve(__dirname, 'data/course.json'), 'utf8'));

app.get('/initial_data', (req, res) => {
    const schedule = JSON.parse(readFileSync(resolve(__dirname, 'data/schedule.json'), 'utf8'));

    res.json({
        code: 0,
        msg: 'ok',
        data: {
            schedule,
            duration,
            teacher,
            course,
        },
    });
});

app.post('/update_schedule', (req, res) => {
    const { begin_time, weekday, course, teacher } = req.body.data;
    const schedule = JSON.parse(readFileSync(resolve(__dirname, 'data/schedule.json'), 'utf8'));
    const item = schedule.find(item => item.begin_time == begin_time && item.weekday == weekday);

    let type = '';
    let result = null;

    if (item) {
        item.course = course;
        item.teacher = teacher;
        result = item;
        type = 'EDIT';
    } else {
        let lastId = schedule[schedule.length - 1] ? schedule[schedule.length - 1].id : 1;
        const newData = {
            id: lastId++,
            begin_time,
            weekday: +weekday,
            course,
            teacher,
        };

        schedule.push(newData);
        result = newData;
        type = 'ADD';
    }

    writeFileSync(resolve(__dirname, 'data/schedule.json'), JSON.stringify(schedule));

    res.json({
        code: 0,
        msg: 'ok',
        data: {
            type,
            result,
        },
    });
});

app.post('/remove_schedule', (req, res) => {
    const id = req.body.id;
    const schedule = JSON.parse(readFileSync(resolve(__dirname, 'data/schedule.json'), 'utf8'));

    const newSchedule = schedule.filter(item => item.id != id);
    writeFileSync(resolve(__dirname, 'data/schedule.json'), JSON.stringify(newSchedule));
    res.json({
        code: 0,
        msg: 'ok',
        data: {
            type: 'REMOVE',
            id,
        },
    });
});

app.listen(3000, () => {
    console.log('ok');
});
