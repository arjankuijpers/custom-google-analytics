/**
* @author Arjan Kuijpers <arjankuijpers@live.nl>
*/

//Distlib branch!

CustomAnalytics = function(trackingId, clientId, osInfo, language)
{
  this.trackingID = trackingId;
  this.AnalyticsURL = "https://google-analytics.com/collect";
  this.measurementVersion = 1;
  this.cid = clientId || 0;
  this.ul = language || this._getLanguage();
  this.osInfo = osInfo || "null";

  this.initialize();
}

CustomAnalytics.prototype = {
  initialize: function(){
    //init the Analytics
    console.log("CA: initialize Custom Analytics");
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
    var params = "v="+this.measurementVersion +
    "&tid="+ this.trackingID +
    "&cid="+this.cid +
    "&t="+hitType +
    "&ul="+this.ul +
    "&cm[1][0]*=" + this.osInfo + // Custom metric, you can specify it with what you want.
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
