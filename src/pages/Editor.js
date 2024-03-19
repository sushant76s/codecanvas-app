import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { getAllLanguages } from "../redux/actions/judgeActions";
import { submitData } from "../redux/actions/entriesActions";
import { getSubmission, submitCode } from "../services/JudgeApi";

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState(null);
  const [code, setCode] = useState("");
  const [stdInput, setStdInput] = useState("");
  const [stdOutput, setStdOutput] = useState("");

  // Loading button states
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllLanguages());
  }, [dispatch]);

  const allLanguages = useSelector((state) => state.JudgeReducer.data);
  const submissionData = useSelector((state) => state.SubmissionReducer.data);
  const currentData = useSelector((state) => state.TableDataReducer.current);

  const handleRunCode = async () => {
    try {
      setRunLoading(true);
      const codeData = {
        language_id: language?.id || null,
        source_code: code,
        stdin: stdInput,
      };
      const submitResponse = await submitCode(codeData);
      if (submitResponse.status === 200) {
        const token = submitResponse.data.token;
        const submissionResponse = await getSubmission(token);
        if (submissionResponse.status === 200) {
          if (submissionResponse.data.stdout !== null) {
            setStdOutput(submissionResponse.data.stdout);
          } else {
            setStdOutput(submissionResponse.data.stderr);
          }
        }
      } else {
        console.log("Error while submitting code.");
      }
      setRunLoading(false);
    } catch (error) {
      console.log("Error running code: ", error);
    }
  };

  useEffect(() => {
    if (submissionData != null) {
      console.log("Submission Data: ", submissionData);
    }
  }, [submissionData]);

  const handleSubmitCode = () => {
    setSubmitLoading(true);
    const data = {
      username: username,
      code_language: language?.name ? language.name : "NULL",
      stdIn: stdInput,
      stdOut: stdOutput,
      code: code,
    };
    try {
      dispatch(submitData(data));
      if (currentData != null) {
        setTimeout(() => {
          setSubmitLoading(false);
        }, 1000);
        alert("Submitted!");
      } else {
        setSubmitLoading(false);
        alert("Unable to submit!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const redirectToAllSubmissions = async () => {
    navigate("/entries");
  };

  const handleSetLanguage = (e) => {
    const selectedLanguage = allLanguages.find(
      (option) => option.id === e.target.value
    );
    setLanguage({
      id: e.target.value,
      name: selectedLanguage ? selectedLanguage.name : "",
    });
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
              value={language?.id || ""}
              onChange={(e) => handleSetLanguage(e)}
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
              disabled={runLoading}
              onClick={handleRunCode}
              fullWidth
              endIcon={
                runLoading && <CircularProgress size={20} color="inherit" />
              }
            >
              {runLoading ? "Running..." : "Run Code"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              disabled={submitLoading}
              onClick={handleSubmitCode}
              fullWidth
              endIcon={
                submitLoading && <CircularProgress size={20} color="inherit" />
              }
            >
              {submitLoading ? "Submitting..." : "Submit Code"}
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
