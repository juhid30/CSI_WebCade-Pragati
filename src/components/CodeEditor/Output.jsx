import { useState, useEffect } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "./api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Function to fetch questions from Firestore
  const fetchQuestions = async () => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "questions"));
      const fetchedQuestions = [];
      querySnapshot.forEach((doc) => {
        fetchedQuestions.push(doc.data());
      });
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when component is mounted
  }, []);

  // If no questions are loaded yet, return early
  if (questions.length === 0) {
    return <Text>Loading questions...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      const outputLines = result.output.split("\n");
      setOutput(outputLines);
      const userOutput = outputLines[0].trim();

      // Check if the output matches the expected output
      if (userOutput === currentQuestion.expectedOutput) {
        toast({
          title: "Success!",
          description: "Your code produced the correct output.",
          status: "success",
          duration: 6000,
        });
        // Move to the next question
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          toast({
            title: "All questions completed!",
            status: "info",
            duration: 6000,
          });
        }
      } else {
        toast({
          title: "Incorrect Output.",
          description: `Expected: ${currentQuestion.expectedOutput}, but got: ${userOutput}`,
          status: "error",
          duration: 6000,
        });
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const API_KEY = "AIzaSyBBp8jEQ3zEJXLkSVgBpGHKr6q-EycIDSI";
  const genAI = new GoogleGenerativeAI(API_KEY);

  async function improveWithAI() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const sourceCode = editorRef.current.getValue();
    const prompt = `\n\nUse comments and tell me how can I improve the space and time complexity of this given code (please use comments for improvements of the particular language that is supported in the monaco code editor), if it has issues : fix them and tell me what did you fix in comments. \n please check which language it is correctly and add comments in its particular syntax. Language used is ${language} \n` + sourceCode;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace("```" + `${language}`, "").replace(/```/, "");
    editorRef.current.setValue(text);
  }

  return (
    <Box w="100%" className="cursor-default">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        mb={4}
        bg="#0dab95"
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        variant="outline"
        mb={4}
        bg="#0dab95"
        isLoading={isLoading}
        onClick={improveWithAI}
      >
        Improve
      </Button>

      {/* Display the current question */}
      <Box bg="gray.100" p={4} borderRadius="md" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Question:
        </Text>
        <Text>{currentQuestion.question}</Text>
        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Sample Input:
        </Text>
        <Text>{currentQuestion.sampleInput}</Text>
      </Box>

      <Box
        height="50vh"
        p={2}
        bg="white"
        color={isError ? "red.400" : "gray"}
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
