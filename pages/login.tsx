import { GetServerSideProps } from "next";
import { getProviders, signIn, getSession, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { BuiltInProviderType } from "next-auth/providers/index";
// import { BuiltInProviderType } from "next-auth/providers";
type LoginProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};
// type LoginProps = {
//   providers: Record<string, ClientSafeProvider>;
// };
export default function Login({ providers }: LoginProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCredentialLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res && res.ok) {
      router.push("/profile");
    } else {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
      <form onSubmit={handleCredentialLogin} className="space-y-4">
        <input
          name="email"
          placeholder="Email hoặc Username"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Đăng nhập
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      <div className="my-6 flex items-center">
        <hr className="flex-1" />
        <span className="mx-2 text-gray-400">hoặc</span>
        <hr className="flex-1" />
      </div>
      <div className="space-y-2">
        {Object.values(providers).map((provider) =>
          provider.id !== "credentials" ? (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className={`w-full py-2 rounded text-white ${provider.id === "google"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-800 hover:bg-gray-900"
                }`}
            >
              Đăng nhập với {provider.name}
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
};