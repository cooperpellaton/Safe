import React from 'react';
import classNames from 'classnames';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }

  propTypes: {
    location: React.PropTypes.string,
    title: React.PropTypes.string,
    destination: React.PropTypes.string,
  }
  
  render() {

  	let searchResultClass = classNames({
	    'search__result': true,
	  });

	  // var stationComponents = this.props.stations.map(function(station) {
    //     return <div className="station">{station.call}</div>;
    // });

    return (
      <div className={searchResultClass}>
    	 { this.props.location + " : " + this.props.title + " : " + this.props.destination }
      </div>
    );
  }
};

SearchResult.defaultProps = {

};

export default SearchResult;