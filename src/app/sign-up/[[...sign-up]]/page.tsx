import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <>  
      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 pt-16">
        <SignUp />
      </div>
    </>
  );
};
export default SignUpPage;
