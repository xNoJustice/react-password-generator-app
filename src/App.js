import logo from "./logo.svg";
import "./logo.css";
import { useState } from "react";
import Error from "./components/Error";

function App() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [length, setLength] = useState(1);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const copyPassword = () => {
    const textarea = document.createElement("textarea");

    if (!password) {
      return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    let oldPassword = password;
    setPassword(
      "Copied to Clipboard",
      setTimeout(() => {
        setPassword(oldPassword);
      }, 1000)
    );
  };

  const generatePassword = () => {
    if (length <= 0 || length >= 100) {
      setError("Password length can be min 1, Max 100.");
      return;
    }

    const typesCount = uppercase + lowercase + numbers + symbols;
    if (typesCount <= 0) {
      setError("Choose a minimum one rule");
      return;
    }
    setError("");

    const numbersList = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacters = `!'^+%&/()=?_#${[]}|;:><.*-@`;

    let characterList = "";

    if (uppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (lowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (numbers) {
      characterList = characterList + numbersList;
    }

    if (symbols) {
      characterList = characterList + specialCharacters;
    }

    let generatedPassword = "";

    for (let i = 0; i < characterList.length; i++) {
      const characterIndex = Math.round(Math.random() * characterList.length);
      generatedPassword =
        generatedPassword + characterList.charAt(characterIndex);
    }
    setPassword(generatedPassword.slice(0, length));
  };

  return (
    <>
      <div className="w-96 mx-auto p-6">
        <div className="rounded overflow-hidden mb-8 bg-white dark:bg-gray-800">
          <div className="p-4 bg-grey-lighter dark:bg-gray-800 py-8">
            <div className="bg-white dark:bg-gray-800 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
              <div className="sm:flex sm:items-center px-2 py-4">
                <div className="flex-grow">
                  <img src={logo} className="logo mx-auto" alt="logo" />
                  <h3 className="font-normal text-2xl text-center px-2 py-3 leading-tight dark:text-gray-100">
                    Password Generator
                  </h3>
                  <div className="p-4 flex justify-between items-center">
                    <div className="w-5/6">
                      <span className="pr-2 text-gray-600 dark:text-white text-md font-medium break-all">
                        {password}
                      </span>
                    </div>
                    <div className="w-1/6 text-right">
                      <button
                        type="button"
                        onClick={() => copyPassword()}
                        className="py-2 px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect
                            x="8"
                            y="2"
                            width="8"
                            height="4"
                            rx="1"
                            ry="1"
                          ></rect>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {error && <Error error={error} setError={setError} />}
                  <div className="flex justify-end"></div>
                  <div className="w-full">
                    <div className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded">
                      <div className="w-3/5  h-10 py-3 px-1 dark:text-gray-100">
                        <label>Password length</label>
                      </div>
                      <div className="w-2/5 h-10 text-right p-3">
                        <input
                          type="number"
                          className="bg-gray-400 text-base dark:text-black dark:bg-white rounded-md"
                          min="0"
                          max="99"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded">
                      <div className="w-4/5  h-10 py-3 px-1 dark:text-gray-100">
                        <label>Include uppercase letters</label>
                      </div>
                      <div className="w-1/5 h-10 text-right p-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={uppercase}
                          onChange={() => setUppercase(!uppercase)}
                        />
                      </div>
                    </div>
                    <div className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded">
                      <div className="w-4/5  h-10 py-3 px-1 dark:text-gray-100">
                        <label>Include lowercase letters</label>
                      </div>
                      <div className="w-1/5 h-10 text-right p-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={lowercase}
                          onChange={() => setLowercase(!lowercase)}
                        />
                      </div>
                    </div>
                    <div className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded">
                      <div className="w-4/5  h-10 py-3 px-1 dark:text-gray-100">
                        <label>Include numbers</label>
                      </div>
                      <div className="w-1/5 h-10 text-right p-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={numbers}
                          onChange={() => setNumbers(!numbers)}
                        />
                      </div>
                    </div>
                    <div className="flex my-1 cursor-pointer hover:bg-blue-lightest rounded">
                      <div className="w-4/5  h-10 py-3 px-1 dark:text-gray-100">
                        <label>Include symbols</label>
                      </div>
                      <div className="w-1/5 h-10 text-right p-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={symbols}
                          onChange={() => setSymbols(!symbols)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2 py-4">
                <div className="text-right">
                  <button
                    onClick={() => generatePassword()}
                    className="py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Generate Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
