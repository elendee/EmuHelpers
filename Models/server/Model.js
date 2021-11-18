
class Model {

	constructor( init ){

		init = init || {}

	}


	async update(){ // the Create and Update in CRUD

		// write your own db persistence method here

	}


	publish( ...exceptions ){  // essentially the Read in CRUD

		return Object.assign( {}, this )

		// // Following is an example publish() that assumes private fields are marked with an underscore: "_private"
		// // Be careful when you mutate your response object that you are not mutating your actual object as well

		// exceptions = exceptions || []

		// let r = {}

		// for( const key of Object.keys( this )){

		// 	if( ( typeof( key ) === 'string' && key[0] !== '_' ) || exceptions.includes( key ) ){
		// 		if( this[ key ] && typeof this[ key ].publish === 'function' ){
		// 			r[ key ] = this[ key ].publish()
		// 		}else{
		// 			r[ key ] = this[ key ]
		// 		}
		// 	}

		// }

		// return r

	}


}

module.exports = Model

