// import { Input, Form, Checkbox } from "antd";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

// mapping of our components
const componentMapping = {
  input: InputText,
  textarea: InputTextarea,
}
function FormElement({ type, label, register,errors, name, options,required }) {
  // dinamically select a component from componentMapping object
  const Component = componentMapping[type] || undefined;

  if(Component === undefined) {
    return null
  }
  return (
    <div className="my-2">
      <label className="block">{label}</label>
      <Component options={options} className={errors[label] && "p-invalid"} {...register(label,{ required: required })}/>
      {errors[label] && (
        <small className="p-error block">This field is required.</small>
      )}
    </div>
    // <div className="field">
    //   <label>Brand Name</label>
    //   <InputText
    //     defaultValue={facility.brand_name}
    //     className={errors.brand_name && "p-invalid"}
    //     {...register("brand_name", { required: true })}
    //   />
    //   {errors.brand_name && (
    //     <small className="p-error block">This field is required.</small>
    //   )}
    // </div>

  )
}

export default FormElement;