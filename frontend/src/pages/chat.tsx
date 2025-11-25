import { Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "@/services/apiClient";

type RegisterType = "A" | "B";

type dataMessage = {
  id: number;
  user_type: RegisterType;
  description: string;
};

function Chat() {
  const [message, setMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [isResponseReceived, setIsResponseReceived] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  const id = Number(sessionStorage.getItem("user_id"));
  const user_type = sessionStorage.getItem("user_type") as RegisterType;
  const navigate = useNavigate();

  const userMessages = (msg: string) => {
    setSentMessages((prevMessages) => [...prevMessages, msg]);
  };

  const redirectToRegister = () => {
    navigate("/", { replace: true });
  };

  const createMsg = async (data: dataMessage) => {
    if (!data.description.trim()) return;
    userMessages(data.description);
    setMessage("");
    try {
      const response = await sendMessage(data);
      setResponse(response.data);
      setIsResponseReceived(true);
      setTimeout(() => setIsResponseReceived(false), 3000);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <Box
      maxW="800px"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      backgroundColor="gray.100"
      height="800px"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      <Box
        mb={4}
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.300"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          colorPalette="blue"
          backgroundColor="blue.600"
          color="white"
          variant="surface"
          onClick={redirectToRegister}
        >
          Voltar
        </Button>
        <Button
          colorPalette="teal"
          backgroundColor="teal.600"
          color="white"
          variant="surface"
          onClick={() => navigate("/history", { replace: true })}
        >
          Histórico
        </Button>
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
        overflowY="auto"
        mb={4}
      >
        {sentMessages.map((m, idx) => (
          <Box
            key={idx}
            maxW="70%"
            p={3}
            borderRadius="lg"
            backgroundColor="blue.600"
            color="white"
            marginTop={5}
          >
            {m}
          </Box>
        ))}
        {isResponseReceived && (
          <Box
            maxW="70%"
            p={3}
            borderRadius="lg"
            backgroundColor="gray.300"
            color="black"
            marginTop={5}
          >
            {response.message}
          </Box>
        )}
      </Box>
      <Box
        mt={4}
        display="flex"
        flexDirection="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Input
          placeholder="Digite uma mensagem..."
          variant="outline"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          borderColor="blackAlpha.300"
          color="black"
          size="lg"
          mt="auto"
        ></Input>
        <Button
          mt={4}
          colorPalette="green"
          backgroundColor="green.600"
          color="white"
          variant="surface"
          height="44px"
          onClick={() => createMsg({ id, user_type, description: message })}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;
