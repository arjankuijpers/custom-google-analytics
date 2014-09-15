/**
 * custom (Google)Analytics for CocoonJS. 
 * @author Arjan Kuijpers <arjankuijpers@live.nl>
 */

/** @constructor */
var CustomAnalytics = function(trackingId, clientId)
{
    this.trackingID = trackingId;
    this.AnalyticsURL = "https://google-analytics.com/collect";
    this.measurementVersion = 1;
    this.cid = clientId || 0;
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
        var params = "dh=powermahjongdeluxe.app&dp=" + page + "&dt="+page;
        this._postToService("pageview", params, null);
    },
    
    sendEvent: function(category, action, label, value){
        var params = "ec="+category+"&ea="+action+"&el="+label+"&ev="+value;
        this._postToService("event", params, null);
    },
    
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
        }
        trackingPixel.onerror = function()
        {
            console.log("trackingPixel onerror" );
        }
        trackingPixel.src = this.AnalyticsURL + "?" + params;
        console.log(trackingPixel.src);
    }
}