"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ToggleLabeledButton = _interopRequireDefault(require("../../Button/ToggleLabeledButton"));
var _withSetStepOnChange = _interopRequireDefault(require("../../../hocs/withSetStepOnChange"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SectionButton = (0, _withSetStepOnChange.default)(_ToggleLabeledButton.default);
var _default = exports.default = SectionButton;