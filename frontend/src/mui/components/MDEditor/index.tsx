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

// react-quill components
import ReactQuill from 'react-quill';

// react-quill styles
import 'react-quill/dist/quill.snow.css';

// Custom styles for the MDEditor
import MDEditorRoot from 'src/mui/components/MDEditor/MDEditorRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// declaring types for the MDEditor
interface Props {
  [key: string]: any;
}

function MDEditor(props: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <ReactQuill theme="snow" {...props} />
    </MDEditorRoot>
  );
}

export default MDEditor;
