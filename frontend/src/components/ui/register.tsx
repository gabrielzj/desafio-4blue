import { useState, type ChangeEvent, type FormEvent } from "react";
import { Box, Button, Input, VStack, chakra } from "@chakra-ui/react";

type RegisterType = "A" | "B";

type RegisterData = {
  name: string;
  type: RegisterType;
};

type RegisterProps = {
  onSubmit?: (data: RegisterData) => void;
};

function Register({ onSubmit }: RegisterProps) {
  const [name, setName] = useState<string>("");
  const [userType, setUserType] = useState<RegisterType>("A");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.({ name, type: userType });
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
      backgroundColor={"gray.200"}
    >
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={handleNameChange}
            variant="outline"
            borderColor={"blackAlpha.300"}
            color={"black"}
            size={"lg"}
          />

          <chakra.select
            value={userType}
            onChange={handleTypeChange}
            bg={"transparent"}
            color={"black"}
            alignSelf="flex-start"
          >
            <option value="A">Usuário A</option>
            <option value="B">Usuário B</option>
          </chakra.select>

          <Button
            type="submit"
            colorPalette="blue"
            backgroundColor={"blue.600"}
            color={"white"}
            width="100%"
            variant="surface"
          >
            Entrar
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Register;
