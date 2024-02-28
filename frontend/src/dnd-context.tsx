import PropTypes from 'prop-types';
//import { createDragDropManager } from 'dnd-core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//const DNDManager = createDragDropManager(HTML5Backend);
export const GlobalDndContext = (props) => {
  //const manager = useRef(DNDManager);
  // the following line solve the problem only with key property
  return (
    <DndProvider backend={HTML5Backend} key={1}>
      {props.children}
    </DndProvider>
  );
};

GlobalDndContext.propTypes = { children: PropTypes.node };

export default GlobalDndContext;
