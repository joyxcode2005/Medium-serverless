
import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
  return (
    <div className="h-screen w-full grid grid-cols-2">
      <div className="">
        <Auth type="signup" />
      </div>
      <div className="invisible md:visible">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
