/** @jsx React.DOM */
var Mopidy = require("mopidy");
var React = require("react");
var _ = require("underscore");

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
        state => this.setState({playing: "playing" == state}));
    });
    mopidy.on('state:offline', () => this.setState({connected: false}));

    mopidy.on('event:playbackStateChanged',
              event => this.setState({playing: "playing" == event.new_state}));
    mopidy.on('event:trackPlaybackEnded',
              event => this.setState({nowPlaying: null}));
    mopidy.on('event:trackPlaybackStarted',
              event => this.setState({nowPlaying: event.tl_track.track}));

    mopidy.connect();
    return {
      connected: false,
      playing: false,
      nowPlaying: null,
      mopidy: mopidy,
    };
  },

  handleClick: function () {
    if (this.state.playing) {
      this.state.mopidy.playback.pause()
    } else {
      this.state.mopidy.playback.play()
    }
  },

  render: function () {
    var text;
    if (!this.state.connected) {
      text = "loading...";
    } else if (this.state.playing) {
      text = "playing";
    } else {
      text = "paused";
    }

    return <div>
      <button onClick={this.handleClick}>{text}</button>
      <NowPlayingBox nowPlaying={this.state.nowPlaying} />
    </div>;
  },
});

var NowPlayingBox = React.createClass({
  propTypes: {
    nowPlaying: React.PropTypes.object,
  },

  render: function () {
    if (this.props.nowPlaying) {
      var artists = _.without(_.union(
        _.map(this.props.nowPlaying.composers, composer => composer.name),
        _.map(this.props.nowPlaying.album.artists, artist => artist.name)
      ), undefined, null);
      var renderedArtists = _.map(artists, 
        name => <span className="artist-name" key={name}>{name}</span>);
      return <div className="now-playing">
        <div className="track-name">{this.props.nowPlaying.name}</div>
        <div>
          {renderedArtists} - {this.props.nowPlaying.album.name}
        </div>
      </div>;
    } else {
      return null;
    }
  },
});

module.exports = MopidyPlayer;
