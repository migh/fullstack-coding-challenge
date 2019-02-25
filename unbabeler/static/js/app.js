/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Input_container_1 = __webpack_require__(/*! ./Input.container */ "./src/components/Input.container.tsx");
exports.App = (props) => (React.createElement("div", { id: "container" },
    React.createElement("div", { className: "row justify-content-md-center" },
        React.createElement("div", { className: "col-12 col-lg-6 text-center" },
            React.createElement("h2", null, "Test Unbabel API"),
            React.createElement(Input_container_1.InputContainer, null)))));


/***/ }),

/***/ "./src/components/Input.container.tsx":
/*!********************************************!*\
  !*** ./src/components/Input.container.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const api = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
const Input_1 = __webpack_require__(/*! ./Input */ "./src/components/Input.tsx");
const TranslationsList_1 = __webpack_require__(/*! ./TranslationsList */ "./src/components/TranslationsList.tsx");
class InputContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            text: '',
            translations: [],
            isLoaded: false,
            requestingTranslation: false
        };
        /**
         * Makes a translate request to API
         */
        this.translateClickHandler = () => {
            const { text } = this.state;
            this.setState({
                requestingTranslation: true
            });
            api.translate(text).then(data => {
                this.setState({
                    requestingTranslation: false
                });
                this.updateTranslations();
            });
        };
        /**
         * A handler generator for item click and status update
         */
        this.itemClickPartialHandler = (item) => () => {
            api.checkStatus(item.jobId).then(({ updated }) => {
                if (updated) {
                    this.updateTranslations();
                }
            });
        };
        /**
         * Handle enter button translate trigger
         */
        this.enterHandler = (ev) => {
            if (ev.key === 'Enter') {
                this.translateClickHandler();
            }
        };
        /**
         * Handle input's value change
         */
        this.changeHandler = (ev) => {
            this.setState({ text: ev.currentTarget.value });
        };
    }
    /**
     * React lifecycle method
     */
    componentDidMount() {
        this.updateTranslations();
    }
    /**
     * Updates translation status
     */
    updateTranslations() {
        api.getTranslations().then(translations => {
            this.setState({
                isLoaded: true,
                translations: translations
            });
        });
    }
    /**
     * Renders Input Container
     */
    render() {
        const { text, isLoaded, translations, requestingTranslation } = this.state;
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "form-group" },
                React.createElement(Input_1.Input, { placeholder: "Write some text to translate", onChange: this.changeHandler, onEnter: this.enterHandler, value: text }),
                React.createElement("button", { type: "button", className: "btn btn-primary my-2", onClick: this.translateClickHandler }, "Translate"),
                requestingTranslation && React.createElement("h2", { className: "my-2" }, "Requesting translation..."),
                React.createElement(TranslationsList_1.TranslationsList, { isLoaded: isLoaded, translations: translations, onItemClick: this.itemClickPartialHandler }),
                React.createElement("p", null,
                    React.createElement("strong", null, "Note"),
                    ": Click on the item to update status."))));
    }
}
exports.InputContainer = InputContainer;


/***/ }),

/***/ "./src/components/Input.tsx":
/*!**********************************!*\
  !*** ./src/components/Input.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
exports.Input = (props) => (React.createElement("input", { className: "form-control", type: "text", placeholder: props.placeholder, value: props.value, onChange: props.onChange, onKeyPress: props.onEnter }));


/***/ }),

/***/ "./src/components/TranslationsList.tsx":
/*!*********************************************!*\
  !*** ./src/components/TranslationsList.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
// I know lodash have a function for this
function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
// Orders the longer string first
function orderByLength(a, b) {
    const aLength = a.textTarget && a.textTarget.length || 0;
    const bLength = b.textTarget && b.textTarget.length || 0;
    return bLength - aLength;
}
// I know classnames could work for this
function getClass(status) {
    switch (status) {
        case 'requested':
            return 'list-group-item-success';
        case 'pending':
            return 'list-group-item-warning';
        case 'completed':
            return 'list-group-item-primary';
    }
}
exports.TranslationsList = (props) => (React.createElement("div", { className: "row justify-content-md-center" },
    React.createElement("div", { className: "col-10" },
        React.createElement("ul", { className: "list-group" }, props.translations.sort(orderByLength).map(translation => (React.createElement("li", { className: `list-group-item mb-1 ${getClass(translation.status)}`, style: { cursor: 'pointer' }, onClick: props.onItemClick(translation) },
            translation.textSource,
            React.createElement("span", { className: "float-right" }, capitalize(translation.status)),
            translation.status === 'completed' && (React.createElement(React.Fragment, null,
                React.createElement("hr", null),
                React.createElement("div", null, translation.textTarget))))))))));


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const App_1 = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
ReactDOM.render(React.createElement(App_1.App, null), document.getElementById('app'));


/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic API request function
 * As the project grows and depending on the architecture
 * it could make sense to put this into a class.
 * It is promise based but at this point very general.
 * It is hard to test internal function properly.
 */
function request(options) {
    const { url, type, init } = options;
    function requestResolver(resolve, reject) {
        fetch(url, init ? Object.assign({}, init) : {})
            .then((response) => response[type]())
            .then(resolve)
            .catch(reject);
    }
    return new Promise(requestResolver);
}
exports.request = request;
/**
 * Hits /translations endpoint
 * Gets all current translations
 */
function getTranslations() {
    return request({
        url: '/translations',
        type: 'json'
    });
}
exports.getTranslations = getTranslations;
/**
 * Hits /translation/:id endpoint
 * Gets translation status, id is job id in unbabel api
 */
function checkStatus(jobId) {
    return request({
        url: `/translation/${jobId}`,
        type: 'json'
    });
}
exports.checkStatus = checkStatus;
/**
 * Hits /translate endpoint
 * Request a translation
 */
function translate(text) {
    return request({
        url: '/translate',
        type: 'text',
        init: {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });
}
exports.translate = translate;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=app.js.map