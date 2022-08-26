function Question() {
    return (
      <form>
        <div className="mb-3">
          <label for="name" className="form-label">username</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">Full  Name not required</div>
        </div>
        <div className="mb-3"></div>
        <div className="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">Authenticate with your LMS instead</div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="signedIn"/>
          <label className="form-check-label" for="signedIn">Stay signed in</label>
        </div>
        <button type="submit" className="btn btn-primary">Create Question</button>
      </form>
    )
  }
  export default Question;