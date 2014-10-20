/** @jsx React.DOM */
var React = require("react");

var PlayPauseButton = React.createClass({
  propTypes: {
    state: React.PropTypes.string,
    mopidy: React.PropTypes.object.isRequired,
  },

  render: function () {
    var playbutton;
    if (this.props.state == "playing") {
      playbutton = <div onClick={
        () => this.props.mopidy.playback.pause()}>▐▐</div>;
    } else {
      playbutton = <div onClick={
        () => this.props.mopidy.playback.play()}>▶</div>;
    };

    return <div className="play-pause-button">
      <div onClick={() => this.props.mopidy.playback.previous()}>◀▐</div>
      {playbutton}
      <div onClick={() => this.props.mopidy.playback.stop()}>◼</div>
      <div onClick={() => this.props.mopidy.playback.next()}>▐▶</div>
    </div>;
  },
});

module.exports = PlayPauseButton;
