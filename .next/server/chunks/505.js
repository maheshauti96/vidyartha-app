"use strict";
exports.id = 505;
exports.ids = [505];
exports.modules = {

/***/ 4505:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PZ": () => (/* binding */ getTopDonorsBySchool),
/* harmony export */   "ZX": () => (/* binding */ getSchoolInfo),
/* harmony export */   "fQ": () => (/* binding */ copyUrlToClipboard),
/* harmony export */   "qr": () => (/* binding */ postFeedback),
/* harmony export */   "vV": () => (/* binding */ isValidEmail),
/* harmony export */   "wi": () => (/* binding */ createRazorpayOrder)
/* harmony export */ });
/* unused harmony export getTopDonors */
async function getSchoolInfo(placeid, placeName, address = "") {
    let schoolObj = {
        address,
        description: "string",
        id: placeid,
        name: placeName
    };
    let schoolInfo = await fetch("/api/place/info/", {
        method: "post",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(schoolObj)
    }).then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data)=>data).catch((error)=>console.log(error));
    return schoolInfo;
}
async function createRazorpayOrder(amount, placeId) {
    let orderObj = {
        amount,
        placeId
    };
    let schoolInfo = await fetch("/api/order/order", {
        method: "post",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderObj)
    }).then((res)=>res.json()).then((data)=>data).catch((error)=>console.log(error));
    return schoolInfo;
}
// get top donors overall
async function getTopDonors() {
    let topDonors = await fetch("/api/donors/topall").then((res)=>res.json()).then((data)=>data).catch((error)=>console.log(error));
    return topDonors;
}
// get top donors by school
async function getTopDonorsBySchool(placeId) {
    let topDonors = await fetch(`/api/donors/${placeId}`).then((res)=>res.json()).then((data)=>data).catch((error)=>console.log(error));
    return topDonors;
}
async function postFeedback(name, email, feedback) {
    let feedbackObj = {
        name: name,
        email: email,
        feedback: feedback
    };
    let response = await fetch("/api/contactus/contactus", {
        method: "post",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackObj)
    }).then((response)=>{
        return {
            status: response.status,
            data: response.text()
        };
    }).then((data)=>data).catch((error)=>console.log(error));
    return response;
}
const copyUrlToClipboard = (urlToCopy)=>{
    var dummy = document.createElement("input"), text = urlToCopy;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    navigator.clipboard.writeText(urlToCopy); // temp and unique solution without creating the element
    document.body.removeChild(dummy);
};
const isValidEmail = (e = "")=>{
    const str = e.toLowerCase();
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)) {
        return false;
    }
    return true;
};


/***/ })

};
;