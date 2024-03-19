import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Grid, TextField, MenuItem, Button } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { postData } from "../services/SubmissionsApi";
import { getLanguages } from "../services/JudgeApi";
import { getAllLanguages } from "../redux/actions/judgeActions";

const languages = [
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
  // Add more languages as needed
];

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [stdInput, setStdInput] = useState("");
  const [stdOutput, setStdOutput] = useState("");

  useEffect(() => {
    dispatch(getAllLanguages());
  }, [dispatch]);

  const allLang = useSelector((state) => state.JudgeReducer.data);

  const handleRunCode = async() => {
    // try {
    //   const response = await getLanguages();
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    console.log("ALL Lang: ", allLang);
  };

  const handleSubmitCode = async() => {
    console.log("submit code.");
    const data = {
      username: username,
      code_language: language,
      stdIn: stdInput,
      stdOut: stdOutput,
      code: code
    }
    const pd = await postData(data);
    console.log("submit response: ", pd);
  };
  const redirectToAllSubmissions = () => {
    navigate("/entries");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              required
              label="Select Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ width: "100%" }}
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <CodeMirror
              value={code}
              height="440px"
              onChange={setCode}
              theme={vscodeDark}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Input"
              multiline
              rows={7}
              variant="outlined"
              value={stdInput}
              onChange={(e) => setStdInput(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Output"
              multiline
              rows={7}
              variant="outlined"
              value={stdOutput}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRunCode}
              fullWidth
            >
              Run Code
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitCode}
              fullWidth
            >
              Submit Code
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={redirectToAllSubmissions}
              fullWidth
            >
              All submissions
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Editor;
