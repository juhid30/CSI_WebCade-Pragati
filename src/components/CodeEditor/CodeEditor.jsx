import { useRef, useState } from "react";
import { Box, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  // Determine if the layout should be horizontal (HStack) or vertical (VStack)
  const isVerticalLayout = useBreakpointValue({ base: true, md: false });

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box theme="vs-light" w="100%" p={4}>
      <Stack
        direction={isVerticalLayout ? "column" : "row"} // Stack vertically on small screens, horizontally on larger screens
        spacing={4}
        w="100%"
      >
        <Box w={isVerticalLayout ? "100%" : "50%"}> {/* Adjust width based on layout */}
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="70vh"
            theme="vs-light"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box w={isVerticalLayout ? "100%" : "50%"}> {/* Adjust width based on layout */}
          <Output editorRef={editorRef} language={language} />
        </Box>
      </Stack>
    </Box>
  );
};

export default CodeEditor;
