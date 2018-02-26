export default (html, finalState, radiumProp,script) => {

  return `
    <!DOCTYPE html>
    <html style = 'width:100%; margin : 0px; height: 100vh'>
		<head>
			<link rel="stylesheet" href="testing.css">	
			<link rel="stylesheet" href="/fontawesome-free-5.0.2/web-fonts-with-css/css/fontawesome-all.min.css">	
			<link rel="stylesheet" href="/line-awesome/css/line-awesome-font-awesome.min.css">	
			<meta name= 'viewport' content = 'width = device-width, initial-scale=1'>
			<script>window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}</script>
			<script>window.__RADIUM_PROP__ = ${JSON.stringify(radiumProp).replace(/</g, '\\u003c')}</script>

			</head>
		<body style = 'width:100%; margin : 0px; height:100%'>
		<div id = 'root' style = 'width:100%; height:100%; margin : 0px'>${html}</div>
		<script src = '/${script}.js'></script> 
		</body>
	</html>
	`;
}

//			<link rel="stylesheet" href="/web-fonts-with-css/css/fontawesome-all.min.css">	
