const DB = require('./db.js')
const log = require('./log.js')


let settings = false


const get = key => {
	if( !settings ){
		log('flag', 'settings not yet initialized', key )
		return
	}
	return settings[ key ]
}

const set = async( key, value ) => {
	const setting = new Setting({
		key: key,
		value: value,
	})
	const {id} = await setting.save()
	if( id ){
		log('flag', 'new setting inserted:', key, value )
	}
}


const init = async() => {
	const pool = DB.getPool()
	const sql = 'SELECT * FROM settings WHERE 1'
	const res = await pool.queryPromise( sql )
	if( res.error ) throw new Error('settings init error: ', res.error )
	settings = {}
	for( const result of res.results ){
		settings[ result.key  ] = result.value
	}
}


module.exports = {
	get,
	set,
	init
}