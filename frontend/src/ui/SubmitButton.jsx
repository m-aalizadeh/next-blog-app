import Button from "./Button";
import { useFormStatus } from "react-dom";
import SvgLoaderComponent from "./SVGLoaderComponent";

function SubmitButton({ children, className, ...rest }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      {...rest}
      className={`flex items-center justify-center gap-x-4 py-4 w-full
        ${className}
        `}
    >
      {children}
      {pending && <SvgLoaderComponent />}
    </Button>
  );
}
export default SubmitButton;
