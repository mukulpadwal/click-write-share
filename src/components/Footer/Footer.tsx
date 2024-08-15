import { Link } from "react-router-dom";
import { Container, Logo } from "../index";

export default function Footer() {
  return (
    <footer className="w-auto border border-black rounded-lg m-2 shadow-md shadow-black bg-[#EEE2DC]">
      <Container className="flex flex-col justify-center items-center">
        <div className="w-full py-2">
          <div className="flex flex-row justify-around items-center">
            <div>
              <Logo className="w-14" />
            </div>
            <div>
              <span>Click-Write-Share</span>
            </div>
          </div>
        </div>

        <hr className="border-0.5 border-black w-5/6 sm:w-11/12 text-center" />

        <div className="w-auto text-center p-2">
          <p className="text-sm text-gray-600 ">
            &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by{" "}
            <Link
              className="font-bold underline underline-offset-2 hover:text-[#AC3B61]"
              to={"https://mukulpadwal.me"}
            >
              Mukul Padwal
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
