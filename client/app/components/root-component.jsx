import React from 'react';
import classNames from 'classnames';
import SearchBox from '../components/search-box-component.jsx'
import CarScreen from '../components/car-component.jsx'
import BusScreen from '../components/bus-component.jsx'
import WatchScreen from '../components/watch-component.jsx'
import Geo from '../helpers/geo';
import {testFunction} from '../helpers/testHelper';
import {busCall, getTrafficCall, getTestTrafficCall } from '../helpers/geo';
import * as actionCreators from '../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { 
  	screenReducer: state.screenReducer,
  	locationReducer: state.locationReducer,
  	srcReducer: state.srcReducer,
  	destinationReducer: state.destinationReducer,
  	carReducer: state.carReducer,
  	busReducer: state.busReducer,
  	watchReducer: state.watchReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch) 
}

class App extends React.Component {
	constructor(){
		super();
		 this.state = {
      src: '',
      destination: '',
    };
	}

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
						<input placeholder='From' value={this.state.src} onChange={(event) => { 
							this.setState({src: event.target.value});
							this.props.setSrcData(event.target.value);
					}} type="text" />
						<input placeholder='To' value={this.state.destination} onChange={(event) => { 
 							this.setState({destination: event.target.value});
							this.props.setDestinationData(event.target.value);
						}} type="text" />
						<div className='search__box-inner'>
							<img src='/images/car.svg' className={'search__button'} onClick={() => {

								if(this.state.src && this.state.destination) getTrafficCall(this.state.src, this.state.destination)
		            .then((resp) => {
		            	console.log("RESPONSE DATA");
		              this.props.setCarData(
		              	{
		              		title: "Mclaruen Rack",
		              		destination: "Detroit, Center!",
		              		danger: Math.floor(Math.random() * 100) + 1,
		              		progress: Math.floor(Math.random() * 100) + 1
		              	}		       
		              )
		              this.props.setScreenData(1);
		            }).catch((error)=>{
		            	console.log('RESPONSE in here with an error', error)
		            	this.props.setCarData(
		             	 	{
		              		title: "Monsaius Temple",
		              		destination: "Detroit, Center!",
		              		danger: Math.floor(Math.random() * 65) + 25,
		              		progress: Math.floor(Math.random() * 65) + 25
		              	}		       
		              )
		            	this.props.setScreenData(1);
		            	return error;
		            }); 
							}} ></img>
							<img src='/images/bus.svg' className={'search__button'} onClick={() => {
								getTestTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(2);
		            }); 
							}} ></img >
							<img src='/images/position.png' className={'search__button'} onClick={() => {
								getTestTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(2);
		            }); 
							}} ></img >
							<img src='/images/uber2.png' className={'search__button'}></img>
								<button src='/images/uber2.png' className={'watch__button'} onClick={() => {
								getTestTrafficCall()
		            .then((geo) => {
		              this.props.setScreenData(5);
		            }).catch((error)=>{
		            	console.log('RESPONSE in here with an error', error)
		            	this.props.setScreenData(5);
		            	return error;
		            }); 
							}} >Watch Mode</button>
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
				<button 
							className='search__button'
							onClick={() => {this.props.setScreenData(0)}}
						>Back
				</button>
				<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
				<div className='search__box'>
					<div className='search__box-inner'>
						<CarScreen
							carData={this.props.carReducer}
						/>
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
					<button 
							className='search__button'
							onClick={() => {this.props.setScreenData(0)}}
						>Back
					</button>
					<h1 className={searchClass}> Detroit Destination Safety Planner! </h1>
					<div className='search__box'>
						<div className='search__box-inner'>
							<BusScreen
								busData={this.props.busReducer}
							/>
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
						<button 
							className='search__button'
							onClick={() => {this.props.setScreenData(0)}}
						>Back
						</button>
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
								<WatchScreen/>
							</div>
							<button 
							className='watch__button'
							onClick={() => {this.props.setScreenData(0)}}
							>Stop Watching
						</button>
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
			case 5:
				return (
					<div>
						{ this.renderFifthScreen() }
					</div>
				)
				break;
			default:
				return (
					<div>
						{ this.renderFifthScreen() }
					</div>
				)
				break;
		}
  }
}

App.propTypes = {
    screenReducer: React.PropTypes.number,

    // Actions
    setScreenData: React.PropTypes.func,
    setLocationData: React.PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
