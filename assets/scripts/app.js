var App = React.createClass({
	render : function() {
		return (
			<Div>
				<SampleBox text="こんにちは" />
			</Div>
		);
	}
});

var SampleBox = React.createClass({
	render : function() {
		return (
				<p>{props.text}</p>
		);
	}
});

var app = React.render(<App />, document.getElementById('root'));
