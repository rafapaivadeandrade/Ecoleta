import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'
import './index.css'

interface Props{
  onFileUploaded: (file: File) => void
}

const Dropzone:  React.FC<Props> = ({onFileUploaded}) => {
  const[selectedFile,setSelectedFile] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileurl = URL.createObjectURL(file);

    setSelectedFile(fileurl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {selectedFile
      ?<img src={selectedFile} alt="Point Thumbnail"/>:(
        <p>
        <FiUpload />
        Drop the image here...</p>
      )}
     
    </div>
  )
}

export default Dropzone;