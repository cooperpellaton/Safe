# !Safe
A product of [MHacks 8](https://mhacks.org/).

By Ali Behlalah, Budi Ryan, Aaron Hsu and Cooper Pellaton

## Table of Contents
- [Overview](#overview)
- [Explanation](#explanation)
- [Getting Started](#getting-started)
- [API](#api)

## Overview
We were posed a problem by both Ford and Devpost, that the city of Detroit is not currently safe to travel in for many of it's residents, and that there is a potential to enable better transit through technology, but it doesn't currently exist. Taking this to mind as well as the data sets that were [provided](http://mhacks8.devpost.com/details/ford) to us, we created an application to solve this problem.

Welcome *!Safe*, a platform to best help you get from Point A --> Point B in the city of Detroit.

View the following screenshots of the application in action:
![](assets/index.png)
![](assets/schedule.png)
![](assets/bus.png)

## Explanation
Detroit is not a safe city, we all know this, so we began by writing some ML models to help calculate the apparent risk and danger associated with travelling along a certain route. These models are composed with a number of data sets, but at the highest level we mix user related stastics with city crime data, weather data, traffic data, etc. to determine what the potential downsides of travelling amongst a certain path are.

To effecitvely serve the user, when they input a source and destination in our application we run a probability of this inforamtion through our model and then use this to inform how we will suggest the user to travel. For instance, if there is a significantly high likelihood of crime occuring on a certain street, yet that is the route suggested by Google Maps, we will deviate and reroute the user so that their safety is guaranteed.

Furthermore, we support a myriad of travel types including Public and Non-Public transport. This means that we can tell you how late your Detroit, public-run, bus will be and then suggest to you a safe place to wait just as well as we can suggest to you the safest & most efficient way to bike || walk || drive through Detroit.

## Getting Started
We've included all the code that you should need to be able to run this application for yourself in this repository. To begin, start by cloning this repository and then `cd` to it.

Run `npm install && nodemon app.js`. You now have our server running and can access the application on `localhost:3000`. If you want you can try to send some queries to our APIs using Postman. See the section below on the APIs and the sample data you can get in and out.

The rest should be pretty self-explanatory. If you're reading this you know how something like this would work. Just read through [app.js](app.js) where the core of the application is defined.

## API
