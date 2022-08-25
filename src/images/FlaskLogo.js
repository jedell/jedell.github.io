import {ReactComponent as Flask} from "./Flask_logo.svg"
import {ReactComponent as FlaskDark} from "./Flask_logo_white.svg"

function FlaskLogo(props) {
    if (props.dark === true)
        return <FlaskDark/>
    return <Flask/>
}

export default FlaskLogo;