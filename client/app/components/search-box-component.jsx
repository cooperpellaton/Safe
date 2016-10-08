import React from 'react';
import classNames from 'classnames';
import SearchResult from './search-result-component.jsx';
import {testFunction} from '../helpers/testHelper';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  propTypes: {
    trafficData: React.PropTypes.array,
  }
  
  render() {

  	let searchClass = classNames({
	    'search__box': true,
	  });

	  let searchResultClass = classNames({
	    'search__result': true,
	  });

	  // var stationComponents = this.props.stations.map(function(station) {
    //     return <div className="station">{station.call}</div>;
    // });

    if (!this.props.trafficData) return;

    return (
      <div className={searchClass} >
      	<div className={searchResultClass}>
	    	 { "Location" + " : " + "Title" + " : " + "Destination" }
	      </div>
    	{
    		this.props.trafficData.map( (data, index) => {
      		return (<SearchResult
      			key={index}
      			location={data.location}
      			title={data.title}
      			destination={data.destination}
      		/>)
				})
    	}
      </div>
    );
  }
};

SearchBox.defaultProps = {

};

export default SearchBox;