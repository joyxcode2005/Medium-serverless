import Quote from "../components/Quote";
import Singin from "../components/Singin";

const SigninPage = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="">
        <Singin />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};

export default SigninPage;
