import { createAction } from 'redux-actions';
import React, { Component, PropTypes } from 'react';

export const SET_LOCATION_DATA = 'SET_LOCATION_DATA';
export const setLocationData = createAction(SET_LOCATION_DATA);

export const SET_SRC_DATA = 'SET_SRC_DATA';
export const setSrcData = createAction(SET_SRC_DATA);

export const SET_DESTINATION_DATA = 'SET_DESTINATION_DATA';
export const setDestinationData = createAction(SET_DESTINATION_DATA);

export const SET_SCREEN_DATA = 'SET_SCREEN_DATA';
export const setScreenData = createAction(SET_SCREEN_DATA);

export const SET_BUS_DATA = 'SET_BUS_DATA';
export const setBusData = createAction(SET_BUS_DATA);

export const SET_CAR_DATA = 'SET_CAR_DATA';
export const setCarData = createAction(SET_CAR_DATA);

export const SET_WATCH_DATA = 'SET_WATCH_DATA';
export const setWatchData = createAction(SET_WATCH_DATA);
