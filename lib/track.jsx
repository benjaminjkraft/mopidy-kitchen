/** @jsx React.DOM */
var React = require("react");
var _ = require("underscore");

var Track = React.createClass({
  propTypes: {
    track: React.PropTypes.object,
  },

  render: function () {
    var artists = _.without(_.union(
      _.map(this.props.track.artists, artist => artist.name),
      _.map(this.props.track.composers, composer => composer.name),
      _.map(this.props.track.album.artists, artist => artist.name)
    ), undefined, null);
    var renderedArtists = _.map(artists, 
      name => <span className="artist-name" key={name}>{name}</span>);
    return <div className="track">
      <div className="track-name">{this.props.track.name}</div>
      <div className="track-album-artist">
        {renderedArtists} - {this.props.track.album.name}
      </div>
    </div>;
  },
});

module.exports = Track;
