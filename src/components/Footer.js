import { Grid } from "@material-ui/core";
import Link from "next/link";

export default function Footer() {
    return (<footer className="foot-wrap">
    <Grid container>
      <Grid item xs={12} sm={3}>
          <p><Link href="/terms"><span style={{cursor:"pointer"}}>Terms & Conditions</span></Link></p>
      </Grid>
      <Grid item xs={12} sm={3}>
         <p><Link href="/privacypolicy"><span style={{cursor:"pointer"}}>Privacy Policy</span></Link></p>
      </Grid>
      <Grid item xs={12} sm={3}>
        <p><Link href="/returnpolicy"><span style={{cursor:"pointer"}}>Return Policy</span></Link></p>
      </Grid>
      <Grid item xs={12} sm={3}>
        <p><Link href="/Shippingpolicy"><span style={{cursor:"pointer"}}>Shipping policy </span></Link></p>
      </Grid>
      <Grid item xs={12} sm={2}>
      <p><Link href="/about-us"><span style={{cursor:"pointer"}}>About Us</span></Link></p>
      </Grid>
      <Grid item xs={12} sm={2}>
      <p><Link href="/contact-us"><span style={{cursor:"pointer"}}>Contact Us</span></Link></p>
      </Grid>

    </Grid>
  </footer>)
}