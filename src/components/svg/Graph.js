import {useDispatch, useSelector} from "react-redux";
import {addPointOnGraphAction} from "../store/graphReducer";
import {useEffect} from "react";
import {request} from "../../asyncRequest/AxiosRequestHandler";
import {addPointAction} from "../store/pointReducer";
export const Graph =()=>{
    const R = useSelector(state=>state.graph.R)
    const graphPoints = useSelector(state => state.graph.pointsGraph)
    const Ox = 150;
    const Oy = 150;
    const scaleR = 28;
    const svg = document.querySelector('svg');
    const polygonPoints =  "150,150 " + (Ox + scaleR * R / 2) + ",150 150," + (Oy + scaleR * R / 2);
    const pathD = "M 150 150 L " +(Ox + scaleR * R / 2)+" 150 A "+R*scaleR+" "+ R*scaleR +" 0 0 0 150 "+(Oy- scaleR * R / 2)+" L Z"
    const dispatch = useDispatch()
    const handleSVGClick = (event)=>{
        const SVG = event.currentTarget;
        const point = SVG.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const { x, y } = point.matrixTransform(SVG.getScreenCTM().inverse());
        console.log('Кликнули на координатах:', x, y);
        dispatch(addPointOnGraphAction({x,y}))
        request(
            "POST",
            "/points",
            {
                coordinateX:transformCoordinate(x).toFixed(4),
                coordinateY:-1*transformCoordinate(y).toFixed(4),
                scaleR:R,
            }).then((point)=>{dispatch(addPointAction(point.data))
            }
        )
    }
    useEffect(() => {
        if(graphPoints.length!==0) {
            checkPoints();
        }
        console.log('Элемент отрендерился');
    });

    const checkArea=(x,y)=>{
        x = transformCoordinate(x)
        y = -1*transformCoordinate(y)
        if (Math.pow(x,2)+Math.pow(y,2)<=Math.pow(R/2,2) && x>=0 && y>=0){
            return true;
        } else if (Math.abs(x)<=(R) && Math.abs(y)<=R && x<=0 && y<=0) {
            return true;
        } else return y >= x - R/2 && x >= 0 && y <= 0;

    }
    const transformCoordinate=(x)=>{
        return (x-Ox)/scaleR;
    }
    const checkPoints=()=>{
        if(graphPoints.length!==0) {
            const circles = svg.querySelectorAll("circle");
            circles.forEach(circle => {
                let x = circle.getAttribute("cx")
                let y = circle.getAttribute("cy")
                svg.appendChild(circle);
                if (!checkArea(x, y)) {
                    circle.setAttribute("fill", "red")
                } else circle.setAttribute("fill", "yellow")
            });
        }

    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="svg" height="300" onClick={handleSVGClick}>
            <line x1="0" y1="150" x2="300" y2="150" stroke="#000720"></line>
            <line x1="150" y1="0" x2="150" y2="300" stroke="#000720"></line>
            <line x1="290" y1="148" x2="290" y2="152" stroke="#000720"></line>
            <text x="285" y="140">5</text>
            <line x1="220" y1="148" x2="220" y2="152" stroke="#000720"></line>
            <text x="210" y="140">2.5</text>
            <line x1="80" y1="148" x2="80" y2="152" stroke="#000720"></line>
            <text x="60" y="140">-2.5</text>
            <line x1="10" y1="148" x2="10" y2="152" stroke="#000720"></line>
            <text x="5" y="140">-5</text>
            <line x1="148" y1="10" x2="152" y2="10" stroke="#000720"></line>
            <text x="156" y="15">5</text>
            <line x1="148" y1="80" x2="152" y2="80" stroke="#000720"></line>
            <text x="156" y="85">2.5</text>
            <line x1="148" y1="220" x2="152" y2="220" stroke="#000720"></line>
            <text x="156" y="225">-2.5</text>
            <line x1="148" y1="290" x2="152" y2="290" stroke="#000720"></line>
            <text x="156" y="295">-5</text>

            <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>
            <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>
            <rect x={Ox-scaleR*R} y="150" width={scaleR*R} height={scaleR*R} fill-opacity="0.4" stroke="navy" fill="blue"></rect>
            <polygon points={polygonPoints} fill-opacity="0.4" stroke="navy" fill="blue"></polygon>
            <path d={pathD} fill-opacity="0.4" stroke="navy" fill="blue"></path>
            {graphPoints.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r="5" fill="yellow" />
            ))}
        </svg>
    )
}
