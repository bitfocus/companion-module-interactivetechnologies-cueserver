module.exports = {
	initActions: function () {
		let self = this;
		let actions = {};

		actions.cuescript = {
			name: 'CueScript',
			options: [
				{
					type: 'textinput',
					label: 'Custom Cue Script',
					id: 'script',
					default: '',
					tooltip: 'You can enter a custom CueScript here.'
				}
			],
			callback: async function (action) {
				self.runCommand(action.options.script);
			}
		}
		
		actions.audio = {
			name: 'Audio',
			options: [
				{
					type: 'textinput',
					label: 'Audio File to Play',
					id: 'audiofile',
					default: '',
					tooltip: 'Type in an audio file name for the CueServer to play out.'
				}
			],
			callback: async function (action) {
				self.runCommand('Audio ' + action.options.audiofile);
			}
		}
		
		actions.audiostop = {
			name: 'Audio Stop',
			options: [],
			callback: async function (action) {
				self.runCommand('Audio Stop');
			}
		}
		
		actions.cue = {
			name: 'Cue',
			options: [
				{
					type:   'textinput',
					label:  'Cue Number',
					id:     'cuenumber',
					default: '1',
					regex: '/^[0-999]$/'
				}
			],
			callback: async function (action) {
				self.runCommand('Cue ' + action.options.cuenumber);
			}
		}
		
		actions.macro = {
			name: 'Macro',
			options: [
				{
					type: 'textinput',
					label: 'Macro Number',
					id: 'macronumber',
					default: '1',
					regex: '/^[0-999]$/'
				}
			],
			callback: async function (action) {
				self.runCommand('Macro ' + action.options.macronumber);
			}
		}
		
		actions.playback = {
			name: 'Playback',
			options: [
				{
					type: 'textinput',
					label: 'Playback Number',
					id: 'playbacknumber',
					default: '1',
					regex: '/^[0-999]$/'
				}
			],
			callback: async function (action) {
				self.runCommand('Playback ' + action.options.playbacknumber);
			}
		}
		
		actions.reboot = {
			name: 'Reboot',
			options: [],
			callback: async function (action) {
				self.runCommand('Reboot');
			}
		}

		self.setActionDefinitions(actions);
	}
}