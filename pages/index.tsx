import { signIn, useSession } from "next-auth/react";

const savedAccounts = [
    {
        email: "test@example.com",
        name: "Test User",
        image: "https://i.pravatar.cc/150?u=test@example.com",
        provider: "credentials",
    },
    {
        email: "alice@example.com",
        name: "Alice Nguyen",
        image: "https://i.pravatar.cc/150?u=alice@example.com",
        provider: "credentials",
    },
    {
        email: "bob@example.com",
        name: "Bob Tran",
        image: "https://i.pravatar.cc/150?u=bob@example.com",
        provider: "credentials",
    },
    {
        email: "charlie@example.com",
        name: "Charlie Le",
        image: "https://i.pravatar.cc/150?u=charlie@example.com",
        provider: "credentials",
    },
];

export default function Home() {
    const { data: session } = useSession();

    return (
        <div className="max-w-xl mx-auto mt-16 p-8 border rounded-lg shadow bg-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Danh sách tài khoản mẫu</h1>
            <ul className="space-y-4">
                {savedAccounts.map((acc) => (
                    <li key={acc.email} className="flex items-center justify-between border p-4 rounded">
                        <div className="flex items-center gap-4">
                            <img src={acc.image} alt={acc.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <div className="font-semibold">{acc.name}</div>
                                <div className="text-gray-500 text-sm">{acc.email}</div>
                            </div>
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() =>
                                signIn(acc.provider, {
                                    email: acc.email,
                                    password: "123456",
                                    callbackUrl: "/profile",
                                })
                            }
                        >
                            Đăng nhập
                        </button>
                    </li>
                ))}
            </ul>
            {session && (
                <div className="mt-8 text-center">
                    <p className="mb-2">Bạn đã đăng nhập với tài khoản:</p>
                    <div className="inline-flex items-center gap-2">
                        <img src={session.user?.image || ""} alt="avatar" className="w-8 h-8 rounded-full" />
                        <span>{session.user?.name} ({session.user?.email})</span>
                    </div>
                </div>
            )}
        </div>
    );
}