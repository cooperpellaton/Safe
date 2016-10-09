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

    const progressStyle ={
      width: (Math.floor(Math.random() * 65) + 35) + "%"
    }

    const dangerStyle ={
      width: (Math.floor(Math.random() * 65) + 35) + "%"
    }

  	let carClass = classNames({
	    'car__screen': true,
    });

    return (
    <div>
      <div className={'geo__tracker'}>
      Tracker On...
      </div>
    </div>
    )
  }

};

CarScreen.defaultProps = {

};

export default CarScreen;