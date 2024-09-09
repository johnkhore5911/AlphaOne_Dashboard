import { Column } from 'react-table';
import TableHoc from './TableHoc';


interface DataType{
    officeid:string,
    office:string,
    EmpName:number,
    Time:string,
} 


const columns:Column<DataType>[]=[
    {
        Header: "Id",
        accessor: "officeid",
    },
    {
        Header: "Office",
        accessor: "office",
    },
    {
        Header: "EmpName",
        accessor: "EmpName",
    },
    {
        Header: "Time",
        accessor: "Time",
    },
 
]

// so TableHoc is a function which returns a JsX , so we need to call the function 
const DashboardTable = ({data=[]}:{data:DataType[]}) => {
  return TableHoc<DataType>(columns,
    data,
   "TransactionBox",
   "Recent Check-Ins")()
  
}

export default DashboardTable