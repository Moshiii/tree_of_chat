import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>

      <div
        className="dndnode text"
        onDragStart={(event) => onDragStart(event, 'text')}
        draggable
      >
        Text Node
      </div>

      <div
        className="dndnode prompt"
        onDragStart={(event) => onDragStart(event, 'prompt')}
        draggable
      >
        Prompt Node
      </div>

      <div
        className="dndnode result"
        onDragStart={(event) => onDragStart(event, 'result')}
        draggable
      >
        Result Node
      </div>
     
    </aside>
  );
};
