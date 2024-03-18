import React, { useState } from "react";
import { Grid, TextField, MenuItem, Button } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

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
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [stdInput, setStdInput] = useState("");
  const [stdOutput, setStdOutput] = useState("");

  const handleRunCode = () => {
    console.log("code run.");
  };
  const handleSubmitCode = () => {
    console.log("submit code.");
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
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <CodeMirror
              value={code}
              height="400px"
              onChange={setCode}
              theme={vscodeDark}
            />
            {/* </Suspense> */}
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Editor;
