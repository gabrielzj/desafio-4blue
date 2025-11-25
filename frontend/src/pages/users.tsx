import { Box, Button, Card, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers } from "@/services/apiClient";

interface User {
  id: number;
  name: string;
  user_type: string;
}

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    sessionStorage.setItem("user_id", user.id.toString());
    sessionStorage.setItem("user_type", user.user_type);
    sessionStorage.setItem("user_name", user.name);
  };

  const redirectToHistory = () => {
    if (selectedUser) {
      navigate("/history", { replace: true });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      maxW="800px"
      mx="auto"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      backgroundColor="gray.100"
      minHeight="400px"
    >
      <Box
        mb={6}
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.300"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="lg" color="black">
          Selecione um Usuário
        </Heading>
        <Button
          colorPalette="blue"
          backgroundColor="blue.600"
          color="white"
          variant="surface"
          onClick={() => navigate("/history", { replace: true })}
        >
          Voltar
        </Button>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={4}
        mb={6}
      >
        {users.map((user) => (
          <Card.Root
            key={user.id}
            borderWidth="2px"
            borderColor={selectedUser?.id === user.id ? "blue.500" : "gray.300"}
            cursor="pointer"
            onClick={() => selectUser(user)}
            _hover={{ borderColor: "blue.400" }}
            backgroundColor="white"
          >
            <Card.Body>
              <Heading size="md" mb={2} color="black">
                {user.name}
              </Heading>
              <Text color="gray.600" fontSize="lg" fontWeight="medium">
                Tipo: {user.user_type === "A" ? "A" : "B"}
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Box>

      <Box display="flex" justifyContent="space-evenly">
        <Button
          colorPalette="green"
          backgroundColor="green.600"
          color="white"
          variant="surface"
          size="lg"
          onClick={redirectToHistory}
          disabled={!selectedUser}
        >
          Confirmar e Ver Histórico
        </Button>
        <Button
          colorPalette="green"
          backgroundColor="green.600"
          color="white"
          variant="surface"
          size="lg"
          onClick={() => navigate("/", { replace: true })}
        >
          Criar Novo Usuário
        </Button>
      </Box>
    </Box>
  );
}

export default Users;
