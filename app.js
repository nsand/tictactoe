'use strict';
const koa = require('koa'),
	send = require('koa-send');

const server = koa();

server.use(function *() {
	if (this.path === '/tictactoe.js') {
		yield send(this, 'tictactoe.min.js');
	}
	else if (this.path === '/'){
		yield send(this, 'index.html');
	}
});

server.listen(process.env.VCAP_APP_PORT || 3001);