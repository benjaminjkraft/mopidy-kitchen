/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");

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

module.exports = NowPlayingBox;
