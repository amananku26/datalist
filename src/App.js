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
import EyeColor from "./EyeColor";

export default function DataList() {
  const defaultNames = [];

  const { control, handleSubmit } = useForm({
    defaultValues: { names: defaultNames }
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

  const filteredArrTags = datalist.reduce((acc, current) => {
    const x = acc.find((item) => item.age === current.age);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const AgeArray = datalist.map((item) => item.age);

  const filteredArrAge = datalist.reduce((acc, current) => {
    const x = acc.find((item) => item.age === current.age);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  const tagArray = datalist.map((item) => item.tags);
  // var newArr = [...tagArray];
  var newArr = [].concat.apply([], tagArray);
  // console.log(newArr);
  const colorArray = datalist.map((item) => item.eyeColor);
  const blue = colorArray.filter((item) => item === "blue");
  const brown = colorArray.filter((item) => item === "brown");
  const green = colorArray.filter((item) => item === "green");
  // console.log(blue);
  const filteredArrEyeColor = datalist.reduce((acc, current) => {
    const x = acc.find((item) => item.eyeColor === current.eyeColor);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // console.log(filteredArrAge)

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
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onChange={handleSubmit((data) => console.log(data))}
        >
          {filteredArrAge.map((name) => (
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
      {/* {value == 'eyeColor' && datalist.map((item)=> <EyeColor data={item.age}/>)} */}
      {value == "eyeColor" && (
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onChange={handleSubmit((data) => console.log(data))}
        >
          {filteredArrEyeColor.map((name) => (
            <div style={{ display: "flex" }}>
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
              {name.eyeColor == "blue" && <h5>{blue.length}</h5>}
              {name.eyeColor == "brown" && <h5>{brown.length}</h5>}
              {name.eyeColor == "green" && <h5>{green.length}</h5>}
            </div>
          ))}
        </form>
      )}
      {/* tags */}
      {/* {value == "tags" && datalist.map((item)=> <Tags data={item.tags}/> )} */}
      {/* {value == "tags" &&  {datalist.map((name) => <Tags/>)}} */}
      {value == "tags" && (
        <>
          {datalist.map((item) => (
            <Tags data={newArr} />
          ))}
        </>
      )}
    </>
  );
}
