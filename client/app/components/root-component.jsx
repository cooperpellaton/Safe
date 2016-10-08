import React from 'react';
import classNames from 'classnames';
import SearchBox from '../components/search-box-component.jsx'
import Geo from '../helpers/geo';
import {testFunction} from '../helpers/testHelper';
import {trafficCall} from '../helpers/geo';
import * as actionCreators from '../actions/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { 
  	screenNumber: state.screenNumber,
  	geo: state.geoNumber,
  	src: state.src,
  	destination: state.destination,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

class App extends React.Component {
	
  render () {
	  let searchClass = classNames({
	    'search__title': true,
	  });

    return (
			<div>
				<h1 className={searchClass}> Suggest Traffic Data! </h1>
				<SearchBox 
					trafficData={
				    [
							{
								location: "Harvard",
								title: "Professor",
								destination: "Detroit"
							},
							{
								location: "MIT",
								title: "Professor",
								destination: "Michigan"
							},
							{
								location: "Bay Area",
								title: "Student",
								destination: "Random"
							}
						]
					}
				/>
				<div className='search__box'>
					<input placeholder='Src' type="text" />
					<input placeholder='Destination' type="text" />
					<button className={'search__button'} onClick={() => {
						trafficCall()
            .then(function(geo){
              this.props.actions.setScreenData(2);
            }); // TODO emit
					}} > Find Traffic </button>
				</div>
			</div>
		)
  }
}

App.propTypes = 
{
    Screen: React.PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
