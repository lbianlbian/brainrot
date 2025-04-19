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
import { getAssociatedTokenAddress, createBurnInstruction } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import AppTheme from './styling/AppTheme';
import {Card, Container} from "./styling/cards";
import {info} from "./characters";
import Info from "./info";

const QUESTIONS_IN_QUIZ = 15;
const QUESTION_TIME = 10;
const ANSWER_CHOICES = 3;
const BRAINROT_MINT = new PublicKey("SMUSDBKt1cydTsvZmSHBS2CWAoi32FWPdFD7u9SwH3w");
const TOKEN_2022_PROGRAM = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

export default function Quiz(props) {
  const setErrmsg = props.setErrmsg;
  const [isLoading, setIsLoading] = React.useState(false);
  const [question, setQuestion] = React.useState(null);
  const [questionsAnswered, setQuestionsAnswered] = React.useState(0);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

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
    setSnackbarMsg("Sorry you failed the quiz play again?");
    setOpen(true);
    setQuestion(null);
    setQuestionsAnswered(0);
  }

  async function loadQuestion(){
    // sample random picture, then 2 more distinct ones
    let randIndCorrect = Math.floor(Math.random() * info.length);
    let correct = info[randIndCorrect];
    let incorrect1 = info[(randIndCorrect + 1) % info.length];
    let incorrect2 = info[(randIndCorrect + 2) % info.length];
    let answers = ["", "", ""];
    answers[randIndCorrect % 3] = correct.name;
    answers[(randIndCorrect + 1) % 3] = incorrect1.name;
    answers[(randIndCorrect + 2) % 3] = incorrect2.name;
    console.log(correct.name);
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
    let userATA = await getAssociatedTokenAddress(BRAINROT_MINT, publicKey, false, TOKEN_2022_PROGRAM);
    // Create transfer instruction
    let burnInstr = createBurnInstruction(userATA, BRAINROT_MINT, publicKey, 100, [], TOKEN_2022_PROGRAM)
    let transaction = new Transaction();
    transaction.add(burnInstr);
    const signature = await sendTransaction(transaction, connection);
    console.log(`Transaction signature: ${signature}`);

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
            setSnackbarMsg("You won! Take a screenshot of this message and DM us on discord with your wallet to get an exclusive Brainrot NFT soon!");
            setOpen(true);
            setQuestion(null);
            setQuestionsAnswered(0);
        }
        else{
            loadQuestion();
        }
    }
    else{
        failed();
    }
    setIsLoading(false);
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
            {question == null ? 
                <Info />
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
