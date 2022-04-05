import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';
import React, { useEffect, useState, useRef } from "react";
import FormBuilderService from "../../services/formBuilder";
import { useNavigate } from "react-router-dom";

const InputComponent = (props) => {
  return (
    <div className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e)=>{
            props.setItems(prevValue=>{
                prevValue[props.index].label = e.target.value;
                return prevValue
            })
        }}
      />

      <InputText disabled placeholder="value" />
    </div>
  );
};

const InputTextareaComponent = (props) => {
  return (
    <div className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e)=>{
            props.setItems(prevValue=>{
                prevValue[props.index].label = e.target.value;
                return prevValue
            })
        }}
      />

      <InputTextarea disabled placeholder="value"/>
    </div>
  );
};



function FormBuilderCreate() {
  const [items, setItems] = useState([]);
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="grid">
        <div className="col-3">
          <div>
            <Button
              className="mt-5"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "input",
                    label: "",
                    required: false,
                  },
                ]);
              }}
            >
              Input
            </Button>
          </div>
          <div>
            <Button
              className="mt-4"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "textarea",
                    label: "",
                    required: false,
                  },
                ]);
              }}
            >
              Text Area
            </Button>
          </div>
         
        </div>
        <div className="col-9">
          <div className="field">
            <label className="block">Form Name</label>
            <InputText
              style={{ width: "50%" }}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          {items.map((item, index) => {
            return item.type === "input" ? (
              <InputComponent key={index} setItems={setItems} index={index} />
            ) : (
              <InputTextareaComponent key={index} setItems={setItems} index={index} />
            );
          })}

          <Button onClick={()=>{
              const data = {
                    name: formName,
                    items: items
              }
              FormBuilderService.create(data).then(res=>{
                  navigate("/formbuilder")
              })
          }}>Save</Button>
        </div>
      </div>
    </>
  );
}

export default FormBuilderCreate;
