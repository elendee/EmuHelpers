/*
	fill a localStorage object for easy authentication
	it's up to the app to make use of the localStorage object
	object will be of format:
	localStorage[ 'string' ] {
		[ type ]: {
			[ user ]: 'string',
			[ password ]: 'string',
		}.
		[ type ]: {
			[ user ]: 'string',
			[ password ]: 'string',
		}
	}

	help:
	examine public methods of window.EMU_AUTH 

*/

if( !window.EMU_AUTH  ){

	window.EMU_AUTH = {

		_CONFIG: {},

		_CREDS: {},

		configure: ( id_string, user_field, pw_field ) => {
			/*
				run this one time and it will be saved in localStorage
				set() is all you need after this
			*/

			EMU_AUTH._CONFIG.id_string = id_string
			EMU_AUTH._CONFIG.user_field = user_field
			EMU_AUTH._CONFIG.pw_field = pw_field

			EMU_AUTH._save()

		},

		_save: () => {
			/*
				persist SELF to localStorage ( not the local credential object )
			*/

			localStorage.setItem( 'emu_auth', JSON.stringify({
				_CREDS: EMU_AUTH._CREDS,
				_CONFIG: EMU_AUTH._CONFIG,
			}))

		},

		_onpageload: () => {
			/*
				fills config vars
			*/

			try{
				const existing = JSON.parse( localStorage.getItem('emu_auth') )
				EMU_AUTH._CONFIG = existing._CONFIG
			}catch( err ){
				console.log( err )
			}
			try{
				EMU_AUTH._CREDS = JSON.parse( localStorage.getItem( EMU_AUTH._CONFIG.id_string ) )
			}catch( err ){
				console.log( 'emu auth err creds', err )
			}

		},

		set: ( label, user, pw ) => {
			/*
				the basic function for adding new creds
				saves to localStorage[ _CONFIG.id_string ] ( NOT )
			*/

			if( !label ){
				console.log('label must be provided, ex: "admin", "standard", etc')
				return
			}

			if( !EMU_AUTH._CONFIG.user_field || !EMU_AUTH._CONFIG.pw_field || !EMU_AUTH._CONFIG.id_string ){
				console.log('missing config vars: ', EMU_AUTH )
				return
			}

			try{
				const local_auth = JSON.parse( localStorage.getItem( EMU_AUTH._CONFIG.id_string ) ) || {}
				local_auth[ label ] = local_auth[ label ] || {}
				const user_field = EMU_AUTH._CONFIG.user_field
				const pw_field = EMU_AUTH._CONFIG.pw_field
				user = user || local_auth[ label ][ user_field ]
				pw = pw || local_auth[ label ][ pw_field ]
				local_auth[ label ][ user_field ] = EMU_AUTH._CREDS[ label ][ user_field ] =  user
				local_auth[ label ][ pw_field ] = EMU_AUTH._CREDS[ label ][ pw_field ] = pw

				localStorage.setItem( EMU_AUTH._CONFIG.id_string, JSON.stringify( local_auth ))

			}catch( err ){
				console.log( err )
			}
		},

		print: () => {
			let users = ''
			for( const type in EMU_AUTH._CREDS ){
				users += `${ type }: ${ EMU_AUTH._CREDS[ type ][ EMU_AUTH._CONFIG.user_field ] } ${ EMU_AUTH._CREDS[ type ][ EMU_AUTH._CONFIG.pw_field ] }
`
			}
			const text = `
emu auth users:
${ users }
`
			console.log( text )
		}

	}

	// init
	EMU_AUTH._onpageload()

}

export default {}