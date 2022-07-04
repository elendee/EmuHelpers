import {
	WebGLRenderer,
	sRGBEncoding,
	// PCFSoftShadowMap,
} from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js"
import CAMERA from './CAMERA.js'



const set_renderer = window.set_renderer = ( r, init ) => {
	// if( !init ) return false
	// console.log('set renderer: ', GLOBAL.RENDER.RES_KEY )
	r.setSize( 
		window.innerWidth / ( init ? 4 : GLOBAL.RENDER.RESOLUTIONS[ GLOBAL.RENDER.RES_KEY ] ), 
		window.innerHeight / ( init ? 4 : GLOBAL.RENDER.RESOLUTIONS[ GLOBAL.RENDER.RES_KEY ] ), 
		false 
	)
}

const renderer = new WebGLRenderer( { 
	antialias: true,
	alpha: true
} )

renderer.outputEncoding = sRGBEncoding

renderer.setPixelRatio( window.devicePixelRatio )
set_renderer( renderer, true )


renderer.shadowMap.enabled = true
// renderer.shadowMap.type = PCFSoftShadowMap

renderer.domElement.id = 'emu-canvas'
renderer.domElement.tabindex = 1

renderer.onWindowResize = function(){

	CAMERA.aspect = window.innerWidth / window.innerHeight
	CAMERA.updateProjectionMatrix()

	set_renderer( renderer )

}

window.addEventListener( 'resize', renderer.onWindowResize, false )

// renderer.physicallyCorrectLights = true //accurate lighting that uses the SI unit

// console.log('disabling renderer logs to prevent shader warnings in Firefox')
// renderer.context.getShaderInfoLog = function () { return '' }
// renderer.getContext.getShaderInfoLog = function () { return '' }

document.body.appendChild( renderer.domElement )

export default renderer


