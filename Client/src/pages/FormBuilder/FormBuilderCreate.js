import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";

import React, { useEffect, useState, useRef } from "react";
import FormBuilderService from "../../services/formBuilder";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";

const InputComponent = (props) => {
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
          props.setItems((prevValue) => {
            const temp = [...prevValue]
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
              const temp = [...prevValue]
              temp[props.index].required =
                !temp[props.index].required;
              return temp;
            });
          }}
          checked={props.isRequired}
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
            const temp = [...prevValue]
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
              const temp = [...prevValue]
              temp[props.index].required =
                !temp[props.index].required;
              return temp;
            });
          }}
          checked={props.isRequired}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
           isRequired
        </label>
      </div>
    </div>
  );
};

const CalendarComponent = (props) => {
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
          props.setItems((prevValue) => {
            prevValue[props.index].label = e.target.value;
            return prevValue;
          });
        }}
      />

      <Calendar disabled placeholder="value" />
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
          {/* <div>
            <Button
              className="mt-4"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "date",
                    label: "",
                    required: false,
                  },
                ]);
              }}
            >
              Date
            </Button>
          </div> */}
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
            if (item.type === "input") {
              return (
                <InputComponent
                  key={index}
                  index={index}
                  setItems={setItems}
                  item={item}
                  items={items}
                  isRequired={item.required}
                />
              );
            } else if (item.type === "textarea") {
              return (
                <InputTextareaComponent
                  key={index}
                  index={index}
                  setItems={setItems}
                  item={item}
                  items={items}
                  isRequired={item.required}
                />
              );
            } else if (item.type === "date") {
              return <CalendarComponent index={index} setItems={setItems} />;
            }
          })}

          <Button
            onClick={() => {
              const data = {
                name: formName,
                items: items,
              };
              FormBuilderService.create(data).then((res) => {
                navigate("/formbuilder");
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default FormBuilderCreate;
