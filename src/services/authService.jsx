import api from "./api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

const DEMO_USERS = [
  {
    id: 1,
    name: "Farm Admin",
    email: "admin@fungifresh.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "customer@example.com",
    password: "customer123",
    role: "customer",
  },
];

export async function login({ email, password }) {
  if (!USE_MOCK)
    return (await api.post("/auth/login", { email, password })).data;
  await delay();
  const user = DEMO_USERS.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) throw new Error("Invalid email or password");
  const { password: _pw, ...safe } = user;
  return { token: `mock.${btoa(user.email)}.${Date.now()}`, user: safe };
}

export async function register({ name, email, password }) {
  if (!USE_MOCK)
    return (await api.post("/auth/register", { name, email, password })).data;
  await delay();
  if (DEMO_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase()))
    throw new Error("An account with this email already exists");
  const user = { id: Date.now(), name, email, role: "customer" };
  DEMO_USERS.push({ ...user, password });
  return { token: `mock.${btoa(email)}.${Date.now()}`, user };
}
