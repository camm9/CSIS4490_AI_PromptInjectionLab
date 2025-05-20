# Requirements:
## Windows Instructions
### Pre-Requisites:
* WSL: Ubuntu 22.04
* Docker
* At least 16GB RAM

### Instructions to Run
Download folder and unzip. Inside of unzipped folder, hold shift and right-click, select open Linux Shell here.
`docker build -t redteam-llm . ` <br>
`docker run -p 5000:5000 -p 11434:11434 redteam-llm` <br>
In your browser visit 127.0.0.1:5000
