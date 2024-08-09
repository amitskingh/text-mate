function getHeaders() {
  const token = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ${token}`, // Include token in Authorization header
  }

  return headers
}

export { getHeaders }