
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function Contact() {

    return (<div>
        <div className="container text-center ab">
        <nav class="navbar navbar-expand-lg ">
            <a class="navbar-brand" href="#">
                {/* <img > </img> */}
            </a>
        </nav>


        <h1 className="display-1"><strong>VIDYARTHA</strong>
        </h1>
        <p className="p-4">Spreading the Compassion of Lord Chaitanya to All
            We're a non-profit organization operated in public interest by International Society for Krishna Consciousness, Pune, India. This temple is known for it's cultural heritage and thus named as "New Vedic Cultural Center" which was opened by Ex President Lt. Shri Pranab Mukherjee in the year 2013.
            Helping humanity unwind themselves from their difficulties & ease up is our main goal through awakening the level of consciousness. Our Founder-Acharya: His Divine Grace A. C. Bhaktivedanta Swami Prabhupada, has bought down the age old science, culture & tradition just suited to the modern era. We pray for your deeper understanding of the subjects of your own true self.</p>

    </div>
    <footer className="foot-wrap ft">
      <Grid container>
        <Grid item xs={12} sm={2}>
          <p>Terms & Conditions</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Privacy Policy</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Return Policy</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Shipping Policy</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>About Us</p>
        </Grid>
        <Grid item xs={12} sm={2}>
          <p>Contact Us</p>
        </Grid>
      </Grid>
    </footer>
    </div>)
};