import { useState, type ChangeEvent, type FormEvent } from "react";
import { Box, Button, Input, VStack, chakra } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { registerUser as registerUserService } from "@/services/apiClient";

type RegisterType = "A" | "B";

type RegisterData = {
  name: string;
  user_type: RegisterType;
};

function Register() {
  const [name, setName] = useState<string>("");
  const [userType, setUserType] = useState<RegisterType>("A");
  const [isErrorExists, setIsErrorExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegisterUser = async (data: RegisterData) => {
    try {
      const response = await registerUserService(data);
      sessionStorage.setItem("user_id", response.data.id.toString());
      sessionStorage.setItem("user_type", response.data.user_type);
      sessionStorage.setItem("user_name", response.data.name);
      navigate("/chat", {
        replace: true,
      });
    } catch (err: any) {
      setError("Erro ao registrar usuário.");
      setIsErrorExists(true);
      setTimeout(() => setIsErrorExists(false), 3000);
      console.error("Erro ao registrar usuário:", err);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !userType) {
      setError("Por favor, preencha todos os campos.");
      setIsErrorExists(true);
      setTimeout(() => setIsErrorExists(false), 3000);
      return;
    }

    setError("");
    handleRegisterUser({ name, user_type: userType });
    console.log("Registrando:", { name, user_type: userType });
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setUserType(e.target.value as RegisterType);
  }

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={10}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      backgroundColor="gray.200"
    >
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={handleNameChange}
            variant="outline"
            borderColor="blackAlpha.300"
            color="black"
            size="lg"
          />

          <chakra.select
            value={userType}
            onChange={handleTypeChange}
            bg="transparent"
            color="black"
            alignSelf="flex-start"
          >
            <option value="A">Usuário A</option>
            <option value="B">Usuário B</option>
          </chakra.select>

          <Button
            type="submit"
            colorPalette="blue"
            backgroundColor="blue.600"
            color="white"
            width="100%"
            variant="surface"
          >
            Entrar
          </Button>
          <span style={{ color: "red", fontSize: "14px" }}>
            {isErrorExists ? error : ""}
          </span>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
