import { createAction } from 'redux-actions';
import React, { Component, PropTypes } from 'react';

export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';
export const setLocationData = createAction('SET_LOCATION_DATA', (geo, source, destination) => 
	{
		return ({
			geo,
			source,
			destination
		})
	}
);

export const SET_SCREEN_DATA = 'SET_SCREEN_DATA';
export const setScreenData = createAction('SET_SCREEN_DATA', (screenNumber) => 
	{
		return ({
			screenNumber
		})
	}
);

