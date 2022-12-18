import React, {useContext, useEffect} from 'react'
import {Layout, notification} from 'antd';
import {Route, Routes} from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import Home from "./components/Home";
import Navigation from "./components/Navigation"
import CompanyList from "./components/CompanyList";
import {CompanyContext} from "./contexts/CompanyContextProvider";

const {Header, Sider, Content} = Layout;

function App() {
  const {companies, searchValue} = useContext(CompanyContext)
  const [api, contextHolder] = notification.useNotification();

  const filteredCompanies = () =>
    companies.filter((company) =>
      company.name.toLowerCase().includes(searchValue),
    )

  useEffect(() => {
    if (companies.length === 0){
      api["info"]({
        message: 'Info message',
        description:
          'There is no locally saved shipments! Please click the “Load” button loads all the shipments over the network',
        duration: 30,
      });
    }
  }, [companies])

  return (
    <Layout>
      {contextHolder}
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
