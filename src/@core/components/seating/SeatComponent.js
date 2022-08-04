

function SeatComponent (props){
	return(
		<svg 
		className={props.className}  
		fill={props.color ? props.color : "black"}  
		key={props.key} 
		onClick={props.handleClick} 
		id={props.key} 
		x={props.startingXPosition} 
		y={props.startingYPosition}
		>
		<circle id={props.id} cx="10" cy="10" r="8"></circle></svg>

			)
		

}


export default SeatComponent;