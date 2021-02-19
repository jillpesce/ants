function FileUpload(props) {
    const hiddenFileInput = React.useRef(null)
    const { children, handleFile } = props

    function handleClick(event) {
        hiddenFileInput.current.click()
    }

    function handleChange(event) {
        const file = event.target.files[0]
        handleFile(file)
    }

    return (
        <div className="clickable" onClick={handleClick}>
            <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div className="button purple">Upload Image</div>
        </div>
    )
}

export default FileUpload
