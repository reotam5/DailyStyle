import axios from 'axios';
 
import React,{Component} from 'react';
 
class AddNewClothes extends Component {
    state = {
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
      console.log("Hello World");
    };
    render() {
      return (
        <div>
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700" onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        </div>
      );
    }
  }
 
  export default AddNewClothes;