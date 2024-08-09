import { useState } from "react"
import FormInfo from "./FormInfo"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getHeaders } from "./GetHeaders"

const URL = import.meta.env.VITE_API_URL

function Form() {
  const navigate = useNavigate()

  const handleFormInfo = async (name, email, password, isNewUser) => {
    const userInfo = {
      email: email,
      password: password,
    }

    if (isNewUser) {
      userInfo.name = name
    }

    // determine the endpoint
    const endpoint = isNewUser ? "register" : "login"
    try {
      // POST request to backend API
      const headers = getHeaders()
      const response = await axios.post(
        `${URL}/api/v1/auth/${endpoint}`,
        userInfo,
        { headers: headers }
      )

      // storing token in localStorage for authentication
      localStorage.setItem("token", response.data.token)
      navigate("/books")
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login")
      } else if (error.response.status === 404) {
        navigate("/not-found")
      }
    }
  }

  return <FormInfo handleFormInfo={handleFormInfo} />
}

export default Form
