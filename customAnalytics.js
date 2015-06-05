/**
* @author Arjan Kuijpers <arjankuijpers@live.nl>
* @version 0.0.1.0
*/

//Distlib branch!
/*
*  custom API for google-analytics service.
* @param {int} trackingId The tracking ID to post to.
* @param {int} clientId ID to keep the device apart from eachother.
* @param osInfo String that should be set to the OS that is currently running.
* @param language language that the device is set.
*/
CustomAnalytics = function(trackingId, clientId, osInfo, language)
{
  this.trackingID = trackingId;
  this.AnalyticsURL = "https://google-analytics.com/collect";
  this.measurementVersion = 1;
  this.cid = clientId || 0;
  this.ul = language || this._getLanguage();
  this.osInfo = osInfo || "null";
  this.screenRes = null;

  this.initialize();
}

CustomAnalytics.prototype = {

  /*
  * initializes the customAnalytics object.
  */
  initialize: function(){
    //init the Analytics

    console.log("CA: initialize Custom Analytics");
    this.screenRes = window.screen.width + "x" + window.screen.height;
  },

  setDimension: function(fieldName, value){
    console.log("CA: setDimension not implemented");
  },

  sendPageView:function(page){
    var params = "dh=CustomAnalytics.app&dp=" + page + "&dt="+page;
    this._postToService("pageview", params);
  },

  sendEvent: function(category, action, label, value){
    var params = "ec="+category+"&ea="+action+"&el="+label+"&ev="+value;
    this._postToService("event", params);
  },

  _postToService: function(hitType, aditionalParams, callback) {
    var randomCB = Math.round(Math.random() * 10000);
    var params = "v="+this.measurementVersion +
    "&tid="+ this.trackingID +
    "&cid="+this.cid +
    "&t="+hitType +
    "&ul="+this.ul +
    "&z="+randomCB +
    "&sr="+this.screenRes +
    "&ds=" + this.osInfo + // osInfo, should define Android or IOS.
    "&"+aditionalParams;


    var trackingPixel = new Image();
    trackingPixel.onload = function()
    {

      console.log("trackingPixel: post success." );
    }
    trackingPixel.onerror = function()
    {

      console.log("trackingPixel: post failed (offline ?)." );
    }

    trackingPixel.src = this.AnalyticsURL + "?" + params;
    //console.log(trackingPixel.src);
  },

  _getLanguage: function() {

    return navigator.language ? navigator.language : null;
  },

  /*
  * Should set the OS the game is currently running on.
  * @param {string} osString String that should be set to the OS that is currently running.
  */
  setupOS: function(osString) {
    this.osInfo = osString;
  },
};




// overwrite the distlib functions.
(function() {
  console.log("try to overwrite distlib");

  if((typeof DistLib.GoogleAnalytics === "undefined")) {
    console.error("Distlib not yet loaded, this needs to be loaded after distlib");
    return false;
  }

  DistLib.GoogleAnalytics.prototype.initialize = function() {
    var trackingId = this._trackingId;
    var clientId = CC.getClientId();
    var osInfo = navigator.platform;
    var language = navigator.language;

    this.ca = new CustomAnalytics(trackingId, clientId, osInfo, language);
  }

  DistLib.GoogleAnalytics.prototype.setDimension = function(fieldName, value) {

    this.ca.setDimension(fieldName, value);
  }

  DistLib.GoogleAnalytics.prototype.sendPageView = function(page) {

    this.ca.sendPageView(page);
  }

  DistLib.GoogleAnalytics.prototype.sendEvent = function(category,action,label,value) {

    this.ca.sendEvent(category,action,label,value);
  }

})();
