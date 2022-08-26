import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/';
function Test() {
    const [test, setTest]=useState(null);
    useEffect(()=>{
        axios.get(baseUrl+'').then((response)=>{
            setTest(response.data);
        });
    }, []);
    console.log(test);
	return (
		<div className="p-4">
			<ul className="list-group">
				<li className="list-group-item">Test</li>
			</ul>
		</div>
		
	)
}

export default Test;