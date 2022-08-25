import {Link} from 'react-router-dom';

function Result() {
	return (
		<div className="p-4">
			<ul className="list-group">
				<li className="list-group-item">Result Blehh</li>
			</ul>
			<div className= "mt-4">
				<Link to='/submit'><button type="button" className="btn btn-primary btn-lg">Submit again</button></Link>
			</div>
		</div>
		
	)
}

export default Result;