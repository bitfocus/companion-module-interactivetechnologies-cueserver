module.exports = [
	function update_v2_0_1(context, props) {
		const updatedActions = []

		for (const action of props.actions) {
			if (action.actionId === 'cuescript') {

				const cmdString = `cmd=${action.options.script}`
				const searchParams = new URLSearchParams(cmdString);
				const cmd = searchParams.get('cmd')
				action.options.script = cmd

			  	updatedActions.push(action)
			} else if (action.actionId === 'audio') {
				const str = action.options.audiofile
				const firstChar = (typeof str === 'string' && str.length > 0) ? str.charAt(0) : null
				const lastChar = (typeof str === 'string' && str.length > 0) ? str.charAt(str.length - 1) : null
				const isQuoted = firstChar === '"' && lastChar === '"'
				if (isQuoted) {
					action.options.audiofile = str.substring(1, str.length - 1)
					updatedActions.push(action)
				}
			}
		  }
		console.log('Actions updated to v2.0.1')

		return {
			updatedConfig: null,
			updatedActions,
			updatedFeedbacks: [],
		}
	},
]