import React from 'react'
import Office_page from '../../components/Office_page'

const data={
    officeid:123424,
    name:"DELHI",
    location:"Kashmiri Gate ,Bhavan ",
    total_employees:2500,
    checkedInEmployees:1800,
    departments:["software","HR","Management","Finance"]


}

const Delhi = () => {
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

export default Delhi