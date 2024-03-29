import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from "../../src/components/new/Footer";
import { useRouter } from "next/router";

export default function Shipping() {
    const router = useRouter()
    let { orgCode } = router.query;

    return (<div>
        <div className=" public-wrap container text-center ab p-5">
        <h2>Contact US</h2>
        <h4>ISKCON NVCC, Off Katraj-Kondhwa Bypass Rd, Kondhwa (Bk), Pune-411048.</h4>
        <h3><strong>8262002275 or reachtovidyartha@gmail.com</strong></h3>
    </div>

    <Footer orgCode={orgCode} />
    </div>)
}