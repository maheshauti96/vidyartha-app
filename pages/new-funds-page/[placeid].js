import React from 'react'
import Header from '../../src/components/new/Header'
import Footer from '../../src/components/new/Footer'
import ImageGallery from '../../src/components/new/ImageGallery'
import FundInfo from '../../src/components/new/FundInfo'
import CommentsAndFAQs from '../../src/components/new/commentsandfaq/CommentsAndFAQs'
import TopDonors from '../../src/components/new/TopDonors'
import { TextField } from '@material-ui/core'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getTopDonorsBySchool } from '../../src/services/service'

const FundsPage = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  console.log('getValues', getValues());
  const router = useRouter()
  const [schoolInfo, setSchoolInfo] = useState({
    schoolInfo: {
      name: 'Loading...',
      id: '',
    }
  });
  let { placeid } = router.query;
  console.log('placeid', placeid);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [href, setHref] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [topDonors, setTopDonors] = useState([]);
  const [schoolName, setSchoolName] = useState("")
  const [schoolAdress, setSchoolAddress] = useState("");
  const [schoolId, setSchoolId] = useState(placeid);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [updateRaiseAmount, setUpdateRaisedAmount] = useState(false)
  const amountInputRef = useRef(null);

  function fetchSchoolDetails(placeid) {
    console.log('in fetchSchoolDetails')
    const pyrmont = new google.maps.LatLng(7.798, 68.14712);

    setLoading(true);

    try {
      const request = {
        placeId: schoolId,
      };

      const map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 15,
      });
      const service = new google.maps.places.PlacesService(map);

      service.getDetails(request, (place, status) => {
        console.log({ status });
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceInfo(place);
          console.log('place-->', place);
          setSchoolName(place.name);
          setSchoolAddress([place.formatted_address]);
          console.log(place)
        }
        setLoading(false);
      });
    } catch (error) {
      console.log('fetchSchoolDetails failed', error);
      setLoading(false);
    }
  }

  const getPlaceInfo = async (placeInfo) => {
    const placeAddress = _.get(placeInfo, 'formatted_address') || '';
    const placeName = _.get(placeInfo, 'name');
    const placeImage = _.get(placeInfo, 'photos[0]') && _.get(placeInfo, 'photos[0]').getUrl && _.get(placeInfo, 'photos[0]').getUrl();
    if (!placeImage) {
      placeImage = "/defaultschool.jpeg"
    }
    try {
      if (placeName && schoolId) {
        const schoolInfo = await getSchoolInfo(
          schoolId,
          placeName,
          placeAddress
        );
        setSchoolInfo({ schoolInfo, placeImage })

        let raisedAmount = +schoolInfo.collected / 100;

        let requiredAmount = Math.ceil(raisedAmount / 10000) * 10000 === 0 ? 10000 : Math.ceil(raisedAmount / 10000) * 10000;
        let progress = raisedAmount / requiredAmount * 100


        if (raisedAmount % 10000 === 0) {
          requiredAmount = Math.ceil((+raisedAmount + 1) / 10000) * 10000 === 0 ? 10000 : Math.ceil((+raisedAmount + 1) / 10000) * 10000;
          progress = raisedAmount / requiredAmount * 100
        }


        setRaisedAmount(raisedAmount);
        setRequiredAmount(requiredAmount)
        setProgress(progress)

        return true;
      } else {
        console.log('sry bro', { placeAddress, placeName, schoolId });
      }
    } catch (error) {
      console.log('getPlaceInfo Error', error);
      return false;
    }
  }

  const fetchTopDonors = async (schoolId) => {
    const data = await getTopDonorsBySchool(schoolId)
    if (data) {

      setTopDonors(data.content)
    }
  }

  const handlePopupClose = () => {
    setShowPopup(false)
    localStorage.setItem("visited", "true")
  }

  useEffect(() => {
    setHref(window.location.href);
  }, [])

  useEffect(() => {
    let { placeid } = router.query
    setSchoolId(placeid)
  }, [router])

  useEffect(() => {
    // if (!placeInfo && !placeid) {
    //     console.log('bye bye');
    //     router.push('/');
    // }
    console.log('placeInfo**', placeInfo);
    if (schoolId && !placeInfo) {
      fetchSchoolDetails(schoolId);
      fetchTopDonors(schoolId);
    }
    if ((schoolId && placeInfo) || updateRaiseAmount) {

      console.log('got the placeinfo');
      fetchTopDonors(schoolId);
      getPlaceInfo(placeInfo)
    }
    // setPlaceInfo(localStorage.getItem('placeInfo') ? JSON.parse(localStorage.getItem('placeInfo')) : null);


  }, [placeid, placeInfo, updateRaiseAmount, schoolId])

  useEffect(() => {
    console.log("NEW", placeid, schoolId);
    if (placeid !== schoolId) {
      placeid = schoolId;
    }
  }, [schoolId])

  return (
    <>
      <Head>
        <title>Vidyartha</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLAaadQJ2iA8m6Nq2KGAQXwL9B6CwVvZ8&libraries=places"></script>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <meta property="title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
        <meta name="description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="image" content={schoolInfo.placeImage} />
        <meta property="og:title" content="Vidyartha | Help Us To Donate Books For Your School!" key="title" />
        <meta name="og:description" content="In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically. In order to make our students ready for a globalised world and create an opportunity for them to learn about other nations and culture, we have developed partnerships with schools around the world. The function of education is to teach one to think intensively and to think critically." />
        <meta property="og:image" content={schoolInfo.placeImage} />
      </Head>
      <div style={{ fontFamily: 'Inter' }}>
        <Header />
        <div className='section-1'>
          <ImageGallery schoolSrc = {schoolInfo.placeImage} />
          <FundInfo schoolInfo = {{schoolName , schoolAdress , schoolInfo , schoolId}} raisedAmount = {raisedAmount} requiredAmount = {requiredAmount} progress = {progress} />
        </div>
        <div className='section-2' >
          <CommentsAndFAQs />
          <TopDonors />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default FundsPage