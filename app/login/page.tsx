import { useRouter } from "next/router";
import { useState } from "react";

export async function loginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: any) {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await fetch("api/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }, body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message)
                return
            }

            localStorage.setItem("token", data.token)

            alert("you logged in Successfully")

            router.push("/")
        } catch (error) {
            console.error(error);
            alert("Somthing went wrong")
        } finally {
            setLoading(false)
        }

        return (
            <div className="flex justify-center items-center min-h-screen">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4 w-96 border p-6 rounded-lg"
                >
                    <h1 className="text-2xl font-bold text-center">
                        Login
                    </h1>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>
            </div>
        )
    }
}