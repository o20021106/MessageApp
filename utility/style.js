
exports.hideIfBig= {
	'@media (min-width : 480px)':{
			display:'none'
	}
}

exports.showIfBigBlock={
	display:'none',
	'@media (min-width : 480px)':{
		display:'block'
	}
}

exports.showIfBigInline={
	display:'none',
	'@media (min-width : 480px)':{
		display:'inline'
	}
}
exports.buttonStyle = {
	textAlign:'center', 
	backgroundColor:'rgb(177, 146, 89)',
	padding:10, 
	width:'100%',
	boxSizing:'border-box',
	borderStyle:'none',
	borderRadius: 3,
	color:'white',
	cursor:'pointer',
	font:'400 15px helvetica',
	':hover': {
        backgroundColor:'rgb(121,121,121)'
    },
    '@media (min-width : 480px)':{
    	backgroundColor :'rgb(174, 174, 174)'
	}
}

exports.textButtonStyle = {
	textAlign:'center', 
	color:'rgb(195, 195, 195)',
	width:'100%',
	borderStyle:'none',
	cursor:'pointer',
	':hover': {
        color:'rgb(174, 174, 174)'
    },

}

exports.hrStyle = {
	display: 'block', 
	height: 1, 
	border: 0,
	borderTop: '1px solid #ccc', 
	borderBottom: 0, 
	borderLeft: 0, 
	borderRight: 0
}
exports.plainBoxStyle = {
	height:'100%',
	margin:0,
	boxSizing:'border-box',
	padding:'30px 30px 30px 30px',
	flex:1,
	overflowY:'scroll',
	width:'100%',
	borderRadius:5,
	alignSelf:'flex-start',
	boxShadow: 'rgba(0, 0, 0, 0.17) 2px 2px 10px',
	'@media (min-width : 480px)':{
		maxWidth:480,
		marginTop:50,
		overflowY:'visible',
		height:'auto',
		backgroundColor: 'white',

	}
}

exports.RLouterBoxStyle = {	
	backgroundImage: 'url("/image/register-login-background.jpg")',
	backgroundSize:'cover',
	display:'flex',
	width :'100%',
	justifyContent:'center', 
	height:'100%',
}
exports.RLinputItemBoxStyle = {
	display:'flex', 
	alignItems:'center', 
	color:'rgb(177, 146, 89)',
	'@media (min-width : 480px)':{
		color:'#8a8888',
	}
}
exports.RLinputBoxStyle = {
	flex:1, minWidth:0,  
	borderBottom: '1px solid #cacaca',
	borderTop:0, 
	borderLeft:0, 
	borderRight:0,
	backgroundColor:'white', 
	padding:10, 
	marginLeft:20
};