import { getSession, useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Profile() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="max-w-md mx-auto mt-16 p-8 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin người dùng</h2>
            <img src={session.user?.image || ""} alt="avatar" width={80} className="rounded-full mx-auto mb-4" />
            <p className="mb-2"><b>Tên:</b> {session.user?.name}</p>
            <p className="mb-4"><b>Email:</b> {session.user?.email}</p>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Đăng xuất
            </button>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return { props: {} };
};