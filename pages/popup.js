import { Button, TextField } from "@material-ui/core";

export default function Popup({handleClose}) {
    return (
        <div className="main">
            <div className="center-align">
                <p className="head">HELP IN CREATING A</p>
                <p className="head">BRIGHTER FUTURE</p>
                <p className="sub-head">BY DONATING SPIRITUAL BOOKS TO THE CHILDREN</p>
                <hr />
                <p className="par">
                    Reading spiritual books helps in developing personality, builds self
                    esteem, increases moral values, concentration, knowledge and peace
                </p>
                <Button className="btn1" variant="contained" onClick={handleClose}>
                    <p>Close</p>
                </Button>
                <div className="image">
                    <img className="center-align image" src="/book and bg-01.png"></img>
                </div>
            </div>

            <div className="logo">
                <img src="logo-white.png"></img>
            </div>
        </div>
    );
}
