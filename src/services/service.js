export async function getSchoolInfo({ post, response }, placeid, placeName, address = '') {
    const schoolInfo = await post("/place/info", {
      address,
      description: "string",
      id: placeid,
      name: placeName,
    });
    if (response.ok) {
      return schoolInfo;
    }
  }



  export async function createRazorpayOrder({ post, response }, amount, placeId) {
    const schoolInfo = await post("/order/order", {
      amount,
      placeId
    });
    if (response.ok) {
      return schoolInfo;
    }
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

// get top donors overall
export async function getTopDonors({get, response}) {
  const topDonors = await get("/donors/")
  if(response.ok) {
    return topDonors
  }
}

// get top donors by school
export async function getTopDonorsBySchool({get, response}, placeId) {
  const topDonorsBySchool = await get(`/donors/${placeId}`)
  if(response.ok) {
    return topDonorsBySchool
  }
}
