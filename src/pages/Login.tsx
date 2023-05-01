import { useForm } from "react-hook-form";
import styled from "styled-components";
import { userLogin } from "../api/user";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem 0;
  margin: 0 auto;
`;
const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const ButtonConainer = styled.div``;

function Login() {
  const { handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  const onClickLogin = async (loginData: any) => {
    const res = await userLogin(loginData).catch((fail) => {
      console.log(fail);
      if (fail.response.status === 401) {
        alert("Login Fail");
      }
    });
    if (res) {
      //console.log(res.token);
      navigate("/");
    }
    setValue("username", "");
    setValue("password", "");
  };

  return (
    <Container>
      <div>
        <p>mor_2314</p>
        <p>83r5^_</p>
      </div>
      <LoginForm onSubmit={handleSubmit(onClickLogin)}>
        <InputContainer>
          <input type="text" placeholder="ID" {...register("username", { required: true })} />
          <input type="password" placeholder="PW" {...register("password", { required: true })} />
        </InputContainer>
        <button type="submit">Login</button>
      </LoginForm>
    </Container>
  );
}

export default Login;
