

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
		<text x="5" y="25" style={{fontSize:'8px'}}>{props.name}</text>
		<circle id={props.id} cx="10" cy="10" r="8" stroke={props.border ? props.border : "black"} stroke-width="2"></circle></svg>

			)
		

}


export default SeatComponent;