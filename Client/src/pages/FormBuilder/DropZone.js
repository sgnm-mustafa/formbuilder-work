import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";

const InputComponent = (props) => {
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].label = e.target.value;
              return temp;
            });
        }}
        value={props.item.label}
      />

      <InputText disabled placeholder="value" />
      <div className="my-2">
        <Checkbox
          inputId="cb1"
          onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].required = !temp[props.index].required;
              return temp;
            });
          }}
            checked={props.item.required}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          isRequired
        </label>
      </div>
    </div>
  );
};

const InputTextareaComponent = (props) => {
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].label = e.target.value;
              return temp;
            });
        }}
        value={props.item.label}
      />

      <InputTextarea disabled placeholder="value" />
      <div className="my-2">
        <Checkbox
          inputId="cb1"
          onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].required = !temp[props.index].required;
              return temp;
            });
          }}
            checked={props.item.required}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          isRequired
        </label>
      </div>
    </div>
  );
};

const DropZone = (props) => {
  const [hoverdCompId, sethoverdCompId] = React.useState(null);

  const renderItem = (item,index) => {
    switch (item.type) {
      case "input":
        return <InputComponent item={item} index={index} setItems={props.setItems} />;
      case "textarea":
        return <InputTextareaComponent item={item} index={index} setItems={props.setItems}  />;
      default:
        break;
    }
  };

  const toggleHover = (e, item) => {
    sethoverdCompId(item.id);
  };
  return (
    <div>
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
            style={{
              minHeight: 500,
              backgroundColor: snapshot.isDraggingOver ? "#f5f5f5" : "",
            }}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.length > 0
              ? props.items.map((item, index) => (
                  <DraggableItem
                    key={"di" + index}
                    item={item}
                    index={index}
                    hoverdCompId={hoverdCompId}
                    renderItem={renderItem}
                    toggleHover={toggleHover}
                  />
                ))
              : !snapshot.isDraggingOver && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 500,
                    }}
                  >
                    <p>Drop items here</p>
                  </div>
                )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DropZone;
