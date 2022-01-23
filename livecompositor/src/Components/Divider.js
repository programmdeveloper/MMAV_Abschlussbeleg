    import React from 'react';
    
    const Divider = ( {vertical} ) => {

        if(vertical) {
            var style = {
                width:"4px",
                padding:"1px",
                height: "calc(100vh - 90px)",
                backgroundColor: "#374049",
                cursor: "col-resize",
                border: "2px solid #6e8091"
            };
        } else {
            var style = {
                width: "calc(100% - 4px)",
                height: "2px",
                backgroundColor: "#374049",
                cursor: "row-resize",
                border: "2px solid #6e8091"
            };
        }

      return (
        <div class="divider" style={style}>
        </div>
      );
    };
    
    export default Divider;
    