import React, { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

const isTokenExpired = (token) => {
  if (!token) return true
  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  } catch (error) {
    console.error("Error decoding token:", error)
    return true
  }
}

const PrivateRoutes = () => {
  // null means loading, true or false means checked
  const [isValidToken, setIsValidToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      if (isTokenExpired(token)) {
        setIsValidToken(false)
        localStorage.removeItem("token")
      } else {
        setIsValidToken(true)
      }
    } else {
      setIsValidToken(false)
    }
  }, [])


  if (isValidToken === null) {
    return <div>Loading...</div>
  }

  return isValidToken ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
