/**
 * custom (Google)Analytics for CocoonJS.
 * @author Arjan Kuijpers <arjankuijpers@live.nl>
 * @version 1.0.1
 * @license MIT
 */

/**
* Custom Analytics object, initialize this object.
* @constructor
* @param {int} trackingId The tracking ID to post to (received from google-analytics).
* @param {int} clientId ID to keep the devices apart from eachother.
*/
var CustomAnalytics = function(trackingId, clientId)
{
    this.trackingID = trackingId;
    this.AnalyticsURL = "https://google-analytics.com/collect";
    this.measurementVersion = 1;
    this.cid = clientId || 0;

    this.initialize();
};

CustomAnalytics.prototype = {
    /**
    * Initialize the CustomAnalytics Object.
    */
    initialize: function(){
        //init the Analytics
        console.log("CA: initialize Custom Analytics");
    },

    /**
    * Send Dimensions to Google Analytics, currently not implemented
    */
    setDimension: function(fieldName, value){
        console.log("CA: setDimension not implemented");
    },

    /**
    * Send a page view to Google Analytics
    */
    sendPageView:function(page){
        var params = "dh=CustomAnalytics.app&dp=" + page + "&dt="+page;
        this._postToService("pageview", params, null);
    },

    /**
    * Send a event to Google Analytics
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
        var params = "v="+this.measurementVersion+
            "&tid="+ this.trackingID+
            "&cid="+this.cid+
            "&t="+hitType+
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
        trackingPixel.src = this.AnalyticsURL + "?" + params;
        console.log(trackingPixel.src);
    }
};
