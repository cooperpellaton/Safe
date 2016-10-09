import React from 'react';
import classNames from 'classnames';
import SearchResult from './search-result-component.jsx';
import {testFunction} from '../helpers/testHelper';

class BusScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  propTypes: {
    busData: React.PropTypes.obj,
  } // Indicents Accidents Bus Time Waiting Time Danger Meter
  
  render() {

  	let busClass = classNames({
	    'bus__screen': true,
    });

    const busStyle1 = {
      width:'100%',
      height:'100%'
    }

    const busStyle2 = {
      'margin-bottom':'20px'
    }

     const busStyle3 = {
      position:'relative',
      width:'90%', 
      margin:'auto',
      'margin-bottom' :'10px',
    }

    const busStyle4 = {
      position:'relative',
      width:'90%', 
      margin:'auto',
      'margin-bottom':'10px',
    }

    const busStyle5 = {
      'min-height':'30px',
      'width':'100%',
      'margin-bottom':'10px',
      'border-radius':'5px',
    }

    const busStyle6 = {
      'border-radius':'5px',
      'border':'none',
      'padding-top':'5px',
      'padding-bottom':'3px',
      'width':'98%',
      'background':'#0055ff',
      'color':'#FFF',
      'font-size':'14pt',
      'box-shadow': '4px 4px 0px #3a6fda'
    }

    const dangerStyle ={
      width: (Math.floor(Math.random() * 65) + 35) + "%"
    }

    return (
    <div>
      <div className="map-header">
        <img src="client/app/images/maps-att.png" style={busStyle1}></img>
      </div>
      <div className="info-bus">
        <p>Waiting Time: {"17 Min"} </p>
        <p>Bus station: {"Harvard Way"} </p>
      </div>

    <div className="infos-ml" style={busStyle2}>
      <div className="safety">
        <h3>Danger meter</h3>
        <div className="dangerbar">
          <div style={dangerStyle}>
          </div>
        </div>
      </div>
    </div>
    
    <div style={busStyle4}>
      <h3>Stay Safe</h3>
    </div>
    
    <div className="real-time">
      <div className="add-comment">
        <textarea name="comment" style={busStyle5} placeholder="Add a safe spot next to this station"></textarea>
        <button className="add-butt"  style={busStyle6}>Comment</button>
      </div>
    </div>
  </div>

    );
  }
};

BusScreen.defaultProps = {

};

export default BusScreen;