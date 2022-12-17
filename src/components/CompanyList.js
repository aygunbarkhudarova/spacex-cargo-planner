import React from "react";
import {List} from "antd";
import {Link} from "react-router-dom";

const CompanyList = ({companies}) => (
  <List
    size="small"
    dataSource={companies}
    renderItem={(item) => <Link to={`/${item.id}`}>
      <List.Item>
        {item.name}
      </List.Item>
    </Link>}
  />
)

export default CompanyList