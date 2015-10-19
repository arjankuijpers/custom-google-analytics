/*! custom-google-analytics - v1.0.0 - 2015-10-19
* https://bitbucket.org/arjankuijpers/customanalytics#readme
* Copyright (c) 2015 Arjan Kuijpers; Licensed MIT */
/**
* Custom Analytics object, initialize this object.
* @constructor
* @param {int} trackingId The tracking ID to post to (received from google-analytics).
* @param {int} clientId ID to keep the devices apart from eachother.
* @param {boolean} proxy If it should use the proxy service, this is usefull to escape from adblockers.
*/
var CustomAnalytics = function(trackingId, clientId, proxy)
{
    this.trackingID = trackingId;
    this.proxyURL = "https://custom-g-ana-proxy.herokuapp.com"; // Specify here your proxy adress, if you use your own instance.
    this.AnalyticsURL = "https://google-analytics.com/collect";
    this.measurementVersion = 1;
    this.cid = clientId || 0;
    this.proxy = proxy || false;

    this.initialize();
};

CustomAnalytics.prototype = {
    /**
    * Initialize the CustomAnalytics Object.
    */
    initialize: function(){
        //init the Analytics
        console.log("CA: initialize Custom Analytics");
        console.log("CA: Proxy enabled: " + this.proxy);
    },

    /**
    * Send Dimensions to Google Analytics, currently not implemented
    * @param {string} fieldName Key to send to analytics service (example: user_agent_string).
    * @param {string} value Value to send to analytics service.
    */
    setDimension: function(fieldName, value){
        console.log("CA: setDimension not implemented");
    },

    /**
    * Send a page view to Google Analytics
    * @param {string} page Page name to send to analytics service.
    */
    sendPageView:function(page){
        var params = "dh=CustomAnalytics.app&dp=" + page + "&dt="+page;
        this._postToService("pageview", params, null);
    },

    /**
    * Send a event to Google Analytics
    * @param {string} category The category the event belongs to.
    * @param {string} action What action the event belongs to.
    */
    sendEvent: function(category, action, label, value){
        var params = "ec="+category+"&ea="+action+"&el="+label+"&ev="+value;
        this._postToService("event", params, null);
    },

    /**
    * This is an system function, do NOT call this function, but use other functions that call this function internally.
    * @private
    */
    _postToService: function(hitType, aditionalParams, callback){

        // Create a random variable string, to prevent caching by the browser.
        var randomCB = Math.round(Math.random() * 10000);

        var params = "v="+this.measurementVersion+
            "&tid="+ this.trackingID+
            "&cid="+this.cid+
            "&t="+hitType+
            "&z="+randomCB+
            "&"+aditionalParams;


        var trackingPixel = new Image();
        trackingPixel.onload = function()
        {
            console.log("trackingPixel onload" );
        };
        trackingPixel.onerror = function()
        {
            console.log("trackingPixel onerror" );
        };
        trackingPixel.src = (this.proxy ? this.proxyURL : this.AnalyticsURL) + "?" + params;
        console.log(trackingPixel.src);
    }
};
