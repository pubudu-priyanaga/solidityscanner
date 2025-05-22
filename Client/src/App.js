import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CloudUpload, Description } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#F2F2F2',
  },
  sideBySideContainer: {
    display: 'flex',
    alignItems: 'center', 
  },
  sideBySideChild: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    boxShadow: '8px 8px 16px #D9D9D9, -8px -8px 16px #FFFFFF',
  },
  fileInput: {
    display: 'none',
  },
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  downloadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  downloadButtonAnimated: {
    animation: '$downloadButtonAnimation 1s infinite',
  },
  '@keyframes downloadButtonAnimation': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [solidityFile, setSolidityFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState([]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSolidityFile(file);
  };

  const handleUploadButtonClick = () => {
    const formData = new FormData();
    formData.append('file', solidityFile);

    setIsProcessing(true);

    fetch('http://localhost:5000/process', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setIsDownloadReady(true);
          setVulnerabilities([
            { name: 'Re-entrancy', lines: data.reenteancy_lines },
            { name: 'Delegate Call', lines: data.delegate_lines },
            { name: 'Self Destruct', lines: data.self_des_lines },
            { name: 'Unchecked External Call', lines: data.unchecked_lines }
          ]);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleDownloadButtonClick = () => {
    const htmlContent = generateHTMLReport();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'vulnerability_report.html';
    link.click();
  };

  const generateHTMLReport = () => {
    return `
      <html>
      <head>
        <title>Vulnerability Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f9;
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #0073e6;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          h1 {
            color: #0073e6;
          }
        </style>
      </head>
      <body>
        <h1>Vulnerability Report for ${solidityFile?.name || 'Unknown File'}</h1>
        <table>
          <tr>
            <th>Vulnerability</th>
            <th>Status</th>
            <th>Detected on line(s)</th>
          </tr>
          ${vulnerabilities.map(vul => `
            <tr>
              <td>${vul.name}</td>
              <td>${vul.lines.length > 0 ? 'Detected' : 'Not Detected'}</td>
              <td>${vul.lines.join(', ') || '-'}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
  };

  return (
    <div className={`${classes.root}`}>
      <div className={classes.sideBySideContainer}>
        <div id='leftBox' className={classes.sideBySideChild}>
          <div className={`${classes.container}`}>
            <input
              accept=".sol"
              className={classes.fileInput}
              id="solidity-file-input"
              type="file"
              onChange={handleFileInputChange}
            />
            <label htmlFor="solidity-file-input">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.uploadButton}
                startIcon={<CloudUpload />}
              >
                Upload Solidity File
              </Button>
            </label>
            {solidityFile && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className={isProcessing ? classes.downloadButtonAnimated : classes.downloadButton}
                  onClick={handleUploadButtonClick}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Solidity File'}
                </Button>
                {isDownloadReady && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.downloadButton}
                    onClick={handleDownloadButtonClick}
                  >
                    Download Vulnerability Report
                    <Description style={{ marginLeft: '8px' }} />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
