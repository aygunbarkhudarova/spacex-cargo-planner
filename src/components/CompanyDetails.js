import React, {useContext, useEffect, useState} from "react";
import {Form, Input, Space} from "antd";
import {CompanyContext} from "../contexts/CompanyContextProvider";
import {useParams} from "react-router-dom";

const CompanyDetails = () => {
  const {companyId} = useParams()
  const {setCompany, companies} = useContext(CompanyContext)

  const data = companies?.find((item) => item.id === companyId)

  const [cargoBoxes, setCargoBoxes] = useState(data?.boxes)

  useEffect(() => {
    data && setCargoBoxes(data.boxes);
  }, [data]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCargoBoxes(value);
    setCompany({...data, [name]: value})
  };

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
          <b>{data?.boxes?.split(",").length || 0}</b>
        </p>
        <Form
          layout="vertical"
          onFinish={(e) => e.preventDefault()}
        >
          <Form.Item label="Cargo boxes">
            <Input
              name="boxes"
              value={cargoBoxes}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}

export default CompanyDetails;