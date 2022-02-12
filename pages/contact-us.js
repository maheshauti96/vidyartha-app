import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/font-awesome/css/font-awesome.min.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from "../src/components/Footer";

export default function Shipping() {


    return (<div>
        <div className=" public-wrap container text-center ab p-5">
        <h2>Contact US</h2>
        <h4>ISKCON NVCC, Off Katraj-Kondhwa Bypass Rd, Kondhwa (Bk), Pune-411048.</h4>
        <h3><strong>8262002275 or vidyartha@gmail.com</strong></h3>
    </div>

    {/* <Footer /> */}
    <footer className="foot-wrap ft">
      <Grid container>
        <Grid item xs={12} sm={2}>
            <p>Terms & Conditions</p>
        </Grid>
        <Grid item xs={12} sm={2}>
           <p>Privacy Policy</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>About Us</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Contact Us</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Return Policy</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Shipping Policy</p>
        </Grid>
      </Grid>
    </footer>
    </div>)
}