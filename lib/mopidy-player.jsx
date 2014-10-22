/** @jsx React.DOM */
var Mopidy = require("mopidy");
var React = require("react");
var _ = require("underscore");

var Tracklist = require("./tracklist.jsx");
var PlayPauseButton = require("./play-pause-button.jsx");

var MopidyPlayer = React.createClass({
  getInitialState: function () {
    var mopidy = new Mopidy({
      webSocketUrl: "ws://redox.mit.edu/mopidy/ws/",
      autoConnect: false,
    });
    mopidy.on(console.log.bind(console));

    mopidy.on('state:online', () => {
      this.setState({connected: true});
      mopidy.playback.getCurrentTrack().done(
        track => this.setState({nowPlaying: track}));
      mopidy.playback.getState().done(
        state => this.setState({state: state}));
      mopidy.tracklist.getTlTracks().done(
        tlTracks => this.setState({tracklist: tlTracks}));
    });
    mopidy.on('state:offline', () => this.setState({connected: false}));

    mopidy.on('event:playbackStateChanged',
              event => this.setState({state: event.new_state}));
    mopidy.on('event:trackPlaybackEnded',
              event => this.setState({nowPlaying: null}));
    mopidy.on('event:trackPlaybackStarted',
              event => this.setState({nowPlaying: event.tl_track.track}));
    mopidy.on('event:tracklistChanged',
              () => mopidy.tracklist.getTlTracks().done(
                tlTracks => this.setState({tracklist: tlTracks})));
              // TODO:
              // event:trackPlaybackPaused (for time_position?)
              // event:trackPlaybackResumed (for time_position?)
              // event:volumeChanged
              // event:optionsChanged
              // event:playlistsLoaded (?)

    window.mopidy = mopidy;
    mopidy.connect();
    return {
      connected: false,
      state: null,
      currentTrack: null,
      tracklist: null,
      mopidy: mopidy,
    };
  },

  render: function () {
    if (!this.state.connected) {
      return <div>loading...</div>;
    } else {
      return <div>
        <PlayPauseButton state={this.state.state} mopidy={this.state.mopidy} />
        <Tracklist tracklist={this.state.tracklist} />
      </div>;
    }
  },
});

module.exports = MopidyPlayer;
