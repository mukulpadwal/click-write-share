import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Container, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const authStatus: boolean = useSelector(
    (state: any) => state?.auth.isLoggedIn
  );

  const handleLogin = async (data: any) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getSession();
        if (userData) {
          dispatch(authLogin({ userData }));
          toast.success("Login Success...");
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate]);

  return (
    <Container className="flex flex-row items-center justify-center w-auto h-screen">
      <div className="flex flex-col justify-center items-center gap-8 w-11/12 max-w-lg bg-[#EEE2DC] rounded-xl p-10 shadow-lg shadow-black">
        <div className="w-full flex flex-row items-center justify-center gap-2 border border-black/10 rounded-xl p-2">
          <div>
            <Logo className="w-20" />
          </div>
          <div>
            <h2 className="text-center text-xl font-bold">
              Sign in to your account
            </h2>
            <p className="text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-2 border border-black/10 rounded-xl p-2">
          <h2 className="font-bold text-base">Use these test credentials to explore the app.</h2>
          <p className="text-sm"><span className="font-semibold">Email : </span> test@test.com</p>
          <p className="text-sm"><span className="font-semibold">Password : </span> Test@123</p>
        </div>

        {error && (
          <p className="text-red-600 text-center border border-black/10 rounded-xl p-2">
            {error}
          </p>
        )}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col items-center justify-center gap-4 border border-black/10 rounded-xl p-2"
        >
          <Input
            label={"Email : "}
            placeholder={"Enter your email"}
            type={"email"}
            {...register("email", {
              required: true,
              validate: {
                matchPatterm: (value) =>
                  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password : "
            type="password"
            placeholder={"Enter your password"}
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          <Button
            type="submit"
            className="w-full"
            bgColor={"bg-[#AC3B61]"}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="text-center animate animate-spin w-full text-white" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
