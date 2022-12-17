import {createContext, useState} from 'react'

export const CompanyContext = createContext(null)

export const CompanyContextProvider = ({children}) => {
  const [searchValue, setSearchValue] = useState('')
  const [company, setCompany] = useState(null)
  const [companies, setCompanies] = useState(
    () => JSON.parse(window.localStorage.getItem('companies')) ?? [],
  )

  const value = {
    companies,
    setCompanies,
    company,
    setCompany,
    searchValue,
    setSearchValue,
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}
