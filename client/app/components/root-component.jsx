import React from 'react';
import classNames from 'classnames';
import SearchBox from '../components/search-box-component.jsx'
import CarScreen from '../components/car-component.jsx'
import BusScreen from '../components/bus-component.jsx'
import Geo from '../helpers/geo';
import {testFunction} from '../helpers/testHelper';
import {busCall, getTrafficCall} from '../helpers/geo';
import * as actionCreators from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
  	screenReducer: state.screenReducer,
  	locationReducer: state.locationReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch) 
}

class App extends React.Component {

	renderTrafficData() {
	  return (
			<SearchBox 
					trafficData= {
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

	renderFirstScreen() {
		let searchClass = classNames({
	    'search__title': true,
	  });

		return (
			<div>
				<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
					<div className='search__box'>
						<input placeholder='Src' value={this.state.src} onChange={(event) => { this.setState({src: event.value})}} type="text" />
						<input placeholder='Destination' value={this.state.destination} onChange={(event) => { this.setState({destination: event.value})}} type="text" />
						<div className='search__box-inner'>
							<img src='/images/car.svg' className={'search__button'} onClick={() => {
								getTrafficCall(this.state.src, this.state.destination)
		            .then((geo) => {
		              this.props.setScreenData(1);
		            }); 
							}} ></img>
							<img src='/images/bus.svg' className={'search__button'} onClick={() => {
								getTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(2);
		            }); 
							}} ></img >
							<img src='/images/position.png' className={'search__button'} onClick={() => {
								getTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(3);
		            }); 
							}} ></img >
							<img src='/images/uber2.png' className={'search__button'} onClick={() => {
								getTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(4);
		            }); 
							}} ></img>
						</div>
					</div>
				</div>
			)
	}

	renderSecondScreen() {
		let searchClass = classNames({
	    'search__title': true,
	  });
		return (
			<div>
				<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
				<div className='search__box'>
					<div className='search__box-inner'>
						<CarScreen/>
					</div>
				</div>
			</div>
		)
	}

	renderThirdScreen() {
		let searchClass = classNames({
	    'search__title': true,
	  });
		return (
				<div>
					<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
					<div className='search__box'>
						<div className='search__box-inner'>
							<BusScreen/>
						</div>
					</div>
				</div>
		)
	}

	renderFourthScreen() {
		let searchClass = classNames({
	    'search__title': true,
	  });
		return (
					<div>
						<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
						<div className='search__box'>
							<div className='search__box-inner'>
								<CarScreen/>
							</div>
						</div>
					</div>
				)
	}

	renderFifthScreen() {
		let searchClass = classNames({
	    'search__title': true,
	  });
		return (
					<div>
						<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
						<div className='search__box'>
							<div className='search__box-inner'>
								<CarScreen/>
							</div>
						</div>
					</div>
				)
	}

  render () {
	  let searchClass = classNames({
	    'search__title': true,
	  });

	  console.log("SCREEN DATA " + this.props.locationReducer + " " + this.props.screenReducer);

	  let screenTest = this.props.screenReducer;

	  switch (screenTest) {
		  case 0:
		    return (
					<div>
						{ this.renderFirstScreen() }
					</div>
				)
				break;
			case 1:
				return (
					<div>
						{ this.renderSecondScreen() }
					</div>
				)
			case 2:
				return (
					<div>
						{ this.renderThirdScreen() }
					</div>
				)
			case 3:
				return (
					<div>
						{ this.renderFourthScreen() }
					</div>
				)
				break;
			case 4:
				return (
					<div>
						{ this.renderFifthScreen() }
					</div>
				)
				break;
			default:
				return (
					<div>
						{ this.renderFirstScreen() }
					</div>
				)
				break;
		}
  }
}

App.propTypes = {
    ScreenNumber: React.PropTypes.number,

    // Actions
    setScreenData: React.PropTypes.func,
    setLocationData: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
