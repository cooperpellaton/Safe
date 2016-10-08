import React from 'react';
import classNames from 'classnames';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

  	let searchClass = classNames({
	    'search__box': true,
	  });

	  // var stationComponents = this.props.stations.map(function(station) {
    //     return <div className="station">{station.call}</div>;
    // });

    return (
      <div className={searchClass} >
    	
      </div>
    );
  }
}

export default SearchBox;