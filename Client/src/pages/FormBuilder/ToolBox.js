import React from "react";
import { Card } from "primereact/card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ITEMS from "./Items";

const ItemComponent = ({ type,icon }) => (
  <Card className="mt-2">
    <i className={"pi "+(icon === "" ? "pi-reply" : icon) +" mr-2"}></i>
    {type.toUpperCase()}
  </Card>
);

const ToolBox = () => {
  return (
    <Droppable droppableId="Toolbox" isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
          {ITEMS.map((item, index) => (
            <Draggable key={item.type} draggableId={item.type} index={index}>
              {(provided, snapshot) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    <ItemComponent type={item.type} icon={item.icon} />
                  </div>

                  {snapshot.isDragging && <ItemComponent type={item.type} icon={item.icon} />}
                </>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default ToolBox;
