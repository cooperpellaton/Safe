import React from 'react';
import classNames from 'classnames';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

  	let mapClass = classNames({
	    'search__map-active': true,
      'search__map-active': false
	  });

	  // var stationComponents = this.props.stations.map(function(station) {
    //     return <div className="station">{station.call}</div>;
    // });

    return (
      <div className={mapClass} >
    	   <img></img>
      </div>
    );
  }
}

Map.propTypes = {

};
Map.defaultProps = {

};

export default Map;