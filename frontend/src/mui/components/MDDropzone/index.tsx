/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useRef } from 'react';

// Dropzone components
import Dropzone from 'dropzone';

// Dropzone styles
import 'dropzone/dist/dropzone.css';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Custom styles for the MDDropzone
import MDDropzoneRoot from 'src/mui/components/MDDropzone/MDDropzoneRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring props types for MDDropzone
interface Props {
  options: {
    [key: string | number]: any;
  };
}

function MDDropzone({ options }: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, {
        ...options,
      });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) =>
          dz.destroy(),
        );
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <MDDropzoneRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <input name="file" type="file" multiple />
      </MDBox>
    </MDDropzoneRoot>
  );
}

export default MDDropzone;
