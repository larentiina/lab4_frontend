import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector} from "react-redux";


const columns = [
    { id: 'coordinateX', label: 'X', minWidth: 1 , maxWidth: 4},
    { id: 'coordinateY', label: 'Y', minWidth: 1, maxWidth: 4},
    { id: 'scaleR', label: 'R', minWidth: 1 },
    { id: 'hit', label: 'Is Hit', minWidth: 1 ,  format: (value) => value.toString()},
    { id: 'currentDate', label: 'Date', minWidth: 2},
    { id: 'scriptRunningTime', label: 'Script Running Time', minWidth: 1},
];




export default function TablePoints() {
    const points = useSelector(state=>state.points.points)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden',  maxWidth:600, float: 'right', marginTop:15}}>
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, maxWidth:  column.maxWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {points
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((point) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={point.id}>
                                        {columns.map((column) => {
                                            const value = point[column.id];
                                            console.log(value)
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {typeof value==='boolean' ? (value===true ? "Hit" : "Not Hit") : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={points.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
