const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const now = moment().tz('Asia/Jerusalem');
  const defaultStart = now.format('YYYY-MM-DDTHH:mm');
  const defaultEnd = now.format('YYYY-MM-DDTHH:mm');
  res.render('index', { defaultStart, defaultEnd });
});

app.post('/generate', (req, res) => {
  const { startDate, startTime, endDate, endTime, title } = req.body;
  const start = moment.tz(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Jerusalem');
  const end = moment.tz(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Jerusalem');
  
  if (end.isBefore(start) || end.diff(start, 'minutes') < 1) {
    return res.status(400).send('End time must be at least one minute after start time.');
  }

  const params = new URLSearchParams({
    start: start.toISOString(),
    end: end.toISOString(),
    title: title
  });

  res.redirect(`/progress?${params.toString()}`);
});

app.get('/progress', (req, res) => {
  const { start, end, title } = req.query;
  res.render('progress', { start, end, title });
});

app.listen(port, () => {
  console.log(`Progress bar app listening at http://localhost:${port}`);
});