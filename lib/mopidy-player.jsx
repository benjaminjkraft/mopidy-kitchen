/** @jsx React.DOM */
var Mopidy = require("mopidy");
var React = require("react");
var _ = require("underscore");

var NowPlayingBox = require("./now-playing-box.jsx");
var PlayPauseButton = require("./play-pause-button.jsx");

var MopidyPlayer = React.createClass({
  getInitialState: function () {
    var mopidy = new Mopidy({
      webSocketUrl: "ws://redox.mit.edu:6680/mopidy/ws/",
      autoConnect: false,
    });
    mopidy.on(console.log.bind(console));

    mopidy.on('state:online', () => {
      this.setState({connected: true});
      mopidy.playback.getCurrentTrack().done(
        track => this.setState({nowPlaying: track}));
      mopidy.playback.getState().done(
        state => this.setState({state: state}));
    });
    mopidy.on('state:offline', () => this.setState({connected: false}));

    mopidy.on('event:playbackStateChanged',
              event => this.setState({state: event.new_state}));
    mopidy.on('event:trackPlaybackEnded',
              event => this.setState({nowPlaying: null}));
    mopidy.on('event:trackPlaybackStarted',
              event => this.setState({nowPlaying: event.tl_track.track}));
              // TODO:
              // event:trackPlaybackPaused (for time_position?)
              // event:trackPlaybackResumed (for time_position?)
              // event:volumeChanged
              // event:tracklistChanged
              // event:optionsChanged
              // event:playlistsLoaded (?)

    window.mopidy = mopidy;
    mopidy.connect();
    return {
      connected: false,
      state: null,
      currentTrack: null,
      mopidy: mopidy,
    };
  },

  render: function () {
    if (!this.state.connected) {
      return <div>loading...</div>;
    } else {
      return <div>
        <PlayPauseButton state={this.state.state} mopidy={this.state.mopidy} />
        <NowPlayingBox nowPlaying={this.state.nowPlaying} />
      </div>;
    }
  },
});

module.exports = MopidyPlayer;
