import React from "react";
import Input from "./InputComponents/Input";
import Textarea from "./InputComponents/Textarea";
import Select from "./InputComponents/Select";
import RadioButton from "./InputComponents/RadioButton";
import CheckboxGroup from "./InputComponents/CheckboxGroup";
import DatePicker from "./InputComponents/DatePicker";

function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case "input":
            return <Input {...rest} />;
        case "textarea":
            return <Textarea {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "radio":
            return <RadioButton {...rest} />;
        case "checkbox":
            return <CheckboxGroup {...rest} />;
        case "date":
            return <DatePicker {...rest} />;
        default:
            return null;
    }
}

export default FormikControl;
