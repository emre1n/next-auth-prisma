export default function SignUpForm() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl bg-blue-500">Signup Form</h1>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email</label>
          <input className="w-full bg-red-500" type="email" id="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input className="border rounded-lg" type="password" id="password" />
        </div>
        <button className="px-4 py-2 bg-slate-500 rounded-lg" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
