export async function getSchoolInfo(placeid, placeName, address = "") {
  let schoolObj = {
    address,
    description: "string",
    id: placeid,
    name: placeName,
  };

  let schoolInfo = await fetch("/api/place/info/", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schoolObj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => data)
    .catch((error) => console.log(error));

  return schoolInfo;
}

export async function createRazorpayOrder(amount, placeId, orgCode) {
  let orderObj = {
    amount,
    placeId,
  };
  if (orgCode) {
    orderObj["org"] = orgCode;
  }

  let schoolInfo = await fetch("/api/order/order", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObj),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return schoolInfo;
}

// get top donors overall
export async function getTopDonors() {
  let topDonors = await fetch("/api/donors/topall")
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return topDonors;
}

// get top donors by school
export async function getTopDonorsBySchool(placeId) {
  let topDonors = await fetch(`/api/donors/${placeId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return topDonors;
}

export async function postFeedback(name, email, feedback) {
  let feedbackObj = {
    name: name,
    email: email,
    feedback: feedback,
  };

  let response = await fetch("/api/contactus/contactus", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackObj),
  })
    .then((response) => {
      return { status: response.status, data: response.text() };
    })
    .then((data) => data)
    .catch((error) => console.log(error));

  return response;
}

export const copyUrlToClipboard = (urlToCopy) => {
  var dummy = document.createElement("input"),
    text = urlToCopy;

  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  navigator.clipboard.writeText(urlToCopy); // temp and unique solution without creating the element
  document.body.removeChild(dummy);
};

export const isValidEmail = (e = "") => {
  const str = e.toLowerCase();
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      str
    )
  ) {
    return false;
  }
  return true;
};

export async function fetchAnalytics() {
  try {
    const response = await fetch(
      "https://api.vidyartha.org/shastradaan/dashboard/"
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

const BASE_URL = "https://api.vidyartha.org";

export async function createComment({ name, email, rating, comment, place }) {
  const placeRating = {
    name,
    email,
    rating,
    comment,
    place,
    timestamp: new Date(Date.now()),
  };
  try {
    const response = await fetch(`${BASE_URL}/shastradaan/place/rating`, {
      body: JSON.stringify(placeRating),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getComments(place) {
  try {
    const response = await fetch(
      `${BASE_URL}/shastradaan/place/rating/${place}`,
      {
        offset: 20,
        paged: true,
        pageNumber: 1,
        pageSize: 20,
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchTopFundraisers() {
  try {
    const response = await fetch(
      `https://api.vidyartha.org/shastradaan/place/`
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export function formatDate(inputDateString) {
  let date = new Date(inputDateString);
  if (isNaN(date)) {
    return inputDateString;
  }

  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dayOfWeek = daysOfWeek[date.getUTCDay()];
  let month = months[date.getUTCMonth()];
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();

  let formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export async function getBooks(setBooks , size =1000){
  try {
    const response = await fetch(`https://api.vidyartha.org/shastradaan/admin/book?size=${size}`)
    
    const data = await response.json()
    
    setBooks(data['content'])
  } catch(err){
    setBooks({err , errorOccured : true})
  }
}

export async function getBooksByCode(setBooks , code){
  try {
    const response = await fetch(`https://api.vidyartha.org/shastradaan/admin/book/findByCode/${code}?size=1000`)
    const data = await response.json()
    setBooks(data['content'])
  } catch(err){
    return setBooks({...err , errorOccured : true})
  }
}

export async function getBooksByName(setBooks , name){
  try {
    const response = await fetch(`https://api.vidyartha.org/shastradaan/admin/book/findByDescription/${name}?size=1000`)
    const data = await response.json()
    setBooks(data['content'])
  } catch(err){
    return setBooks({...err , errorOccured : true})
  }
}

export async function getDeliveries(setDeliveryList){
  try {
    const response = await fetch('https://api.vidyartha.org/shastradaan/admin/delivery')
    const data = await response.json()
    setDeliveryList({data , errorOccured : false})

  }catch(error){
    setDeliveryList({errorOccured : false , error})
  }
}

export async function createDelivery(setResponse , data){
  try {
    const {books , totalAmount , placeAddress , placeId , description , org } = data
    const bodyBooks = books.reduce((acc , curr) => {
      console.log(curr)
      acc[curr.code] = curr.quantity
      return acc
  }, {})
    const deliveryObj = {
      "id": 1,
      "place": placeId,
      "org": org,
      "books": bodyBooks,
      "description": description,
      "shippingService": "string",
      "trackingId": "string",
      "deliveryOwner": "Karthik",
      "toAddress": placeAddress,
      "fromAddress": "string",
      "totalAmount": totalAmount,
      "shippingAmount": 0,
      "itemsCost": 0,
      "taxAmount": 0,
      "createdAt": new Date(),
      "modifiedAt": new Date()
    }

    const response = await fetch('https://api.vidyartha.org/shastradaan/admin/delivery/create', {
      method : 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryObj)
    })
    setResponse(response)
  }catch(error){
    console.log(error)
    setResponse(error)
  }
}