import React, {useCallback, useContext} from "react";
import {Button, Input, message} from 'antd';
import {Link} from 'react-router-dom'
import {CompanyContext} from "../contexts/CompanyContextProvider";
import axios from "axios";
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';

const {Search} = Input;

const Navigation = () => {
  const {
    companies,
    setCompanies,
    company,
    searchValue,
    setSearchValue,
    collapsed,
    setCollapsed
  } = useContext(CompanyContext)

  const [messageApi, contextHolder] = message.useMessage();

  const handleLoad = useCallback(() =>
      axios.get("https://bitbucket.org/artur_cation/spacex-cargo-planner/raw/1a9e1c0ff090a114999c47b7e9388fbc88bd083b/shipments.json").then(
        (res) => {
          setCompanies(res.data)
          window.localStorage.setItem('companies', JSON.stringify(companies))
        }
      ),
    [],)

  const changeCompanies = (company) => {
    if (!company) return companies
    const idx = companies.indexOf(companies.find(
      (c) => c.id === company.id)
    )
    return [
      ...companies.slice(0, idx),
      company,
      ...companies.slice(idx + 1),
    ]
  }

  const handleSave = useCallback(() => {
    const changedCompanies = changeCompanies(company)
    setCompanies(changedCompanies)
    window.localStorage.setItem('companies', JSON.stringify(changedCompanies))
    messageApi.open({
      type: 'success',
      content: 'Changes saved successfully.',
    });
  }, [company, companies])

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {contextHolder}
      <div className="collapsible-header">
        <div onClick={toggleCollapsed} className="collapse-button">
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </div>
        <h1>
          <Link to={'/'}>Cargo Planner</Link>
        </h1>
      </div>
      <Search
        className={`${collapsed ? "sider-search" : ""}`}
        name="search" value={searchValue}
        placeholder="Search"
        onChange={searchHandler}
      />
      <div className="button-container">
        <Button onClick={handleLoad}>
          Load
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  )
}

export default Navigation