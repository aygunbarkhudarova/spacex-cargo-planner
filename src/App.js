import React, {useEffect, useState} from 'react'
import {Button, Input, Layout, List} from 'antd';
import axios from "axios";

const {Header, Sider, Content} = Layout;

function App() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://bitbucket.org/artur_cation/spacex-cargo-planner/raw/1a9e1c0ff090a114999c47b7e9388fbc88bd083b/shipments.json")
      setCompanies(res.data)
    }
    fetchData()
  }, [])

  return (
      <Layout>
        <Header>
          <h1 style={{color: "white"}}>Cargo Planner</h1>
          <Input style={{width: "50%"}} placeholder="Search"/>
          <div style={{gap: "1rem", display: "flex"}}>
            <Button>
              Load
            </Button>
            <Button>
              Save
            </Button>
          </div>
        </Header>
        <Layout>
          <Sider>
            <List
                size="small"
                dataSource={companies}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
          </Sider>
          <Content>
            Content
          </Content>
        </Layout>
      </Layout>
  );
}

export default App;
