require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./components/user/user.controller');
const classRouter = require('./components/classroom/class.controller');
const signUpRouter = require('./module/passport/signup.route');
const loginRouter = require('./module/passport/login.route');
const sendMailRoute = require('./components/sendmail/sendmail.controller');
const rTokenRouter = require('./module/auth.route');
const passport = require('./module/passport/index');
const joinclassRouter = require('./components/joinClass/joinClass.controller')
const gradeStructRouter = require('./components/gradeStruct/gradeStruct.controller');
const gradeClassRouter = require('./components/gradeClass/gradeClass.controller');
const notificationRouter = require('./components/notification/notification.controller');
const app = express();
app.use(passport.initialize());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', passport.authenticate('jwt', {session:false}), usersRouter);
app.use('/users', usersRouter);

app.use('/grade-struct', gradeStructRouter);
app.use('/gradeClass', gradeClassRouter);
app.use('/classes', classRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/join-class', joinclassRouter)
app.use('/refresh', rTokenRouter);
app.use('/invite', sendMailRoute);
app.use('/noti', notificationRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
