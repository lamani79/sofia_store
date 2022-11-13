import Link from "next/link";
import { useState } from "react";

const LogIn = () => {
  const [showGoButoon, setShowGoButton] = useState(false);
  function forgotPassword() {
    alert("contact the developer");
  }
  async function submitForm(e) {
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const options = {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    };
    try {
      const res = await fetch("/api/login", options);
      const data = await res.json();
      if (res.status === 400) {
        alert("خطئ في المعلومات حاول مرة أخرى");
        showGoButoon(false)
      }
      if (res.status === 200) {
        document.cookie = `token=${data.token}`;
        setShowGoButton(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {showGoButoon && (
        <div className="bg-white grid place-content-center absolute top-0 left-0 w-screen h-screen">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">لقد تم تسجيل دخولك بنجاح</div>
            <a
              href={"/admin"}
              type="button"
              class="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 mr-2 mb-2 "
            >
              إذهب إلى لوحة التحكم
            </a>
          </div>
        </div>
      )}
      <div className="antialiased bg-gray-200 text-gray-900 font-sans">
        <div className="flex items-center h-screen w-full">
          <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <span className="block w-full text-xl uppercase font-bold mb-4">
              Login
            </span>
            <form className="mb-4" onSubmit={(e) => submitForm(e)}>
              <div className="mb-4 md:w-full">
                <label htmlFor="email" className="block text-xs mb-1">
                  Admin Name
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Username for admin"
                />
              </div>
              <div className="mb-6 md:w-full">
                <label htmlFor="password" className="block text-xs mb-1">
                  Password
                </label>
                <input
                  className="w-full border rounded p-2 outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                Login
              </button>
            </form>
            <a
              onClick={() => forgotPassword()}
              className="text-blue-700 text-center text-sm"
              href="#"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
