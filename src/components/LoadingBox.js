// import React from 'react';

// export default function LoadingBox() {
//   return (
//     <div className='loading'>
//       <i className="fa fa-spinner fa-spin"></i> Loading...
//     </div>
//   );
// }

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '../../node_modules/@material-ui/core/index';

export default function LoadingBox() {

  return (


    <Typography>
      <div className='loading'>
        <CircularProgress />
      </div>
      Loading...
    </Typography>
  );
}

