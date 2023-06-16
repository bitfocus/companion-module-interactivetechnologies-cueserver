const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const api = require('./src/api')

class cueserverInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...api,
		})

		this.INTERVAL = null; //used to poll the device every second

		this.udp = null; //used for UDP communication
	}

	async destroy() {
		let self = this;

		if (self.INTERVAL) {
			clearInterval(self.INTERVAL);
			self.INTERVAL = null;
		}

		if (self.udp !== undefined) {
			self.udp.destroy();
		}
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		if (this.config.verbose) {
			this.log('info', 'Verbose mode enabled. Log entries will contain detailed information.');
		}
	
		this.updateStatus(InstanceStatus.Connecting);

		if (this.config.protocol == 'http') {
			this.init_http();
		}

		if (this.config.protocol == 'udp') {
			this.init_udp();
		}

		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();
	
		this.checkFeedbacks();
		this.checkVariables();
	}
}

runEntrypoint(cueserverInstance, UpgradeScripts);