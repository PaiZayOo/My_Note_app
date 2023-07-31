import React, { useEffect, useState } from "react";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { registerUser } from "@/api/usersApi";
import { useRouter } from "next/router";
import useUserMutation from "@/hooks/useUsers/useUserMutation";

const register = () => {
  const router = useRouter();
  const { registerUserMutation } = useUserMutation();
  const { mutate: userData } = registerUserMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validate();
    const { name, email, password } = form.values;
    userData({ name, email, password });
    router.push("/auth/login");
    form.reset();
  };

  useEffect(() => {
    router.prefetch("/auth/login");
  }, []);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length > 0 ? null : "Name is required"),
      password: (value) => (value.length > 0 ? null : "Password is required"),
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen ">
      <Box maw={300} mx="auto" className="shadow-md p-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mt-3"
            withAsterisk
            label="Name"
            size="md"
            placeholder="Enter Your Name"
            {...form.getInputProps("name")}

            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            className="mt-3"
            withAsterisk
            label="Email"
            size="md"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            // value={email}
            // onChange={e => setEmail(e.target.value)}
          />

          <PasswordInput
            className="mt-3"
            withAsterisk
            size="md"
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
            // value={password}
            // onChange={e =>setPassword(e.target.value)}
          />

          <Group position="right" mt="md">
            <Button type="submit" variant="outline">
              Register
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default register;
