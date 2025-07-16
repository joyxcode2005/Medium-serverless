
import Signup from "../components/Signup";
import Quote from "../components/Quote";

const SignupPage = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 ">
      <div className="">
        <Signup />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};

export default SignupPage;
