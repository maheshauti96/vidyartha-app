"use strict";
(() => {
var exports = {};
exports.id = 112;
exports.ids = [112];
exports.modules = {

/***/ 1931:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
async function handler(req, res) {
    let topDonors = await fetch("https://api.vidyartha.org/shastradaan/donors/").then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    }).then((data)=>data).catch((error)=>error);
    res.status(200).json(topDonors);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1931));
module.exports = __webpack_exports__;

})();