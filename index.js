const server = require('./server.js');

 server.listen(process.env.PORT || 9090, () => {
     console.log('Server running on port 9090')
 });