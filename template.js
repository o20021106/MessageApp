export default ({ body, title ,initialState}) => {
  return `
    <!DOCTYPE html>
    <html style = 'width:100%; margin : 0px'>
		<head>
			<link rel="stylesheet" href="/web-fonts-with-css/css/fontawesome-all.min.css">	
			<meta name= 'viewport' content = 'width = device-width, initial-scale=1'>
			<script>window.__APP_INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
			</head>
		<body style = 'width:100%; margin : 0px'>

		<div id = 'root' style = 'width:100%; margin : 0px'>
			${body}
		</div>
			<script src = '/editProfileBundle.js'></script> 

		</body>
	</html>
	`;
}