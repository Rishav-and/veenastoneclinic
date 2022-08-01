import { Fragment } from "react";
import "./loading.css";
import loader from './source.gif'
const Loading = () => {
  return (
    <Fragment>
      {/* wrapping them  with custom css */}
    <div className="loading">
      <div className="form-group" style={{textAlign:"center"}}>
        <div className="form-group">
          <br />
          <img src={loader} className="loadingform"/>  
  {/* custom css  */}
          <br/>
          <br/>
          <br/>
          <h2><strong>Processing Your Request...Please Wait!!</strong></h2>
        </div>
      </div>
    </div>
  </Fragment>
  );
};
export default Loading;

