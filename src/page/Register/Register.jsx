import { useForm } from "react-hook-form";
import { Link  } from "react-router-dom";
import { useContext  } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { imageUpload, saveUser } from "../../api/fetch";
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user, createUser, updateUserProfile, setUser, setLoading } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    const image = data.photo[0];
    imageUpload(image).then((imageData) => {
      const imageUrl = imageData?.data?.display_url;
      createUser(data.email, data.password)
        .then(() => {
          updateUserProfile(data.name, imageUrl)
            .then(() => {
              setUser({
                ...user,
                displayName: data.name,
                photoURL: imageUrl,
              });
              const userInfo = {
                name: data.name,
                email: data.email,
                image: imageUrl,
              };
              saveUser(userInfo).then((data) => {
                if (data.insertedId) {
                  setLoading(false);
                  toast.success(`account created successfully`);
                  reset();
                }
              });
            })
            .catch((error) => {
              console.log(error.message);
              toast.error(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
          setLoading(false);
        });
    });
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
      message:
        "Password must contain at least one capital letter, one digit, and one special character",
    },
  };

  return (
    <div>
      <div className="min-h-screen text-gray-900 flex flex-col md:flex-row justify-center bg-teal-200">
        <div
          className="max-w-screen-xl m-0 md:m-10 bg-white shadow md:rounded-lg flex justify-center flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #a8edea 0%, #fed6e3 100%)",
          }}
        >
          <div className="flex-1 bg-[#a8edea] text-center hidden lg:flex rounded-lg">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://www.vectorloom.com/illustrations/Business_travel_vector_illustration%7Cbusiness,work,travel,office,meeting,schedule,calendar%7Ctheme789896%7C1693068122304.png')]"></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
            <div>
              <h2
                className="mx-auto md:w-[78%] text-2xl sm:text-4xl font-bold pb-3"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #BC5B80, #E0636B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SignUp Here
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 mt-6">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                      <input
                        className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs italic">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        {...register("password", passwordValidation)}
                      />

                      {errors.password && (
                        <p className="text-red-500 text-xs italic">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value ===
                              document.getElementById("password").value ||
                            "Passwords do not match",
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs italic">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control">
                      <input
                        className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                        type="file"
                        name="photo"
                        accept="image/*"
                        {...register("photo", { required: true })}
                      />
                    </div>
                    <div className="form-control">
                      <button className="mt-4 tracking-wide font-semibold bg-[#71c5c1] text-white-500 w-full py-3 rounded-lg hover:bg-[#428884] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                        <span className="ml-">Sign Up</span>
                      </button>

                      <label className="label flex justify-between">
                        <p className="label-text-alt pt-4">
                          Already have an account?
                        </p>

                        <Link to="/login" className="label-text-alt pt-4">
                          Sign In
                        </Link>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
