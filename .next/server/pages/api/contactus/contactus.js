"use strict";
(() => {
var exports = {};
exports.id = 296;
exports.ids = [296];
exports.modules = {

/***/ 1932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
async function handler(req, res) {
    let schoolInfo = await fetch("https://api.vidyartha.org/shastradaan/contactus/contactus", {
        method: "post",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    }).then((response)=>{
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data)=>data).catch((error)=>error);
    res.status(200).json(schoolInfo);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1932));
module.exports = __webpack_exports__;

})();