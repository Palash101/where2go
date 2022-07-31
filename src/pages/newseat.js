import BlankLayout from 'src/@core/layouts/BlankLayout'

import { useState,useEffect,useRef } from 'react'


function NewSeat(){

	const initialState = {

	}

	const [reacData, setReactData] = useState(initialState);


	return(
		<>
		<div>
			<g>
			<rect
	          id={componentId}
	          name={componentId}
	          x={this.state.x}
	          y={-this.props.canvasHeight + this.state.y}
	          width={this.state.width}
	          height={this.state.height}
	          style={style}
	        />


			</g>

		</div>

		</>


		)
}

NewSeat.getLayout = page => <BlankLayout>{page}</BlankLayout>

export function NewSeat