function Submit() {
    return (
        <div className="p-4">
            <label for="formFileLg" className="form-label mt-4">Upload your assignment here</label>
            <input className="form-control form-control-lg w-50 " id="formFileLg" type="file"/>
            <div className= "mt-4">
                <button type="button" className="btn btn-primary btn-lg">Submit</button>
            </div>
        </div>
        
    )
}

export default Submit;