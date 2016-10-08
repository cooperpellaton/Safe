import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import classNames from 'classnames';
import SearchBox from './components/search-box-component.jsx'
import './styles/search.css';

class App extends React.Component {
	
  render () {

	  let searchClass = classNames({
	    'search__title': true,
	  });

    return (<div>
    					<h1 className={searchClass} > Hello React! </h1>
    					<SearchBox />
    					<button className={'search__buttn'} onClick={() => {}}>Working</button>
    				</div>
    				)
  }
}

render(<App/>, document.getElementById('root'));