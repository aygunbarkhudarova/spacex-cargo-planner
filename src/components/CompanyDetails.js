import React, {useContext, useEffect, useState} from "react";
import {Form, Input, Space} from "antd";
import {CompanyContext} from "../contexts/CompanyContextProvider";
import {useParams} from "react-router-dom";

const CompanyDetails = () => {
  const {companyId} = useParams()
  const {setCompany, companies} = useContext(CompanyContext)

  const data = companies?.find((item) => item.id === companyId)

  const [cargoBoxes, setCargoBoxes] = useState(data?.boxes)
  let validity = false

  useEffect(() => {
    data && setCargoBoxes(data.boxes);
  }, [data]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCargoBoxes(value);
    setCompany({...data, [name]: value})
  };

  const calculateCargoBays = (boxes) => {
    const boxesValues = boxes?.split(',') ?? []
    const matchNumber = new RegExp(/^\s*-?\d+(\.\d{1,2})?\s*$/);
    validity = boxesValues.some(
      (el) => !(matchNumber.test(el)) || !(Number(el) <= 10)
    )

    if (validity || !boxes) return ''
    const boxesSum = boxesValues.reduce((prev, curr) => Number(prev) + Number(curr));

    return !isNaN(boxesSum) && Math.ceil(boxesSum / 10);
  }

  return (
    <div>
      <h2>{data?.name}</h2>
      <Space
        direction="vertical"
        size="middle"
      >
        <a href={`mailto:${data?.email}`} type="email">
          {data?.email}
        </a>
        <p>Number of required cargo bays:
          {/*TODO:: fix the calculation*/}
          <b>{calculateCargoBays(cargoBoxes)}</b>
        </p>
        <Form
          layout="vertical"
          onFinish={(e) => e.preventDefault()}
        >
          <Form.Item label="Cargo boxes">
            <Input
              name="boxes"
              value={cargoBoxes}
              pattern="^[0-9]?[.,]?[0-9]?[,]?$"
              onChange={handleChange}
              title="Allowed only digits, commas and dots"
              status={validity && "error"}
            />
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}

export default CompanyDetails;