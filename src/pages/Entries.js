import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CodeDialog from "../components/code-dialog/CodeDialog";
import { getSubmittedData } from "../redux/actions/entriesActions";
import EmptyTableContent from "../components/empty-content/EmptyTableContent";

const columns = [
  { id: "username", label: "USER", minWidth: 170 },
  {
    id: "code_language",
    label: "CODE LANGUAGE",
    minWidth: 100,
    align: "center",
  },
  {
    id: "stdIn",
    label: "INPUT",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "stdOut",
    label: "OUTPUT",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "code",
    label: "SOURCE CODE",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

// function createData(user, lang, inp, out, code) {
//   // const density = population / size;
//   return { username: user, code_language: lang, stdIn: inp, stdOut: out, code };
// }

// const crows = [
//   createData("John", "C++", 36, 6, "Hello, World!"),
//   createData("John", "C++", 36, 6, "Hello, World!"),
// ];

const Entries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [codeData, setCodeData] = useState("");
  const submittedData = useSelector((state) => state.TableDataReducer.total);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    dispatch(getSubmittedData());
  }, [dispatch]);

  useEffect(() => {
    if (submittedData !== null) {
      setRows(submittedData);
    }
  }, [submittedData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const backToEditor = async () => {
    navigate("/editor");
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleCodeDialog = (data) => {
    setCodeData(data);
    setDialogStatus(!dialogStatus);
  };

  const isNotFound = rows && rows.length === 0;

  return (
    <>
      <Stack direction="row" spacing={3}>
        <Button variant="outlined" onClick={backToEditor}>
          Back to editor
        </Button>
        <Typography variant="h6">All submissions</Typography>
      </Stack>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {/* {column.format && typeof value === "number"
                              ? column.format(value)
                              : value} */}
                              {column.id !== "code" ? (
                                value
                              ) : (
                                <Button onClick={() => handleCodeDialog(row)}>
                                  View Code
                                </Button>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
            <EmptyTableContent isEmpty={isNotFound} />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows && rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CodeDialog
        status={dialogStatus}
        handleDialog={handleCodeDialog}
        data={codeData}
      />
    </>
  );
};

export default Entries;
