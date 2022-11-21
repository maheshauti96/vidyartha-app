export async function getSchoolInfo(placeid, placeName, address = '') {
  let schoolObj = {
    address,
    description: "string",
    id: placeid,
    name: placeName,
  }

  let schoolInfo = await fetch('/api/place/info/', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schoolObj)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
    .then(data => data)
    .catch(error => console.log(error))

  return schoolInfo;
}


export async function createRazorpayOrder(amount, placeId) {

  let orderObj = {
    amount,
    placeId
  }

  let schoolInfo = await fetch('/api/order/order', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderObj)
  }).then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

  return schoolInfo;

}


// get top donors overall
export async function getTopDonors() {

  let topDonors = await fetch("/api/donors/topall")
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

  return topDonors;
}

// get top donors by school
export async function getTopDonorsBySchool(placeId) {

  let topDonors = await fetch(`/api/donors/${placeId}`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

  return topDonors;
}

export async function postFeedback(name, email, feedback) {
  let feedbackObj = {
    name: name,
    email: email,
    feedback: feedback
  }

  let response = await fetch('/api/contactus/contactus', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackObj)
  }).then(response => { return { status: response.status, data: response.text() } })
    .then(data => data)
    .catch(error => console.log(error))

  return response;
}

export const copyUrlToClipboard = (urlToCopy) => {
  var dummy = document.createElement('input'),
    text = urlToCopy;

  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  navigator.clipboard.writeText(urlToCopy); // temp and unique solution without creating the element
  document.body.removeChild(dummy);
}


export const isValidEmail = (e = '') => {
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


