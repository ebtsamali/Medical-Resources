import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MedicineService from '../../../services/medicine_service';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

function Row(props) {
    const { row, setStatusChanged, statusChanged } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const handleChangeOrderStatus = (orderId, status) => {

        MedicineService.updateOrderStatus(orderId, status)
            .then(response => {
                setStatusChanged(!statusChanged);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root} style={{ width: "80rem" }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={{ fontSize: "16px" }} component="th" scope="row">
                    {row.status === "placed" ? <HourglassFullIcon style={{ color: "#5bc0de", marginRight: "0.3rem" }} /> :
                        (row.status === "shipped") ? <LocalShippingIcon style={{ color: "#f0ad4e", marginRight: "0.3rem" }} /> :
                            <DoneAllIcon style={{ color: "#5cb85c", marginRight: "0.3rem" }} />
                    }
                    {row.status}
                </TableCell>
                <TableCell style={{ fontSize: "16px" }} align="center">{row.createdAt.split('T')[0]} {row.createdAt.split('T')[1].substring(0, row.createdAt.split('T')[1].length - 2)}</TableCell>
                <TableCell style={{ fontSize: "16px" }} align="center">{row.totalPrice}</TableCell>
                <TableCell style={{ fontSize: "16px" }} align="center">{row.user.firstName} {row.user.lastName}</TableCell>
                <TableCell style={{ fontSize: "16px" }} align="center">{row.userPhone}</TableCell>
                <TableCell style={{ fontSize: "16px", width:"200px" }} align="center">{row.userAddress}</TableCell>
                <TableCell align="center">
                    <button className="btn btn-dark mr-2" disabled={row.status === "shipped" || row.status === "delivered"} onClick={() => handleChangeOrderStatus(row._id, "shipped")}>Ship</button>
                    <button className="btn btn-dark" disabled={row.status === "delivered"} onClick={() => handleChangeOrderStatus(row._id, "delivered")}>Deliver</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: "16px" }}>Medicine</TableCell>
                                        <TableCell style={{ fontSize: "16px" }}>Price (EGP)</TableCell>
                                        <TableCell style={{ fontSize: "16px" }} align="center">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.order.map((orderRow) => (
                                        <TableRow key={orderRow._id}>
                                            <TableCell style={{ fontSize: "16px" }} component="th" scope="row">
                                                {orderRow.medicine.name}
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }}>{orderRow.price}</TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="center">{orderRow.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {

    const { rows, setStatusChanged, statusChanged } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (<>{rows.length === 0? <div className="d-flex justify-content-center mt-5 w-100 h-100">
            <h3>No Orders Available</h3>
        </div> :
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: "#292b2c" }}>
                        <TableCell />
                        <TableCell style={{ color: "white", fontSize: "16px" }}><b>Status</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Placed At</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Total Price</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Customer Name</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Customer Phone</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Customer Address</b></TableCell>
                        <TableCell style={{ color: "white", fontSize: "16px" }} align="center"><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows).map((row) => (
                            <Row key={row._id} row={row} setStatusChanged={setStatusChanged} statusChanged={statusChanged} />
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>}</>
    );
}
