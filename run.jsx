var React = require("react");
var $ = require("jquery");
var Player = require('./lib/mopidy-player.jsx');

window.React = React;

$(function () {React.renderComponent(<Player/>, document.body);});
