import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createBurnInstruction, getAccount } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import AppTheme from './styling/AppTheme';
import {Card, Container} from "./styling/cards";
import {info} from "./characters";
import Info from "./info";

const QUESTIONS_IN_QUIZ = 15;
const QUESTION_TIME = 10;
const ANSWER_CHOICES = 3;
const TOKEN_PROGRAM = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

export default function Quiz(props) {
  let mintAddr = props.mintAddr;  // props must be passed in as props instead of {mintAddr} because AppTheme relies on props
  const [isLoading, setIsLoading] = React.useState(false);
  const [question, setQuestion] = React.useState(null);
  const [questionsAnswered, setQuestionsAnswered] = React.useState(0);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  let encounteredQs = new Set([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  React.useEffect(() => {
    if(question == null){
        return;
    }
    const timer = setInterval(() => {
      setTimeElapsed((oldTimeElapsed) => {
        if (oldTimeElapsed === QUESTION_TIME) {
          failed();
        }
        return oldTimeElapsed + 1;
      });
    }, 1000);

    setTimeElapsed(0);
    return () => {
      clearInterval(timer);
    };
  }, [question, questionsAnswered]);

  async function failed(){
    setSnackbarMsg("Sorry, you failed the quiz. Play again?");
    setOpen(true);
    setQuestion(null);
    setQuestionsAnswered(0);
  }

  async function loadQuestion(){
    // sample random picture, then 2 more distinct ones
    let filteredInfo = [];
    for(let character of info){
      if(encounteredQs.has(character.name)){
        continue;
      }
      filteredInfo.push(character);
    }
    let randIndCorrect = Math.floor(Math.random() * filteredInfo.length);
    let correct = filteredInfo[randIndCorrect];
    let incorrect1 = filteredInfo[(randIndCorrect + 1) % filteredInfo.length];
    let incorrect2 = filteredInfo[(randIndCorrect + 2) % filteredInfo.length];
    let answers = ["", "", ""];
    answers[randIndCorrect % 3] = correct.name;
    encounteredQs.add(correct.name);
    answers[(randIndCorrect + 1) % 3] = incorrect1.name;
    answers[(randIndCorrect + 2) % 3] = incorrect2.name;
    setQuestion({
      picture: `pics/${correct.picture}`,
      answers: answers,
      correct_answer: randIndCorrect % 3
    });
  }
  async function startGame(){
    if(!connected){
      alert("Please connect your wallet first");
      return;
    }
    setIsLoading(true);
    let brainrotMint = new PublicKey(mintAddr);
    let userATA = await getAssociatedTokenAddress(brainrotMint, publicKey, false, TOKEN_PROGRAM);
    try{
      await getAccount(connection, userATA);
    } catch(err){
      setSnackbarMsg("Please purchase MBR first. See link in navigation bar.");
      setOpen(true);
      setIsLoading(false);
      return;
    }
    // Create transfer instruction
    let burnInstr = createBurnInstruction(userATA, brainrotMint, publicKey, 100, [], TOKEN_PROGRAM)
    let transaction = new Transaction();
    transaction.add(burnInstr);
    const signature = await sendTransaction(transaction, connection);
    console.log(`Transaction signature: ${signature}`);
    try{
      await connection.confirmTransaction(signature);
      const status = await connection.getSignatureStatus(signature, {
        searchTransactionHistory: true
      });
    
      if (status.value?.err) {
        throw Error("tx was confirmed but was a failed tx");
      }
    } catch(err){
      setSnackbarMsg("Sorry, your transaction didn't go through. Please try again. ");
      setOpen(true);
      setIsLoading(false);
      return;
    }
    loadQuestion();
    setIsLoading(false);
  }
  function handleAnswer(answerInd){
    setIsLoading(true);
    if(answerInd == question.correct_answer){
        setTimeElapsed(0);
        setQuestionsAnswered(questionsAnswered + 1);
        // for whatever reason above line doesn't update questionsAnswered until next render
        if(questionsAnswered + 1 == QUESTIONS_IN_QUIZ){  
            setSnackbarMsg("You won! Take a screenshot of this message and DM us on Discord with your wallet to get an exclusive Brainrot NFT soon!");
            setOpen(true);
            setQuestion(null);
            setQuestionsAnswered(0);
            encounteredQs = new Set([]);
        }
        else{
            loadQuestion();
        }
    }
    else{
        failed();
        encounteredQs = new Set([]);
    }
    setIsLoading(false);
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
            {question == null ? 
                <Info mintAddr={mintAddr}/>
                :
                <>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Who is this?
                    </Typography>
                    <img src={question.picture} />
                </>
                
            }
            {question == null ? 
                <Button 
                    variant="outlined" 
                    onClick={startGame}
                >
                    Play!
                </Button>
                :
                <>
                    {question.answers.map((answer, index) => (
                        <Button 
                            variant="outlined"
                            onClick={() => handleAnswer(index)}
                        >
                            {answer}
                        </Button>
                    ))}
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={timeElapsed * 10} />
                    </Box>
                </>
                
            }
            <Snackbar
                open={open}
                onClose={handleClose}
                message={snackbarMsg}
                action={action}
            />
            {isLoading ? (<LinearProgress />) : (<></>)}
        </Card>
      </Container>
    </AppTheme>
  );
}
