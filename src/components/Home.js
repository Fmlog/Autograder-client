import {Link} from 'react-router-dom';
import {useEffect} from 'react';
function Home() {
  useEffect(() => {
    document.title='Autograder'
  });
  return (
    <div className="container mt-4">
      {/* Course Apis*/}
      <h3 className="pb-1 mb-4"> Course Apis</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <Link to="/login"><img src="..." class="card-img-top" alt="..."/></Link>
            <div className="card-body">
              <h5 className="card-title"><a href="#">Course Title</a></h5>
            </div>
          </div>
        </div>
      </div>
      {/* End Course Apis */}
    </div>
  );
}

export default Home;
