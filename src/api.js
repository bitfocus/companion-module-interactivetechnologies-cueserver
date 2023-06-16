
const { InstanceStatus, UDPHelper } = require('@companion-module/base')

const Client = require('node-rest-client').Client;

module.exports = {
	init_http: function() {
		let self = this;
	
		self.updateStatus(InstanceStatus.Ok);
	},
	
	init_udp: function() {
		let self = this;
	
		if (self.udp !== undefined) {
			self.udp.destroy();
			delete self.udp;
		}
	
		self.updateStatus(InstanceStatus.Connecting);
	
		if (self.config.host !== undefined) {
			self.udp = new UDPHelper(self.config.host, 52737);
	
			self.udp.on('error', function (err) {
				self.log('error', 'Network error: ' + err.message);
			});
	
			self.udp.on('data', function () {
				//could do something here in the future with return data			
			});

			self.updateStatus(InstanceStatus.Ok);
		}
	},

	setupInterval: function() {
		let self = this;
	
		self.stopInterval();
	
		if (self.config.polling == true) {
			self.INTERVAL = setInterval(self.getState.bind(self), self.config.polling_rate);
			self.log('info', 'Starting Update Interval.');
		}
	},
	
	stopInterval: function() {
		let self = this;
	
		if (self.INTERVAL !== null) {
			self.log('info', 'Stopping Update Interval.');
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}
	},
	

	getState: function () {
		let self = this;

		if (self.config.protocol == 'http') {
			//get state via http
		}

		if (self.config.protocol == 'udp') {
			//get state via udp
		}
	},

	runCommand(cmd) {
		let self = this;

		if (cmd !== undefined) {
			if (self.config.verbose) {
				self.log('debug', 'Sending command: ' + cmd);
			}

			if (self.config.protocol == 'http') {
				let client = new Client();

				let url = 'http://' + self.config.host + ':80/exe.cgi?cmd=' + cmd;
				
				client.get(url, function (data, response) {
					//do something with the response
				})
				.on('error', function(error) {
					self.updateStatus(InstanceStatus.Error);
					self.log('error', 'Error Running Command: ' + error.toString());
					if (self.INTERVAL !== undefined) {
						self.log('debug', 'Stopping Polling...');
						self.stopPolling();
					}
				});
			}
		
			if (self.config.protocol == 'udp') {
				if (self.udp !== undefined ) {
					self.udp.send(cmd);
				}
			}
		}
	}
}