import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Tags from "./Tags";

export default function DataList() {
  const defaultNames = [];

  const { control, handleSubmit } = useForm({
    defaultValues: { names: defaultNames },
  });

  const [datalist, setDatalist] = useState([]);
  const [value, setValue] = React.useState("tags");
  const [checkedValues, setCheckedValues] = useState(defaultNames);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // ------------axios data fetch
  useEffect(() => {
    axios
      .get("https://www.json-generator.com/api/json/get/cqVmFQHuUO")
      .then((res) => setDatalist(res.data));
  }, []);
 
  function handleSelect(checkedName) {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter((name) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName];
    setCheckedValues(newNames);
    return newNames;
  }

  var Totaltags  = []

  useEffect(() => {
   datalist.map((item)=>{
     Totaltags = [...item.tags]
     console.log(Totaltags)
   })
  }, [])
  

  return (
    <>
      {/* ---------------------form for taking radio button input */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Switch Radio Buttons</FormLabel>
        <RadioGroup
          aria-label="radio"
          name="tags"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="tags" control={<Radio />} label="tags" />
          <FormControlLabel
            value="eyeColor"
            control={<Radio />}
            label="eyeColor"
          />
          <FormControlLabel value="age" control={<Radio />} label="age" />
        </RadioGroup>
      </FormControl>
      {/* =--------------age conditonal rendering */}
      {value == "age" && (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <button
            style={{
              backgroundColor: "orange",
              border: "none",
              padding: "25px",
              margin: "15px",
            }}
          >
            Submit
          </button>
          {datalist.map((name) => (
            <FormControlLabel
              control={
                <Controller
                  name="names"
                  render={({ onChange: onCheckChange }) => {
                    return (
                      <Checkbox
                        checked={checkedValues.includes(name.age)}
                        onChange={() => onCheckChange(handleSelect(name.age))}
                      />
                    );
                  }}
                  control={control}
                />
              }
              key={name.index + 1}
              label={name.age}
            />
          ))}

        </form>
      )}
      {value == "eyeColor" && (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <button
            style={{
              backgroundColor: "orange",
              border: "none",
              padding: "25px",
              margin: "15px",
            }}
          >
            Submit
          </button>
          {datalist.map((name) => (
            <FormControlLabel
              control={
                <Controller
                  name="names"
                  render={({ onChange: onCheckChange }) => {
                    return (
                      <Checkbox
                        checked={checkedValues.includes(name.eyeColor)}
                        onChange={() =>
                          onCheckChange(handleSelect(name.eyeColor))
                        }
                      />
                    );
                  }}
                  control={control}
                />
              }
              key={name.index + 1}
              label={name.eyeColor}
            />
          ))}
        </form>
      )}
      {/* tags */}
      {value == "tags" && datalist.map((item)=> <Tags data={item.tags}/> )}
      {value == "tags" && (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <button
            style={{
              backgroundColor: "orange",
              border: "none",
              padding: "25px",
              margin: "15px",
            }}
          >
            Submit
          </button>
          {datalist.map((name) =>
            name.tags.map((item, index) => {
              return (
                <FormControlLabel
                  control={
                    <Controller
                      name="names"
                      render={({ onChange: onCheckChange }) => {
                        return (
                          <Checkbox
                            checked={checkedValues.includes(item)}
                            onChange={() => onCheckChange(handleSelect(item))}
                          />
                        );
                      }}
                      control={control}
                    />
                  }
                  key={index + 1}
                  label={item}
                />
              );
            })
          )}
        </form>
      )}
    </>
  );
}
