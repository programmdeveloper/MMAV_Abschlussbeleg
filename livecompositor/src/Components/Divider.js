    import React from 'react';
    
    const Divider = ( {vertical} ) => {

        if(vertical) {
            var style = {
                width:"5px",
                height: "100%",
                backgroundColor: "red",
                cursor: "col-resize",
            };
        } else {
            var style = {
                width: "100%",
                height: "5px",
                backgroundColor: "red",
                cursor: "row-resize",
            };
        }

      return (
        <div class="divider" style={style}>
        </div>
      );
    };
    
    export default Divider;
    