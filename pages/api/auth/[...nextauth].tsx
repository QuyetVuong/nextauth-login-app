import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            image: "https://i.pravatar.cc/150?u=test@example.com",
          },
          {
            id: "2",
            email: "alice@example.com",
            name: "Alice Nguyen",
            image: "https://i.pravatar.cc/150?u=alice@example.com",
          },
          {
            id: "3",
            email: "bob@example.com",
            name: "Bob Tran",
            image: "https://i.pravatar.cc/150?u=bob@example.com",
          },
          {
            id: "4",
            email: "charlie@example.com",
            name: "Charlie Le",
            image: "https://i.pravatar.cc/150?u=charlie@example.com",
          },
        ];

        const user = users.find(
          (u) =>
            u.email === credentials?.email && credentials?.password === "123456"
        );

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});