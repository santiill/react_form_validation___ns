import React from "react";
import { useForm } from "react-hook-form";
import {
  MainContainer,
  Flex,
  Icon,
  Container,
  Form,
  Input,
  Hr,
  Button,
  Title,
  P,
} from "./Form.style";
import { FaUserCircle } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
      "Password should contain digit, lowercase, uppercase and at least 6 characters"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlue",
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    alert("ok");
    reset({});
  };

  return (
    <>
      <MainContainer>
        <Container>
          <Icon>
            <FaUserCircle />
          </Icon>
          <Flex>
            <Hr />
            <Title> Sign in </Title>
            <Hr />
          </Flex>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="text"
                placeholder="Email"
                name="email"
                {...register("email")}
                id="email"
                className={`${errors.email && "rd_inp"}`}
              />
              {errors.email && <P>{errors.email.message}</P>}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Password"
                name="password"
                email="password"
                className={`${errors.password && "rd_inp"}`}
                {...register("password")}
              />
              {errors.password && <P>{errors.password.message}</P>}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Confirm password"
                name="confirmPassword"
                id="confirmPassword"
                className={`${errors.confirmPassword && "rd_inp"}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <P>{errors.confirmPassword.message}</P>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      </MainContainer>
    </>
  );
};

export default SignIn;
