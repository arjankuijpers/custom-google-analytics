/**
 * @author Arjan Kuijpers <arjankuijpers@live.nl>
 */


CustomAnalytics = function(trackingId, clientId, osInfo, language)
{
    this.trackingID = trackingId;
    this.AnalyticsURL = "https://google-analytics.com/collect";
    this.measurementVersion = 1;
    this.cid = clientId || 0;
	this.ul = language || this._getLanguage();
	this.osInfo = osInfo || "null";
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
			"&cm[1][0]*=" + this.osInfo +
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
    },
	
	_getLanguage: function() {
		return navigator.language ? navigator.language : null;
	},
	
	setupOS: function(osString) {
		this.osInfo = osString;
	},
}