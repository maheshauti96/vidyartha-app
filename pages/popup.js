import { Button, TextField } from "@material-ui/core";
import { ArrowForwardIos } from '@material-ui/icons';
export default function Popup() {
    return (<div className="main">
<div><img className="logo" src="white-logo.png" height={200} width={300}></img></div>
        <h1 className="heading">HELP IN CREATING A</h1>

        <h1 className="heading1">BRIGHTER FUTURE</h1>
        <h2 className="heading2">BY DONATING SPRITUAL BOOKS TO THE CHILDREN</h2>
        <hr className="line"></hr>
        <h3 className="data">Reading spritual books helps in developing personality,
            <br></br>
            builds self esteem, increases moral values, concerntration,
            <br></br>knowledge and peace</h3>
        <div><Button
            className="primary-button"
            onClick={() => {
                if (finalPlace) {
                    router.push(`/fundraiser/${finalPlace.place_id}`);
                } else {
                    alert('Please Select the school')
                }
            }}
            variant="contained"
            endIcon={<ArrowForwardIos />}
        >Donate Now</Button></div>

        <div><img className="image" src="image1.png" width={1000}></img></div>
        
    </div>)
}
