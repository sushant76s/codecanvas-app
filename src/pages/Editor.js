import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Grid, TextField, MenuItem, Button } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { postData } from "../services/SubmissionsApi";
import { getLanguages, getSubmission, submitCode } from "../services/JudgeApi";
import {
  getAllLanguages,
  getSubmissionData,
  getSubmissionToken,
} from "../redux/actions/judgeActions";

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [stdInput, setStdInput] = useState("");
  const [stdOutput, setStdOutput] = useState("");
  const [submission, setSubmission] = useState(null);
  
  useEffect(() => {
    dispatch(getAllLanguages());
  }, [dispatch]);

  const allLanguages = useSelector((state) => state.JudgeReducer.data);
  // const [languages, setLanguages] = useState(allLanguages);
  const storeToken = useSelector((state) => state.JudgeTokenReducer.token);
  const submissionData = useSelector((state) => state.SubmissionReducer.data);

  const handleRunCode = async() => {
    try {
      const codeData = {
        language_id: language,
        source_code: code,
        stdin: stdInput,
      };
      const submitResponse = await submitCode(codeData);
      if(submitResponse.status === 200) {
        const token = submitResponse.data.token;
        const submissionResponse = await getSubmission(token);
        if(submissionResponse.status === 200) {
          if(submissionResponse.data.stdout !== null) {
            setStdOutput(submissionResponse.data.stdout)
          }
          else {
            setStdOutput(submissionResponse.data.stderr)
          }
        }
      }
      else {
        console.log("Error while submitting code.")
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(submissionData != null) {
      console.log("Submission Data: ", submissionData);
    }
  }, [submissionData]);

  const handleSubmitCode = async () => {
    console.log("submit code.");
    const data = {
      username: username,
      code_language: language,
      stdIn: stdInput,
      stdOut: stdOutput,
      code: code,
    };
    const pd = await postData(data);
    console.log("submit response: ", pd);
  };
  const redirectToAllSubmissions = async () => {
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
              {allLanguages &&
                allLanguages.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
