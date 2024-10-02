import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4" style={{ backgroundImage: "url('/zodiac-bg.jpg')" }}> 
        <SignIn />
      </div>
    </>
  );
};
export default SignInPage;
