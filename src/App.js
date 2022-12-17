import React, {useContext} from 'react'
import {Layout} from 'antd';
import {Route, Routes} from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import Home from "./components/Home";
import Navigation from "./components/Navigation"
import CompanyList from "./components/CompanyList";
import {CompanyContext} from "./contexts/CompanyContextProvider";

const {Header, Sider, Content} = Layout;

function App() {
  const {companies, searchValue} = useContext(CompanyContext)

  const filteredCompanies = () =>
    companies.filter((company) =>
      company.name.toLowerCase().includes(searchValue),
    )

  return (
    <Layout>
      <Header>
        <Navigation/>
      </Header>
      <Layout>
        <Sider>
          <CompanyList companies={filteredCompanies()}/>
        </Sider>
        <Content>
          <Routes>
            <Route path='/:companyId' element={<CompanyDetails/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
