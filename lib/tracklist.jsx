/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");

var Track = require("./track.jsx");

var Tracklist = React.createClass({
  propTypes: {
    tracklist: React.PropTypes.arrayOf(
      React.PropTypes.object),
  },

  render: function () {
    if (this.props.tracklist) {
      var tracks = _.map(this.props.tracklist,
                         track => <Track track={track.track}
                                         key={track.track.name} />);
      return <div className="tracklist">
        {tracks}
      </div>;

    } else {
      return <div className="tracklist">
        (nothing queued)
      </div>;
    }
  },
});

module.exports = Tracklist;
