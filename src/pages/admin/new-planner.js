import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3-drag'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { MouseMoveUp } from 'mdi-material-ui';

function NewPlanner (){
    const circle =  useRef(null)
    const svg = useRef(null)
    const [x, setx] = useState(25)
    const [y, sety] = useState(25)
    const [dragoffset, setDragOffset] = useState({
        x:null,
        y:null
    })

    useEffect(()=>{


    },[])
    const startDrag = (e,circle)=>{
        console.log('mouse down')
        e.preventDefault();
        const svgPoint = svg.current.createSVGPoint()
        svgPoint.x = e.clientX;
        svgPoint.y = e.clientY;
        svgPoint = svgPoint.matrixTransform(svg.current.getScreenCTM().inverse());
        setDragOffset({x:svgPoint.x - x,y:svgPoint.y-y});
        // circle.current.addEventListener("mousemove", mousemove);
        circle.current.addEventListener("mousemove", mousemove);
        circle.current.addEventListener("mouseup", mouseup);
      
    }

    const mousemove = (event) => {
        console.log('mouse move')
        event.preventDefault();
        const svgPoint = svg.current.createSVGPoint()
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        let cursor = svgPoint.matrixTransform(svg.current.getScreenCTM().inverse());
        setx(cursor.x - dragoffset.x)
        sety(cursor.y - dragoffset.y)

      }
      const mouseup = (event)=>{
        event.preventDefault();
        circle.current.removeEventListener("mousemove", mousemove);
        console.log('mosue up')

      }


    return(
        <>
        <h5>New Planner Comming soon</h5>
        <div style={{height:'50px',width:'70px'}} draggable>Add Me</div>
        <div style={{width:'70%',height:'400px', margin:'auto'}}>
            <svg 
            viewBox='0 0 900 400'
            preserveAspectRatio='xMinYMin'
            width='100%'
            height='100%'
            style={{backgroundColor:'pink'}}
            ref={svg}
            
            >
                <circle 
                cx={x} 
                cy={y} 
                r='20' 
                ref={circle}
                onMouseDown={(e) =>startDrag(e,circle)}
                // onMouseMove = {(e)=>mousemove(e)}
                // onMouseUp = {(e)=>mouseup(e)}
                
                />
            </svg>
        </div>
        
        </>
    )
}

NewPlanner.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default NewPlanner;