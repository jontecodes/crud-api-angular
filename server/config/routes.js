// require controllers
var tasks = require('../controllers/tasks');

module.exports = function(app){
    app.get('/tasks', (req, res) => {
        tasks.index(req, res);
    })
    app.get('/tasks/:id', (req, res) => {
        tasks.task(req, res);
    })
    app.post('/create', (req, res) => {
        console.log(req.body);
        tasks.create(req, res);
    })
    app.put('/tasks/edit/:id', (req, res) => {
        tasks.update(req, res);
    })
    app.delete('/tasks/:id', (req, res) => {
        tasks.delete(req, res);
    })
}