"use strict";
(() => {
var exports = {};
exports.id = 236;
exports.ids = [236];
exports.modules = {

/***/ 7896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
async function handler(req, res) {
    let placeid = req.query.id;
    let topDonors = await fetch(`https://api.vidyartha.org/shastradaan/donors/${placeid}/`).then((response)=>{
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
var __webpack_exports__ = (__webpack_exec__(7896));
module.exports = __webpack_exports__;

})();