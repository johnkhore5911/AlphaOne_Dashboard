import React from 'react'
import Office_page from '../../components/Office_page'

const data={
    officeid:123424,
    name:"Chandigarh",
    location:"Sector 24 ,Raj Bhavan ",
    total_employees:1000,
    checkedInEmployees:700,
    departments:["software","HR","Management","Finance"]

}

const Chandigarh = () => {
  return (
    <div>
        <Office_page
        officeid={data.officeid}
        name={data.name}
        location={data.location}
        total_employees={data.total_employees}
        checkedInEmployees={data.checkedInEmployees}
        departments={data.departments}
        />
    </div>
  )
}

export default Chandigarh