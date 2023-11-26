import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/font-awesome/css/font-awesome.min.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from "../../src/components/new/Footer";
import { useRouter } from "next/router";

export default function Shipping() {
    const router = useRouter()
    let { orgCode } = router.query;

    return (<div>
        <div className="container text-center ">


        <h1 className="display-3"><strong>Shipping Policies</strong></h1>
        <p>This document sets out the shipping policy that applies to customers that make a purchase at Vidyartha.org . If you have any questions, please contact our customer service team on <strong>8262002275 or vidyartha@gmail.com</strong>
        </p>
        <div className="container">
            <div className=" row p-3 ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-truck fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">Shipping Options & Delivery Costs</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className=" mt-5">            We offer the following shipping options - you will be asked to select a shipping method at checkout.
                    </h5>
                </div>

            </div>
            <hr></hr>




            <div className=" row p-3 ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-clock-o fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">Order Processing Time</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className="mt-4">            All orders placed before 2 PM Monday to Friday are processed and dispatched the same day, all orders placed after will be dispatched the next day. All orders placed during the weekend or on a public holiday will be sent from our warehouse on Monday or on the next business day.
                    </h5>
                </div>

            </div>
            <hr></hr>
            <div className=" row p-3 ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-map fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">Delivery Address & P.O. Boxes</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className="mt-5">         Please note that we are unable to modify the delivery address once you have placed your order. We are sorry but we do not ship to P.O. boxes.

                    </h5>
                </div>

            </div>
            <hr></hr>
            <div className=" row p-3 ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-globe fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">International Orders</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className="mt-4">       Your package may be subject to import duties and taxes. You, as the customer, are responsible for paying those fees. We recommend that you check with your local customs office before placing an order on our website as these fees can sometimes be significant and we are unable to calculate these for you.
                    </h5>
                </div>

            </div>
            <hr></hr>
            <div className="  row p-3  ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-envelope fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">Tracking Your Order</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className="mt-5">       Once your order has been dispatched, we will send you a confirmation email with tracking information. You will be able to track your package directly on the carrier’s website.
                    </h5>
                </div>

            </div>
            <hr></hr>
            <div className="  row p-3 ">
                <div className="col-md-5 text-center">

                    <h1><i className="fa fa-database fa-2x p-2"></i></h1>
                    <h4 className="p-2 ">Returns, Refunds, and Exchanges</h4>
                </div>
                <div className="col-md-7 text-center">
                    <h5 className="mt-5 ">       We want you to be completely happy with your purchase - please read our return & refund policy for detailed information about our processes.
                    </h5>
                </div>

            </div>
            <hr></hr>


        </div>
        </div>
        <Footer orgCode={orgCode} />
    </div >
    )
};