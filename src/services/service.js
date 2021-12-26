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
