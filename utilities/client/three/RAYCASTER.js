import {
	Raycaster,
} from '/three-patch/build/three.module.js'
import CAMERA from './CAMERA.js?v=89'

import env from '../../env.js?v=89'

const raycaster = new Raycaster(); 
raycaster.camera = CAMERA

if( !env.LOCAL ) document.getElementById('dev').remove()//.style.display = 'none'

export default raycaster