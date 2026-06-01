"use client"

import { useRouter } from "next/router"
import { useState } from "react"

export default function SignUp(){
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
}