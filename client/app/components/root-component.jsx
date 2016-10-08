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
  return bindActionCreators(actionCreators, dispatch) 
}

class App extends React.Component {
	
	renderTrafficData() {
	  return (
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
	  	)
	}

  render () {
	  let searchClass = classNames({
	    'search__title': true,
	  });

    return (
			<div>
				<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
				{this.renderTrafficData()}
				<div className='search__box'>
					<input placeholder='Src' type="text" />
					<input placeholder='Destination' type="text" />
					<button className={'search__button'} onClick={() => {
						trafficCall()
            .then((geo) => {
              this.props.setScreenData(1);
            }); 
					}} > Find Traffic </button>
					<button className={'search__button'} onClick={() => {
						trafficCall()
            .then((geo) => {
              this.props.setScreenData(2);
            }); 
					}} > Bus Traffic </button>
					<button className={'search__button'} onClick={() => {
						trafficCall()
            .then((geo) => {
              this.props.setScreenData(3);
            }); 
					}} > Bike Traffic </button>
					<button className={'search__button'} onClick={() => {
						trafficCall()
            .then((geo) => {
              this.props.setScreenData(4);
            }); 
					}} > Uber App </button>
				</div>
			</div>
		)
  }
}

App.propTypes = 
{
    ScreenNumber: React.PropTypes.number,

    // Actions
    setScreenData: React.PropTypes.func,
    setLocationData: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
