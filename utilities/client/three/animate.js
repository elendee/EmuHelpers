import CAMERA from './CAMERA.js?v=1'
import RENDERER from './RENDERER.js?v=1'
import SCENE from './SCENE.js?v=1'
// import {
// 	SUN,
// } from './three/LIGHT.js?v=89'
// import {
// 	Vector3,
// } from './three.module.js'





let then, now, delta, delta_seconds = 0 

let animate

const set_animate = event => { // if you want to allow toggling renderers, they both need to be available here

	if('some condition'){
		
		animate = () => {

			now = performance.now()

			delta = now - then

			delta_seconds = delta / 1000

			then = now 

			// if( STATE.animating )  requestAnimationFrame( animate )

			RENDERER.render( SCENE, CAMERA )
			// composeAnimate()

		}
	}

}


set_animate( 'some condition' )


export default animate