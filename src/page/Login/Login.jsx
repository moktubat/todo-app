import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { saveUser } from "../../api/fetch";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => {
        signIn(data.email, data.password);
        resolve();
      });

      const user = signIn(data.email, data.password);
      console.log(user);

      Swal.fire({
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("from google", loggedUser);
        setUser(loggedUser);
        const userInfo = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
        };
        saveUser(userInfo).then((data) => {
          if (data.insertedId) {
            toast.success(
              `${
                loggedUser?.displayName || "Unknown user"
              } logged in successfully`
            );
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="min-h-screen text-gray-900 flex justify-center bg-red-200">
        <div
          className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
          }}
        >
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
            <div>
              <h2
                className="mx-auto md:w-[78%] text-2xl sm:text-4xl font-bold pb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #BC5B80, #E0636B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SignIn Here
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-[#a8edea] text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign In with Google</span>
                  </button>
                </div>

                <div className="my-6 md:my-6 border-b-2 pb-2 text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-800 tracking-wide font-medium transform translate-y-1/2">
                    Or sign In with E-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        name="email"
                        placeholder="email"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      />
                      {errors.email && (
                        <span className="text-red-600 py-1 ps-1 font-semibold ">
                          Wrong Email
                        </span>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        name="password"
                        placeholder="password"
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      />
                      {errors.password && (
                        <span className="text-red-600 py-1 ps-1 font-semibold ">
                          Wrong Password
                        </span>
                      )}
                    </div>
                    <div className="form-control">
                      <button className="mt-4 tracking-wide font-semibold bg-[#71c5c1] text-white-500 w-full py-4 rounded-lg hover:bg-[#428884] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-">Sign In</span>
                      </button>

                      <label className="label flex justify-between">
                        <Link href="#" className="label-text-alt pt-4">
                          Forgot password?
                        </Link>

                        <Link to="/signUp" className="label-text-alt pt-4">
                          Sign Up
                        </Link>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#fed6e3] text-center hidden lg:flex rounded-lg">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://www.vectorloom.com/illustrations/Daily_task_vector_illustration%7Ctask,todo,list,calendar,done,women,activity%7Cthemebfa0fa%7C1692780778652.png')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
