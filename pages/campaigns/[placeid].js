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
import Head from 'next/head'
import _ from 'lodash';
import { useRouter } from 'next/router'
import { copyUrlToClipboard, getSchoolInfo, isValidEmail, getTopDonorsBySchool } from "../../src/services/service";
import CommentModal from '../../src/components/new/commentsandfaq/CommentModal'


const FundsPage = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const router = useRouter()
  const [schoolInfo, setSchoolInfo] = useState({
    schoolInfo: {
      name: 'Loading...',
      id: '',
    }
  });
  let { placeid } = router.query;
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [href, setHref] = useState(null);
  const [topDonors, setTopDonors] = useState([]);
  const [schoolName, setSchoolName] = useState("")
  const [schoolAdress, setSchoolAddress] = useState("");
  const [schoolId, setSchoolId] = useState(placeid);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [updateRaiseAmount, setUpdateRaisedAmount] = useState(false)
  const [comments , setComments] = useState([])
  const [showModal , setShowModal] = useState(false)
  function fetchSchoolDetails(placeid) {
    // from google
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
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceInfo(place);
          setSchoolName(place.name);
          setSchoolAddress([place.formatted_address]);
        }
        setLoading(false);
      });
    } catch (error) {
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
        console.log('placename and id not defined', { placeAddress, placeName, schoolId });
      }
    } catch (error) {
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

  async function getAllDonors(placeid){
    try {
      let response = await fetch(`https://api.vidyartha.org/shastradaan/donors/${placeid}`)
      let data = await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let { placeid } = router.query
    setSchoolId(placeid)

  }, [router])

  useEffect(() => {
    // if (!placeInfo && !placeid) {
    //     router.push('/');
    // }
    if (schoolId && !placeInfo) {
      fetchSchoolDetails(schoolId);
      fetchTopDonors(schoolId);
    }

  }, [placeid, placeInfo, updateRaiseAmount, schoolId])
  useEffect(() => {

    if ((schoolId && placeInfo) || updateRaiseAmount) {
      fetchTopDonors(schoolId);
      getPlaceInfo(placeInfo)
    }
  }, [schoolId, placeInfo, updateRaiseAmount ])

  useEffect(() => {
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
          <FundInfo placeid={placeid} schoolInformation = {{schoolName , schoolAdress , schoolInfo , schoolId}} raisedAmount = {raisedAmount} requiredAmount = {requiredAmount} progress = {progress} href={href} />
        </div>
        <div className='section-2' >
          {/* <CommentsAndFAQs place={placeid} setShowModal = {setShowModal} setComments = {setComments} comments = {comments} />
          <CommentModal showModal = {showModal} setShowModal = {setShowModal} setComments = {setComments} place = {placeid}/> */}
          <TopDonors topDonors = {topDonors} />
        </div>
        <div style={{ visibility: 'hidden' }} id="map"></div>
        <Footer />
      </div>
    </>
  )
}

export default FundsPage