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

### Example Solutions

Please note that there are no single answers in red teaming LLMs. What works today, may not work in the future. You may have to submit a prompt several times to get your desired outcome. 

Below are examples of solutions that worked but as mentioned they may not work for. Get creative!
#### Solution 1
![Jailbreak: Ban her!](https://github.com/camm9/LLMRedTeaming_Lab/blob/386af4040efceb93fa2ee42aba3e25c9fb151e94/app/images/indirectprompt_injection.png)

#### Solution 2
![Jailbreak: Get the system prompt!](https://github.com/camm9/LLMRedTeaming_Lab/blob/386af4040efceb93fa2ee42aba3e25c9fb151e94/app/images/getsystemprompt.png)
#### Solution 3
![Indirect Injection: Hack Mistral!](https://github.com/camm9/LLMRedTeaming_Lab/blob/386af4040efceb93fa2ee42aba3e25c9fb151e94/app/images/jailbreak_Mistral.png)
