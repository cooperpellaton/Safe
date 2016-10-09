import React from 'react';
import classNames from 'classnames';
import SearchResult from './search-result-component.jsx';
import {testFunction} from '../helpers/testHelper';

class CarScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  propTypes: {
    carData: React.PropTypes.obj,
  } // Indicents Accidents

  render() {
   const carStyle1 = {
      width:'100%',
      height:'100%'
    }

    const carStyle2 = {
      'marginBottom':'20px'
    }
    
    const carStyle3 = {
      position: 'Relative', 
      width: '90%', 
      margin: 'auto', 
      'marginBottom': '10px'
    }

  	let carClass = classNames({
	    'car__screen': true,
    });

    return (
    <div>
      <div className="map-header">
      <img src="client/app/images/maps-att.png" style={carStyle1}></img>
      </div>

      <div className="infos-ml" style={carStyle2}>
        <div className="risk">
        <h3>Accident risk</h3>
        <div className="progress-risk">
          <div className="rp"></div>
        </div>
        </div>
        <div className="safety">
          <h3>Danger meter</h3>
          <div className="danger-risk">
            <div className="dp"></div>
          </div>
        </div>
      </div>

      <div style={carStyle3}>
        <h3>Live Information</h3>
      </div>
      <div className="real-time">
        <div className="info">
          <h4>MI-25 WB between Gardner Line Rd and Burns Line Rd</h4>
          <p>Closed in Sanilac on MI-25 WB between Gardner Line Rd and Burns Line Rd, stopped traffic back to Gardner Line Rd</p>
        </div>
        <div className="info">
          <h4>MI-25 WB between Gardner Line Rd and Burns Line Rd</h4>
          <p>Closed in Sanilac on MI-25 WB between Gardner Line Rd and Burns Line Rd, stopped traffic back to Gardner Line Rd</p>
        </div>
        <div className="info">
          <h4>MI-25 WB between Gardner Line Rd and Burns Line Rd</h4>
          <p>Closed in Sanilac on MI-25 WB between Gardner Line Rd and Burns Line Rd, stopped traffic back to Gardner Line Rd</p>
        </div>
        <div className="info">
          <h4>MI-25 WB between Gardner Line Rd and Burns Line Rd</h4>
          <p>Closed in Sanilac on MI-25 WB between Gardner Line Rd and Burns Line Rd, stopped traffic back to Gardner Line Rd</p>
        </div>
        <div className="info">
          <h4>MI-25 WB between Gardner Line Rd and Burns Line Rd</h4>
          <p>Closed in Sanilac on MI-25 WB between Gardner Line Rd and Burns Line Rd, stopped traffic back to Gardner Line Rd</p>
        </div>
        </div>
      </div>
    )
  }

};

CarScreen.defaultProps = {

};

export default CarScreen;