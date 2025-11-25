import { Box, Button, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface MessageItem {
  id: number;
  name: string;
  description: string;
  user_type: string;
  system_response: string;
}

function History() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const userType = sessionStorage.getItem("user_type") as string;
  const userName = sessionStorage.getItem("user_name") as string;

  const userId = sessionStorage.getItem("user_id") as string;

  const redirectToChat = () => {
    navigate("/chat", { replace: true });
  };

  const getMessage = async () => {
    try {
      const response = await axios.get<MessageItem[]>(
        `http://localhost:8000/api/messages/?user_type=${userType}&user_id=${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <Box
      maxW="800px"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      backgroundColor="gray.100"
      height="800px"
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
          onClick={redirectToChat}
        >
          Voltar
        </Button>
        <Box display="flex" gap={2}>
          <Button
            colorPalette="teal"
            backgroundColor="teal.600"
            color="white"
            variant="surface"
            onClick={() => navigate("/users", { replace: true })}
          >
            Usuários
          </Button>
        </Box>
      </Box>
      <Table.Root
        size="md"
        variant="outline"
        borderColor="gray.300"
        borderRadius="md"
      >
        <Table.Header bg="blue.600">
          <Table.Row>
            <Table.ColumnHeader color="white">Nome</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Tipo</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Mensagem</Table.ColumnHeader>
            <Table.ColumnHeader color="white">
              Resposta do Sistema
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {messages.map((m) => (
            <Table.Row key={m.id}>
              <Table.Cell color="black" fontWeight="medium">
                {userName}
              </Table.Cell>
              <Table.Cell color="black" fontWeight="medium">
                {userType}
              </Table.Cell>
              <Table.Cell color="black" fontWeight="medium">
                {m.description}
              </Table.Cell>
              <Table.Cell color="gray.600" fontWeight="medium">
                {m.system_response}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default History;
