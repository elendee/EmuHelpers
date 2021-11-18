class Model {

	constructor( init ){

		init = init || {}
		this.data = init.data || {}

	}

	hydrate( type, source, options ){ 
		// fill the model either from data / existing Model
		// or from an Emu Model DOM form

		const {
			overwrite,
		} = options

		switch( type ){
			case 'form':
				if( !source.classList.contains('emu-form') ){
					console.log('invalid form given to Model hydrate', )
				}
				if( overwrite ){
					for( const key in source.querySelector )
				}
				break;

			case 'data':
				break;

			default: 
				console.log('unrecognized Model hydrate: ', type )
				break;

		}
	}

	build_form(){

		const model = this
		const form = document.createElement('form')
		let input
		for( const key in model.data ){
			input = this.build_input( model.data[ key ] )
			form.appendChild( input )
		}
		form.addEventListener('submit', e => {
			e.preventDefault()
			model.onsubmit()
			.then( res => {
				model.submit()
			})
			.catch( err => {
				console.log( err )
			})
		})
		form.classList.add('emu-form')
		return form

	}

	build_input( model_data ){ // build inputs for ^^ build_form()
		const type = (() => {
			switch( model_data.type ){
				case 'text': return ['input', 'text'];
				case 'number': return ['input', 'number'];
				case 'color': return ['input', 'color'];
				case 'range': return ['input', 'range'];
				case 'textarea': return ['textarea', ''];
				case 'select': return ['select', ''];
				default: {
					console.log('unrecognized input type: ', model_data )
					return ['input', 'text']
				}
			}
		})();

		const element = document.createElement( type[0] )
		if( type[1]) element.type = type[1]
		element.classList.add('', /* optional class */)
		return element
	}



	onsubmit(){ // form submit middleware 

		if( this.validate() ) return true

		throw new Error('failed to validate')

	}



}