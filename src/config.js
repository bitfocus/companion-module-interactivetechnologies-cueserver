const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		let self = this;

		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls Interactive Technologies CueServer. See the HELP file for more information and how to get started.',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				regex: Regex.IP
			},
			{
				type: 'dropdown',
				id: 'protocol',
				label: 'Protocol',
				default: 'http',
				choices:  [
					{ id: 'http', label: 'HTTP (Port 80)' },
					{ id: 'udp', label: 'UDP (Port 52737)' }
				]
			},
			{
				type: 'static-text',
				id: 'info2',
				label: 'Verbose Logging',
				width: 12,
				value: `
					<div class="alert alert-info">
						Enabling this option will put more detail in the log, which can be useful for troubleshooting purposes.
					</div>
				`
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 12
			},
		]
	}
}