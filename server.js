const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom route for updating the entire tasks collection
server.put('/tasks', (req, res) => {
    const db = router.db; // Access lowdb instance
    db.set('tasks', req.body).write(); // Overwrite tasks in db.json
    res.status(200).send({ success: true });
});

server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on http://localhost:3001');
});