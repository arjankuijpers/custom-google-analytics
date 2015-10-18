<?php
	$customAnalyticsURL = "https://google-analytics.com/collect";
	
	$path = $_SERVER["REQUEST_URI"];
	#$params = substr($path, 1, strlen($path));
	
	$temp = explode(".php", $path);
	$params = $temp[1];
	
	$response = file_get_contents($customAnalyticsURL . $params);
	
	http_response_code(200);
	echo "OK";
	echo "<br>" . $customAnalyticsURL . $params . "<br>GAS_RESPONSE: " . $response;
	
	exit
?> 