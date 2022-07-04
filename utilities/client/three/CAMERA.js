import { 
	PerspectiveCamera,
	Group,
} from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js"



const camera = new PerspectiveCamera( 
	30, 
	window.innerWidth / window.innerHeight, 
	1, 
	1000
)
// camera.position.set( 0, 300, -40 );


// camera.fixture = new Group()


// camera.setFocalLength( 25 )
// camera.original_focal_length = camera.getFocalLength()


// const update = event => {
// 	const { 
// 		focal_length,
// 	} = event

// 	if( focal_length ){
// 		if( focal_length == 'out' ){
// 			camera.setFocalLength( Math.max( 1, camera.getFocalLength() * .95 ) )
// 		}else if( focal_length == 'pico_out' ){
// 			camera.setFocalLength( Math.max( 10, camera.getFocalLength() * .97 ) )
// 		}else if( focal_length === 'in'){
// 			camera.setFocalLength( Math.min( 1000, camera.getFocalLength() * 1.02 ) )
// 		}else if( focal_length === 'restore' ){
// 			camera.setFocalLength( camera.original_focal_length )
// 		}else if( typeof focal_length === 'number' ){
// 			camera.setFocalLength( focal_length )
// 		}
// 	}

// }

// BROKER.subscribe('CAMERA_UPDATE', update )


export default camera

