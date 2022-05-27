/*  

pie charts

run this module / function once to bind all ".pie" elements in your HTML to fill innerHTML with "pie html" and execute when scrolled to.

** important ** - every '.pie' element must have "data-percent=n" attribute set

example:

<div class='pie' data-percent='25'></div>

...

import charts from 'charts.js'

charts()

*/


/* for the boring look: */
/* .pie svg {
  transform: rotate(-90deg);
  background: yellowgreen;
  border-radius: 50%;
} */
/*
  ( dash, gap )
  required distance is arbitrary based on circle size and stroke width
  in this case: 157 === 360deg
  */
   /* 2π × 25 ≈ 158 */
/*    stroke-dasharray: 0 157;  */

const css = `
.pie circle {
  fill: #68cfc9;
  stroke: #396082;
  stroke-width: 50;
  transition: 2s;
  stroke-dasharray: 360 360; 
}
`
const style = document.createElement('style')
style.innerHTML = css
document.head.appendChild( style )

const circle = ( width, height, radius, x, y ) => {
	return `
<svg width="${ width }" height="${ height }">
  <circle r="${ radius }" cx="${ x }" cy="${ y }" />
</svg>
`
}

const percent_classes = {}

const animate_pies = pies => {

	const radius = 25

	const derived_circumference = Math.floor( 2 * Math.PI * radius ) 

	let iter = 0
	for( const pie of pies ){

		pie.innerHTML = circle( 100, 100, radius, radius * 2, radius * 2 )

		const abs_percent = pie.getAttribute('data-percent')

		if( !percent_classes[ abs_percent ] ){
			percent_classes[ abs_percent ] = `
.pie.percent-${ abs_percent } circle{
	stroke-dasharray: ${ Math.floor( ( abs_percent / 100 ) * derived_circumference ) } ${ derived_circumference }
}`
		}

		setTimeout(() => {
			pie.classList.add('percent-' + abs_percent )
		}, iter * 500 )

		iter++

	}

	if( pies.length ){

		const pie_style = document.createElement('style')
		for( const key in percent_classes ){
			pie_style.innerHTML += percent_classes[ key ]
		}
		document.head.appendChild( pie_style )

	}

}

export default () => {

	const pies = document.querySelectorAll('.pie')

	let top 
	let began
	window.addEventListener('scroll', e => {
		top = pies[0].getBoundingClientRect().top
		if( !began && top > 0 && top < window.innerHeight ){
			began = true
			animate_pies( pies )
		}
		// if( window.pageYOffset )
	})

}

