/*
	note:
	- this script writes invisible nodes to the document.body in order to get their size
	- - take care that this does not interfere with existing scripts
*/



const gen_svg_wrap = ( text, args ) => {

	const {
		width,
		height,
		fontSize,
		fontColor,
		strokeColor,
		strokeWidth,
	} = args

	console.log("gen svg args", args )

	const svg_text = `
<svg viewBox='0 0 ${ width } ${ height }' width='${ width }' height='${ height }'>
	<text x='50%' y='50%' dominant-baseline="middle" text-anchor='middle' font-size='${ fontSize }' fill='${ fontColor }' stroke='${ strokeColor }' stroke-width='${ strokeWidth }'>${ text }</text>
</svg>`

	console.log('rendering: ', svg_text )

	const wrap = document.createElement('div')
	wrap.classList.add('svg-wrap')

	wrap.innerHTML = svg_text

	return wrap

} // gen svg wrap



const createFittedTextSVG = ( text, args ) => {

	const fontSize = args.fontSize || 14
	const fontColor = args.fontColor || 'lightgrey'
	const strokeColor = args.strokeColor || 'grey'
	const strokeWidth = args.strokeWidth || .5

	const pseudo = document.createElement('div')
	// consts
	pseudo.style.display = 'inline-block'
	pseudo.style.opacity = 0
	pseudo.style['pointer-events'] = 'none'
	pseudo.style.position = 'absolute'
	pseudo.style.border = '1px solid red'
	pseudo.style['whiteSpace'] = 'nowrap'
	pseudo.style['lineHeight'] = fontSize + 'px'
	// fill from data
	pseudo.style['font-size'] = fontSize + 'px'
	pseudo.innerText = text
	// append
	document.body.append( pseudo )

	// get pseudo bounds to size SVG:
	const bounds = pseudo.getBoundingClientRect()
	const width = bounds.width
	const height = bounds.height

	// make the SVG string
	const svg_wrap = gen_svg_wrap( text, {
		width: width,
		height: height,
		fontColor,
		strokeColor,
		strokeWidth,
		fontSize,
	})

	return svg_wrap 

} // create fitted text svg




const inputs = [
	'test',
	'blorb',
	'ja howdy',
]

let c=  0
for( const i of inputs ){

	c++

	const svg_wrap = createFittedTextSVG( i, {
		fontSize: 74,
		fontColor: 'lightgrey',
		strokeColor: 'grey',
		strokeWidth: .5,
	})

	document.body.append( svg_wrap )

}