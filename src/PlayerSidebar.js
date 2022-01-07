import React, { PureComponent } from 'react';
import "./Sidebar.css"


export const PlayerSidebar = ({width, height, children}) => {
    const [xPosition, setX] = React.useState(-width);

    const toggleMenu = () => {
        console.log("here");
        if (xPosition < 0) {
            console.log("here2")
            setX(0);
        } else {
            console.log("here3")
            console.log(width)
            setX(-width);
        }
    };

    React.useEffect(() => {
        setX(-width);
    }, []);

    return (
        <React.Fragment>
            <div
                className="side-bar"
                style={{
                    transform: `translatex(${xPosition}px)`,
                    width: width,
                    minHeight: height
                }}
            >
                <button
                    onClick={() => toggleMenu()}
                    className="toggle-menu from-right"
                    style={{
                        transform: `translate(${5}px, 35vh)`
                    }}
                >➤</button>
                <div className="content">{children}</div>
            </div>
        </React.Fragment>
    );
};


export default { PlayerSidebar };